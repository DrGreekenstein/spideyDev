import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/connectDB';
import User from '../../../../lib/user_Schema';
import { clerkClient } from '@clerk/nextjs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req) {
  try {
    const sig = req.headers.get('stripe-signature');
    const buf = await req.arrayBuffer();

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        Buffer.from(buf),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Webhook signature error' }, { status: 400 });
    }

    console.log('Webhook event received:', event.type);

    await connectDB();

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const clerkId = session.metadata?.clerkId;

      console.log('Processing checkout session:', session.id, 'for clerkId:', clerkId);

      if (!clerkId) {
        console.error('No Clerk ID in metadata for session:', session.id);
        return NextResponse.json({ error: 'No Clerk ID in metadata' }, { status: 400 });
      }

      try {
        // 1. Update MongoDB
        const updatedUser = await User.findOneAndUpdate(
          { clerkId },
          {
            plan: 'pro',
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            $push: {
              paymentHistory: {
                date: new Date(),
                amount: session.amount_total / 100, // Convert from cents
                stripeSessionId: session.id,
              }
            }
          },
          { new: true, upsert: false }
        );

        if (!updatedUser) {
          console.error('User not found for clerkId:', clerkId);
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log('User updated successfully:', updatedUser._id);

        // 2. Update Clerk metadata
        await clerkClient.users.updateUserMetadata(clerkId, {
          publicMetadata: { plan: 'pro' },
        });

        console.log('Clerk metadata updated successfully');
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
        return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
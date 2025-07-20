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
    return NextResponse.json({ error: 'Webhook signature error' }, { status: 400 });
  }

    await connectDB();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const clerkId = session.metadata?.clerkId;

    if (!clerkId) return NextResponse.json({ error: 'No Clerk ID in metadata' });

    // 1. Update MongoDB
    await User.findOneAndUpdate({ clerkId }, {
      plan: 'pro',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
    });

    // 2. Update Clerk metadata
    await clerkClient.users.updateUserMetadata(clerkId, {
      publicMetadata: { plan: 'pro' },
    });
  }

  return NextResponse.json({ received: true });
}
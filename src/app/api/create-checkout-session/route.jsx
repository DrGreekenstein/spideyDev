// /app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../lib/connectDB';
import User from '../../../lib/user_Schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req) {
  await connectDB();
  const { userId } = await auth();
  const user = await User.findOne({ clerkId: userId });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: user.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
    metadata: {
      clerkId: user.clerkId,
    },
  });

  return NextResponse.json({ url: session.url });
}

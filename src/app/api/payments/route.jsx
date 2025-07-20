import { NextResponse } from "next/server";
import Stripe from 'stripe'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req){
  // --- FIX 1: AWAITING THE RAW TEXT PAYLOAD ---
  const payload = await req.text(); // <--- THIS IS CRUCIAL
  const sig = req.headers.get('stripe-signature');

  // Ensure the webhook secret is set
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    console.error("STRIPE_WEBHOOK_SECRET environment variable is not set.");
    return NextResponse.json({ error: "Server configuration error: Webhook secret missing." }, { status: 500 });
  }

  let event;

  try {
    // --- FIX 2 (for debugging): Log the actual error message ---
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    switch(event.type){
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log("Stripe Webhook Event: Checkout Session Completed:", session);
        // Implement your logic here: e.g., update database, send confirmation email
        break;
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        console.log("Stripe Webhook Event: Customer Subscription Deleted:", subscription);
        // Implement your logic here: e.g., revoke access, update user status
        break;
      // Add more cases for other event types you want to handle
      default:
        console.log(`Stripe Webhook Event: Unhandled event type ${event.type}`);
    }
  } catch (error) {
    // --- FIX 3 (for debugging): Log the precise error from Stripe ---
    console.error("Stripe Webhook Signature Verification Failed:", error.message);
    // Return a 400 status to Stripe to indicate a problem with the webhook processing
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  // --- FIX 4 (best practice): Always return 200 OK after successful processing ---
  // Stripe expects a 200 OK response quickly to confirm receipt of the webhook
  return NextResponse.json({ received: true }, { status: 200 });
}
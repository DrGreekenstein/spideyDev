import { NextResponse } from "next/server";
import Stripe from 'stripe'

// Initialize Stripe with your secret key
// Ensure process.env.STRIPE_SECRET_KEY is correctly set in your Vercel environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- POST request handler (for Stripe Webhooks) ---
export async function POST(req){
  // Await the raw text payload from the request body
  const payload = await req.text();
  // Get the Stripe signature from the request headers
  const sig = req.headers.get('stripe-signature');

  // Ensure the webhook secret is set in your Vercel environment variables
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    console.error("STRIPE_WEBHOOK_SECRET environment variable is not set.");
    // Return a 500 Internal Server Error if the secret is missing
    return NextResponse.json({ error: "Server configuration error: Webhook secret missing." }, { status: 500 });
  }

  let event;

  try {
    // Construct and verify the Stripe event using the payload, signature, and secret
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    // Handle different event types from Stripe
    switch(event.type){
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log("Stripe Webhook Event: Checkout Session Completed:", session);
        // !!! IMPORTANT !!!
        // This is where you would typically fulfill the order,
        // update your database, send confirmation emails, etc.
        // This logic should be idempotent (safe to run multiple times).
        break;
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        console.log("Stripe Webhook Event: Customer Subscription Deleted:", subscription);
        // Logic for handling subscription deletion (e.g., revoke access)
        break;
      // You can add more cases for other event types you want to handle
      default:
        console.log(`Stripe Webhook Event: Unhandled event type ${event.type}`);
    }
  } catch (error) {
    // Log the precise error message if signature verification fails
    console.error("Stripe Webhook Signature Verification Failed:", error.message);
    // Return a 400 Bad Request status to Stripe, indicating a problem with the webhook processing
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  // Always return a 200 OK response to Stripe after successful processing
  // This acknowledges receipt of the webhook event.
  return NextResponse.json({ received: true }, { status: 200 });
}

// --- GET request handler (for browser redirects after checkout) ---
export async function GET(req) {
  // Parse the URL to get query parameters
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id'); // Get the session_id from the URL query

  if (sessionId) {
    try {
      // Retrieve the Checkout Session details from Stripe using the session ID
      // This uses your secret key, so it's secure.
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // Log the retrieved session for debugging purposes (will appear in Vercel logs)
      console.log("GET /api/payments - Session retrieved for session_id:", sessionId, session);

      // Return a JSON response with relevant session details to the client
      // The client-side (e.g., your success page) can then use this data to display info.
      return NextResponse.json({
        message: "Checkout session details retrieved successfully.",
        sessionId: session.id,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total, // Amount in smallest currency unit (e.g., cents)
        currency: session.currency,
        // Add any other session properties you need
      }, { status: 200 });

    } catch (error) {
      // Log any errors that occur during session retrieval
      console.error("GET /api/payments - Error retrieving session for ID:", sessionId, error);
      // Return an error response to the client
      return NextResponse.json({ error: "Failed to retrieve checkout session details." }, { status: 500 });
    }
  } else {
    // If no session_id is provided in the URL, return a message indicating that
    console.log("GET /api/payments - No session_id provided in query parameters.");
    return NextResponse.json(
      { message: "Please provide a session_id query parameter to retrieve checkout details." },
      { status: 400 }
    );
  }
}
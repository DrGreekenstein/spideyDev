import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "../../../lib/connectDB.js";
import {User} from "../../../lib/user_Schema.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
      const session = event.data.object;

    const email = session.customer_email;
    if (!email) return NextResponse.json({ success: false, error: "No email" });

    try {
      await connectDB();
      const user = await User.findOne({ email });

      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      user.plan = "pro";
      user.paymentHistory.push({
        date: new Date(),
        amount: session.amount_total / 100,
        stripeSessionId: session.id,
      });

      await user.save();
      console.log("✅ User upgraded to PRO:", user.email);
    } catch (error) {
      console.error("❌ MongoDB Update Error:", error);
      return new NextResponse("Database Error", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req){
  const payload = req.text();
  const sig = req. headers.get('stripe-signature');
  let event;

  const endpointSecret = process. env. STRIPE_WEBHOOK_SECRET;
  try {
    event = stripe.webhooks.constructEvent(payload,sig,endpointSecret)
    switch(event.type){
      case 'checkout.session.completed':
        const session = event.data.object;
        break;
      default:
        console.log("UNhandled case")
    }
  } catch (error) {
    return NextResponse.json({error:"ERRORRRRR"},{status:400})
  }
  return NextResponse.json(
    { status: "success", message: "Hello" },
    { status: 200 }
  );
}
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  plan: { type: String, default: "none" },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  paymentHistory: [
    {
      date: Date,
      amount: Number,
      stripeSessionId: String,
    },
  ],
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

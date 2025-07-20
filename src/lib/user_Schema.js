import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: String,
  plan: { type: String, default: "none" },
  paymentHistory: [
    {
      date: Date,
      amount: Number,
      stripeSessionId: String,
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);

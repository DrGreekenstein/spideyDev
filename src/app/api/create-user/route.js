// app/api/create-user/route.js
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "../../../lib/connectDB.js";
import { User } from "../../../lib/user_Schema.js"; // Your mongoose model

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectDB();

    const existingUser = await User.findOne({ clerkId: user.id });

    if (!existingUser) {
      await User.create({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.username || user.firstName,
        plan: "free",
      });
    }

    return new Response("User synced", { status: 200 });
  } catch (err) {
    console.error("❌ Error syncing user:", err);
    return new Response("Error", { status: 500 });
  }
}

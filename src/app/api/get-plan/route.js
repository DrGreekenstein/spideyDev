// app/api/get-plan/route.js
import { auth } from '@clerk/nextjs';
import connectDB from '../../../lib/connectDB.js';
import { User } from '../../../lib/user_Schema.js';

export async function GET() {
  const { userId } = auth();
  if (!userId) return new Response('Unauthorized', { status: 401 });

  await connectDB();
  const user = await User.findOne({ clerkId: userId });

  if (!user) return new Response('User not found', { status: 404 });

  return Response.json({ plan: user.plan });
}

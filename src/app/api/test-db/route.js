import { NextResponse } from 'next/server';
import connectDB from '../../../lib/connectDB.js';
import {User} from '../../../lib/user_Schema.js';
import { auth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Test database connection
    const dbStatus = mongoose.connection.readyState;
    const dbName = mongoose.connection.name;
    
    // Get user count
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      success: true,
      dbStatus,
      dbName,
      userCount,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Test DB error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Test user creation
    const testUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { 
        clerkId: userId,
        email: 'test@example.com',
        plan: 'test'
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({
      success: true,
      user: testUser,
      message: 'User created/updated successfully'
    });
  } catch (error) {
    console.error('Test user creation error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 
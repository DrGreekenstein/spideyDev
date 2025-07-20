import connectDB from '../../../lib/connectDB.js';
import Contact from '../../../lib/contact_Schema.js'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const details = await req.json();
  if(!details.firstName || !details.lastName|| !details.email|| !details.message){
    return NextResponse.json({ success: false, message: "Please fill all the fields" })
  }

  try {
    await connectDB()
    await new Contact(details).save()
    return NextResponse.json({
      success: true,
      message: "Message sent successfully"
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong"
    })
  }
}

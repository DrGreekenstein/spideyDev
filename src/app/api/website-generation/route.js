import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { largeText, smallText, selectedOptions } = body;

    // Validate required fields
    if (!largeText || largeText.trim() === '') {
      return NextResponse.json({ error: 'Main content is required' }, { status: 400 });
    }

    // Here you would typically:
    // 1. Process the content with AI
    // 2. Generate the website based on selected options
    // 3. Return the generated content or website URL

    // For now, return a mock response
    return NextResponse.json({
      success: true,
      message: 'Website generation request received',
      data: {
        content: largeText,
        description: smallText,
        options: selectedOptions,
        generatedUrl: 'https://example-generated-site.com'
      }
    });

  } catch (error) {
    console.error('Website generation error:', error);
    return NextResponse.json({ error: 'Failed to process website generation' }, { status: 500 });
  }
} 
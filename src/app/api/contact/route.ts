import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the submission to the console (as requested, since there's no specific service yet)
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log('Name:', data.name);
    console.log('Email:', data.email);
    console.log('Phone:', data.phone);
    console.log('Interest:', data.interest);
    console.log('Message:', data.message);
    console.log('-----------------------------------');

    // Here you would typically integrate with Formspree, Resend, SendGrid, etc.
    
    return NextResponse.json({ success: true, message: 'Message logged successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}

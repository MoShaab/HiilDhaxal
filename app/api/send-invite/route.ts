import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/lib/data/email'; // Ensure this path is correct

// Named export for the POST method
export async function POST(req: Request) {
  try {
    const { email, inviteCode } = await req.json();

    // Check if email and inviteCode are present
    if (!email || !inviteCode) {
      return NextResponse.json({ message: 'Email and invite code are required' }, { status: 400 });
    }

    console.log('Sending email to:', email); // Debugging log

    // Attempt to send the email
    await sendEmail(email, inviteCode);
    return NextResponse.json({ message: 'Invite email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending invite email' }, { status: 500 });
  }
}

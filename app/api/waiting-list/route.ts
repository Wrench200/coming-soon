import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { Resend } from 'resend';
import { EmailTemplate } from '@/app/email-template';
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Check if email already exists
  const { data: existing, error: selectError } = await supabase
    .from('waiting_list')
    .select('id')
    .eq('email', email)
    .single();

  if (selectError && selectError.code !== 'PGRST116') { // PGRST116: No rows found
    return NextResponse.json({ error: selectError.message }, { status: 400 });
  }

  if (existing) {
    return NextResponse.json({ error: 'This email is already on the waiting list.' }, { status: 409 });
  }

  const { error } = await supabase
    .from('waiting_list')
    .insert([{ email }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Send confirmation email via Resend
  try {
    console.log('Preparing to send confirmation email:', { email, EMAIL_FROM, resendApiKey: process.env.RESEND_API_KEY ? 'set' : 'not set' });
    if (EMAIL_FROM) {
      const response = await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'You are on the waiting list! 🎉',
        react: EmailTemplate(),
      });
      console.log('Response:', response);
      console.log('Confirmation email sent successfully');
    } else {
      console.log('EMAIL_FROM is not set');
    }
  } catch (mailError) {
    console.error('Resend email error:', mailError);
  }

  return NextResponse.json({ success: true });
} 
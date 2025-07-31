import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET() {
  try {
    // Test the Stripe connection by retrieving account information
    const account = await stripe.accounts.retrieve();
    
    return NextResponse.json({
      success: true,
      message: 'Stripe connection successful',
      accountId: account.id,
      country: account.country,
      currency: account.default_currency
    });
  } catch (error: any) {
    console.error('Stripe connection error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type,
      code: error.code
    }, { status: 500 });
  }
}
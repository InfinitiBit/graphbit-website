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
  } catch (error: unknown) {
    console.error('Stripe connection error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorType = (error as any)?.type || 'unknown';
    const errorCode = (error as any)?.code || 'unknown';
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      type: errorType,
      code: errorCode
    }, { status: 500 });
  }
}
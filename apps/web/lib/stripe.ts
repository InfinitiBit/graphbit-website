import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
});

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Basic Plan',
    description: 'Perfect for getting started with AI agents',
    price: 29,
    priceId: process.env.STRIPE_BASIC_PRICE_ID || 'price_basic',
    features: [
      'Up to 10 AI agents',
      'Basic LLM tracing',
      'Community support',
      '1GB storage'
    ],
  },
  pro: {
    name: 'Pro Plan',
    description: 'Advanced features for growing teams',
    price: 99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro',
    features: [
      'Up to 100 AI agents',
      'Advanced LLM tracing',
      'Priority support',
      '10GB storage',
      'Custom integrations'
    ],
  },
  enterprise: {
    name: 'Enterprise Plan',
    description: 'Unlimited power for large organizations',
    price: 299,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise',
    features: [
      'Unlimited AI agents',
      'Enterprise LLM tracing',
      '24/7 dedicated support',
      'Unlimited storage',
      'Custom integrations',
      'On-premise deployment'
    ],
  },
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;
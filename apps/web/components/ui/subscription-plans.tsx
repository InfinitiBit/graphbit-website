'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStripe, SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/lib/stripe';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';

interface SubscriptionPlansProps {
  onClose?: () => void;
}

export function SubscriptionPlans({ onClose }: SubscriptionPlansProps) {
  const [loading, setLoading] = useState<SubscriptionPlan | null>(null);

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      setLoading(plan);

      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe not loaded');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="text-lg text-gray-600">
          Unlock the full potential of AI agents with our subscription plans
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => {
          const planKey = key as SubscriptionPlan;
          const isPopular = planKey === 'pro';
          const isLoading = loading === planKey;

          return (
            <Card
              key={planKey}
              className={`relative transition-all duration-300 hover:shadow-lg ${
                isPopular ? 'scale-105 border-blue-500 shadow-lg' : 'border-gray-200'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  <Badge className="flex items-center gap-1 bg-blue-500 px-3 py-1 text-white">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4 text-center">
                <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="ml-1 text-gray-600">/month</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(planKey)}
                  disabled={isLoading}
                  className={`w-full ${
                    isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  'Subscribe Now'
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
        {onClose && (
          <Button variant="outline" onClick={onClose} className="mt-4">
            Maybe Later
          </Button>
        )}
      </div>
    </div>
  );
}

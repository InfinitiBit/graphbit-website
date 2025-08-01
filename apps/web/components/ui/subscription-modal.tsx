"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export function SubscriptionModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (plan: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 401) {
          alert('Please sign in to subscribe to a plan.')
          // Redirect to sign in page
          window.location.href = '/sign-in'
          return
        }
        if (response.status === 500) {
          alert('Stripe configuration is incomplete. Please contact support or check that valid Stripe price IDs are configured.')
          return
        }
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Failed to start checkout: ${errorMessage}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const plans = [
    {
      name: 'Basic Plan',
      price: '$29',
      description: 'Perfect for getting started',
      features: ['Up to 10 AI agents', 'Basic LLM tracing', 'Community support'],
      planId: 'basic'
    },
    {
      name: 'Pro Plan', 
      price: '$99',
      description: 'Advanced features for growing teams',
      features: ['Up to 100 AI agents', 'Advanced LLM tracing', 'Priority support'],
      planId: 'pro'
    },
    {
      name: 'Enterprise Plan',
      price: '$299', 
      description: 'Unlimited power for large organizations',
      features: ['Unlimited AI agents', 'Enterprise LLM tracing', '24/7 support'],
      planId: 'enterprise'
    }
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Subscribe to add new agents
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <div key={plan.planId} className="border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
                <div className="text-3xl font-bold mt-2">{plan.price}<span className="text-sm font-normal">/month</span></div>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleSubscribe(plan.planId)}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
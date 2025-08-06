'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Star,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Sparkles,


  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'Forever free',
    description: 'Perfect for getting started with AI agents',
    icon: Sparkles,
    gradient: 'from-accent to-accent-light',
    background: 'from-accent/5 via-accent/3 to-accent/1',
    border: 'border-accent/20 hover:border-accent/40',
    popular: false,
    features: [
      '5 AI agents per month',
      '1,000 API calls included',
      'Basic monitoring & tracing',
      'Community support',
      'Pre-built agent templates',
      'Standard response times'
    ],
    limitations: [
      'Limited to personal projects',
      'No custom integrations',
      'No priority support'
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$49',
    period: 'per month',
    description: 'For serious developers and growing teams',
    icon: Zap,
    gradient: 'from-warning to-destructive',
    background: 'from-warning/5 via-destructive/3 to-destructive/1',
    border: 'border-warning/20 hover:border-warning/40',
    popular: true,
    features: [
      '50 AI agents per month',
      '25,000 API calls included',
      'Advanced analytics & insights',
      'Real-time monitoring',
      'Custom agent marketplace',
      'Priority email support',
      'Advanced debugging tools',
      'Performance optimization',
      'Custom model integrations'
    ],
    limitations: [],
    cta: 'Start 14-Day Trial',
    ctaVariant: 'default' as const
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'Contact us',
    description: 'For large teams and mission-critical applications',
    icon: CheckCircle,
    gradient: 'from-primary to-primary-light',
    background: 'from-primary/5 via-primary/3 to-primary/1',
    border: 'border-primary/20 hover:border-primary/40',
    popular: false,
    features: [
      'Unlimited AI agents',
      'Unlimited API calls',
      'White-label solutions',
      'Dedicated infrastructure',
      'Advanced security & compliance',
      '24/7 phone & chat support',
      'Custom integrations',
      'SLA guarantees',
      'On-premise deployment',
      'Custom training & onboarding',
      'Dedicated success manager'
    ],
    limitations: [],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const
  }
];

const addOns = [
  {
    name: 'Extra API Calls',
    description: 'Additional API calls beyond your plan limit',
    price: '$0.001',
    unit: 'per call'
  },
  {
    name: 'Priority Support',
    description: '24/7 priority support with 1-hour response time',
    price: '$99',
    unit: 'per month'
  },
  {
    name: 'Custom Model Training',
    description: 'Train custom models on your specific data',
    price: '$499',
    unit: 'per model'
  },
  {
    name: 'Advanced Security',
    description: 'SOC 2 compliance, audit logs, and enhanced encryption',
    price: '$199',
    unit: 'per month'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechCorp',
    content: 'GraphBit\'s pricing is transparent and scales with our needs. The professional plan gave us everything we needed to launch our AI product.',
    rating: 5,
    plan: 'Professional'
  },
  {
    name: 'Mark Chen',
    role: 'Founder, AI Startup',
    content: 'Started with the free plan to validate our idea, then seamlessly upgraded as we grew. The value is incredible.',
    rating: 5,
    plan: 'Free → Professional'
  }
];

interface PricingSectionProps {
  className?: string;
  showHeader?: boolean;
  showAddOns?: boolean;
  showTestimonials?: boolean;
}

export function PricingSection({ 
  className = "",
  showHeader = true,
  showAddOns = true,
  showTestimonials = true 
}: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section
      id="pricing-section"
      className={`relative bg-gradient-to-b from-background via-warning/5 to-background py-24 sm:py-28 lg:py-36 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-warning/5 to-destructive/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-destructive/5 to-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 px-6 py-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-warning"></div>
              <span className="text-sm font-bold uppercase tracking-wide text-warning">
                Simple Pricing
              </span>
            </div>

            <h2 className="mb-8 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Choose the Perfect Plan
              <span className="mt-3 block bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
                for Your AI Journey
              </span>
            </h2>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground lg:text-2xl">
              Start free, scale as you grow. No hidden fees, no vendor lock-in.
              Cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-warning focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-gradient-to-r from-warning to-destructive transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Yearly
                </span>
                <Badge className="bg-gradient-to-r from-warning to-destructive text-white text-xs">
                  Save 20%
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isPopular = plan.popular;
            
            return (
              <div
                key={plan.id}
                className={`group relative ${isPopular ? 'lg:-mt-4 lg:scale-105' : ''}`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                    <div className="rounded-full bg-gradient-to-r from-warning to-destructive px-4 py-1 text-xs font-bold text-white shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${plan.background} backdrop-blur-xl border-2 ${isPopular ? 'border-warning/40 shadow-2xl shadow-warning/20' : plan.border} p-8 transition-all duration-500 hover:shadow-lg ${isPopular ? 'hover:shadow-warning/20' : ''} hover:border-opacity-60`}>
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} opacity-0 blur-sm transition-all duration-500 group-hover:opacity-10 ${isPopular ? 'opacity-5' : ''}`} />
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${plan.gradient} shadow-lg transition-all duration-300 group-hover:shadow-md`}>
                        <IconComponent className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      {isPopular && (
                        <Star className="h-6 w-6 fill-warning text-warning" />
                      )}
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    
                    <p className="mb-6 text-muted-foreground">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                      {billingPeriod === 'yearly' && plan.price !== '$0' && plan.price !== 'Custom' && (
                        <div className="mt-2 text-sm text-muted-foreground line-through">
                          Was {plan.id === 'professional' ? '$59' : '$Custom'}/month
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      className={`w-full mb-8 transition-all duration-300 ${isPopular ? 'bg-gradient-to-r from-warning to-destructive text-white hover:from-warning/95 hover:to-destructive/95 hover:shadow-md' : 'hover:shadow-sm'}`}
                      variant={plan.ctaVariant}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">What's included:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <h5 className="text-sm font-medium text-muted-foreground mb-3">Not included:</h5>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, limitIndex) => (
                              <li key={limitIndex} className="flex items-center gap-3">
                                <div className="h-4 w-4 rounded-full bg-muted flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons Section */}
        {showAddOns && (
          <div className="mt-20">
            <div className="mb-12 text-center">
              <h3 className="text-3xl font-bold text-foreground sm:text-4xl">
                Add-ons & Extensions
              </h3>
              <p className="mt-4 text-xl text-muted-foreground">
                Customize your plan with additional features
              </p>
            </div>

            <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 p-6 backdrop-blur-sm transition-all duration-400 hover:border-warning/30 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {addon.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {addon.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">
                        {addon.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {addon.unit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Testimonials */}
        {showTestimonials && (
          <div className="mt-20">
            <div className="mb-12 text-center">
              <h3 className="text-3xl font-bold text-foreground sm:text-4xl">
                What Our Customers Say
              </h3>
              <p className="mt-4 text-xl text-muted-foreground">
                See how GraphBit pricing works for real businesses
              </p>
            </div>

            <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 p-6 backdrop-blur-sm transition-all duration-400 hover:border-warning/30 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.plan}
                    </Badge>
                  </div>
                  
                  <blockquote className="mb-4 text-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ or CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-warning/20 bg-gradient-to-br from-warning/5 to-destructive/5 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Questions about pricing?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
              <Button 
                className="bg-gradient-to-r from-warning to-destructive text-white hover:from-warning/95 hover:to-destructive/95 transition-all duration-300 hover:shadow-md"
                size="lg"
              >
                <Shield className="mr-2 h-4 w-4" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const features = [
  {
    icon: '📊',
    title: 'Real-time Monitoring',
    description: 'Track every interaction, performance metric, and decision path with comprehensive real-time dashboards and alerts.',
    gradient: 'from-primary to-primary-light'
  },
  {
    icon: '🔒',
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with SOC 2 compliance, data encryption, and built-in protection against prompt injection attacks.',
    gradient: 'from-success to-success-light'
  },
  {
    icon: '⚡',
    title: 'Auto-scaling Infrastructure',
    description: 'Handle any load with intelligent auto-scaling that adapts to demand while optimizing costs and performance automatically.',
    gradient: 'from-accent to-accent-light'
  },
  {
    icon: '💻',
    title: 'Developer Experience',
    description: 'Intuitive APIs, comprehensive documentation, and powerful debugging tools that make development fast and enjoyable.',
    gradient: 'from-warning to-warning-light'
  },
  {
    icon: '🏪',
    title: 'AI Agent Marketplace',
    description: 'Discover and deploy pre-built AI agents or share your creations with a thriving community of developers.',
    gradient: 'from-secondary to-secondary-light'
  },
  {
    icon: '📈',
    title: 'Advanced Analytics',
    description: 'Deep insights into agent performance, user interactions, and business metrics with customizable dashboards and reports.',
    gradient: 'from-primary-light to-accent'
  }
];

const testimonials = [
  {
    name: 'Sarah Kim',
    role: 'CTO, AI Startup',
    badge: 'Tech Lead',
    content: 'GraphBit cut our AI development time by 70%. The marketplace had exactly what we needed, and the tracing tools helped us optimize performance instantly.',
    initials: 'SK',
    gradient: 'from-primary to-accent'
  },
  {
    name: 'David Kim',
    role: 'Lead Engineer, Fortune 500',
    badge: 'Enterprise',
    content: 'The observability features are game-changing. We can now track every LLM interaction across our 25+ microservices in real-time.',
    initials: 'DK',
    gradient: 'from-success to-primary'
  },
  {
    name: 'Alex Chen',
    role: 'Indie Developer',
    badge: 'Solo Dev',
    content: 'From prototype to production in 2 days. Now earning $15K/month from my AI SaaS. GraphBit made it possible.',
    initials: 'AC',
    gradient: 'from-accent to-secondary'
  }
];

export function StaticFeaturesSection() {
  return (
    <>
      {/* Enhanced Features Section */}
      <section
        id="features-section"
        className="relative bg-gradient-to-b from-background via-muted/30 to-background py-20 sm:py-24 lg:py-32"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Key Features
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Everything You Need to Build
              <span className="mt-2 block bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                Production-Ready AI Agents
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              From development to deployment, monitoring to scaling - GraphBit provides the
              complete toolkit for AI agent success.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

                <div className="relative">
                  <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg text-2xl`}>
                    {feature.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-br from-muted-dark to-secondary py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold text-white sm:text-5xl">10,000+</div>
              <div className="text-white/70">AI Agents Deployed</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-white sm:text-5xl">99.9%</div>
              <div className="text-white/70">Uptime Guarantee</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-white sm:text-5xl">500+</div>
              <div className="text-white/70">Enterprise Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Testimonials */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="container-responsive">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              What developers are saying
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              See how GraphBit is transforming AI development workflows
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-card/70 shadow-lg backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-secondary to-muted-dark px-3 py-1 text-xs font-medium text-white">
                      {testimonial.badge}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 font-medium leading-relaxed text-foreground">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-bold text-white`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
import { 
  Star, 
  BarChart3, 
  Shield, 
  Zap, 
  Code, 
  Package, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';


const features = [
  {
    icon: BarChart3,
    title: 'Real-time Monitoring',
    description: 'Track every interaction, performance metric, and decision path with comprehensive real-time dashboards and alerts.',
    gradient: 'from-warning to-warning-light',
    background: 'from-warning/5 via-warning/3 to-warning/1',
    border: 'border-warning/20 hover:border-warning/40'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with SOC 2 compliance, data encryption, and built-in protection against prompt injection attacks.',
    gradient: 'from-destructive to-destructive-light',
    background: 'from-destructive/5 via-destructive/3 to-destructive/1',
    border: 'border-destructive/20 hover:border-destructive/40'
  },
  {
    icon: Zap,
    title: 'Auto-scaling Infrastructure',
    description: 'Handle any load with intelligent auto-scaling that adapts to demand while optimizing costs and performance automatically.',
    gradient: 'from-accent to-accent-light',
    background: 'from-accent/5 via-accent/3 to-accent/1',
    border: 'border-accent/20 hover:border-accent/40'
  },
  {
    icon: Code,
    title: 'Developer Experience',
    description: 'Intuitive APIs, comprehensive documentation, and powerful debugging tools that make development fast and enjoyable.',
    gradient: 'from-primary to-primary-light',
    background: 'from-primary/5 via-primary/3 to-primary/1',
    border: 'border-primary/20 hover:border-primary/40'
  },
  {
    icon: Package,
    title: 'AI Agent Marketplace',
    description: 'Discover and deploy pre-built AI agents or share your creations with a thriving community of developers.',
    gradient: 'from-secondary to-secondary-light',
    background: 'from-secondary/5 via-secondary/3 to-secondary/1',
    border: 'border-secondary/20 hover:border-secondary/40'
  },
  {
    icon: TrendingUp,
    title: 'Advanced Analytics',
    description: 'Deep insights into agent performance, user interactions, and business metrics with customizable dashboards and reports.',
    gradient: 'from-warning to-accent-light',
    background: 'from-warning/5 via-accent/3 to-accent/1',
    border: 'border-warning/20 hover:border-accent/40'
  }
];

const testimonials = [
  {
    name: 'Sarah Kim',
    role: 'CTO, AI Startup',
    badge: 'Tech Lead',
    content: 'GraphBit cut our AI development time by 70%. The marketplace had exactly what we needed, and the tracing tools helped us optimize performance instantly.',
    initials: 'SK',
    gradient: 'from-warning to-destructive'
  },
  {
    name: 'David Kim',
    role: 'Lead Engineer, Fortune 500',
    badge: 'Enterprise',
    content: 'The observability features are game-changing. We can now track every LLM interaction across our 25+ microservices in real-time.',
    initials: 'DK',
    gradient: 'from-accent to-warning'
  },
  {
    name: 'Alex Chen',
    role: 'Indie Developer',
    badge: 'Solo Dev',
    content: 'From prototype to production in 2 days. Now earning $15K/month from my AI SaaS. GraphBit made it possible.',
    initials: 'AC',
    gradient: 'from-destructive to-accent'
  }
];

export function StaticFeaturesSection() {
  return (
    <>
      {/* Enhanced Features Section */}
      <section
        id="features-section"
        className="relative bg-gradient-to-b from-background via-warning/5 to-background py-24 sm:py-28 lg:py-36"
      >
        {/* Modern Background Pattern - using consistent CSS variables */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-warning/5 to-destructive/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-destructive/5 to-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 px-6 py-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-warning"></div>
              <span className="text-sm font-bold uppercase tracking-wide text-warning">
                Platform Features
              </span>
            </div>

            <h2 className="mb-8 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Everything You Need to Build
              <span className="mt-3 block bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
                AI Agents That Scale
              </span>
            </h2>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground lg:text-2xl">
              From development to deployment, monitoring to scaling - GraphBit provides the
              enterprise-grade infrastructure your AI applications deserve.
            </p>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="mx-auto grid max-w-8xl gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${feature.background} backdrop-blur-xl border-2 ${feature.border} p-4 sm:p-5 lg:p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}>
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-40" />
                    
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm lg:text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {feature.description}
                      </p>
                      
                      {/* Learn more indicator */}
                      <div className="mt-4 flex items-center text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <span className="text-xs font-semibold">Learn how this helps</span>
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full rounded-b-xl`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative bg-gradient-to-br from-warning via-destructive to-accent py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold text-white sm:text-4xl">
              Powering the Future of AI
            </h3>
            <p className="mt-4 text-xl text-white/90">
              Join thousands of teams already building with GraphBit
            </p>
          </div>
          
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="group">
              <div className="mb-4 text-5xl font-black text-white sm:text-6xl transition-transform duration-300 group-hover:scale-110">
                25,000+
              </div>
              <div className="text-xl font-semibold text-white/90">AI Agents Deployed</div>
              <div className="mt-2 text-white/70">Across 100+ countries</div>
            </div>
            <div className="group">
              <div className="mb-4 text-5xl font-black text-white sm:text-6xl transition-transform duration-300 group-hover:scale-110">
                99.99%
              </div>
              <div className="text-xl font-semibold text-white/90">Uptime Guarantee</div>
              <div className="mt-2 text-white/70">Enterprise SLA included</div>
            </div>
            <div className="group">
              <div className="mb-4 text-5xl font-black text-white sm:text-6xl transition-transform duration-300 group-hover:scale-110">
                1,500+
              </div>
              <div className="text-xl font-semibold text-white/90">Enterprise Customers</div>
              <div className="mt-2 text-white/70">Fortune 500 companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="relative py-20 sm:py-24 lg:py-28">
        <div className="container-responsive">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-warning/20 to-destructive/20 px-6 py-3">
              <Star className="h-5 w-5 fill-warning text-warning" />
              <span className="font-bold text-warning">Customer Stories</span>
            </div>
            
            <h2 className="text-4xl font-black text-foreground sm:text-5xl lg:text-6xl">
              What developers are saying
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              See how GraphBit is transforming AI development workflows across industries
            </p>
          </div>

          <div className="grid gap-4 lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 p-4 lg:p-5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-warning/40"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-warning to-destructive opacity-0 blur transition-all duration-500 group-hover:opacity-20"></div>
                
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-warning to-destructive px-3 py-1 text-xs lg:text-sm font-bold text-white">
                      {testimonial.badge}
                    </div>
                  </div>
                  
                  <blockquote className="mb-4 text-sm lg:text-base font-medium leading-relaxed text-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-lg bg-gradient-to-br ${testimonial.gradient} text-sm lg:text-base font-bold text-white shadow-lg`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-sm lg:text-base font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-xs lg:text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
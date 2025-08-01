import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HeroSection } from '@/components/ui/hero-section';
import { ProblemStatementSection } from '@/components/ui/problem-statement-section';
import { SolutionOverviewSection } from '@/components/ui/solution-overview-section';
import { ArrowRight, CheckCircle, Star, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Enhanced background with modern gradient layers */}
      <div className="animated-gradient-bg fixed inset-0 -z-10 w-full h-full"></div>

      <main className="relative w-full h-full">
        {/* New Hero Section */}
        <HeroSection />

        {/* Problem Statement Section */}
        <ProblemStatementSection />

        {/* Solution Overview Section */}
        <SolutionOverviewSection />

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
              {/* Real-time Monitoring */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-lighter/20 via-transparent to-primary-lighter/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">Real-time Monitoring</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Track every interaction, performance metric, and decision path with
                    comprehensive real-time dashboards and alerts.
                  </p>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-success-lighter/20 via-transparent to-success-lighter/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success-light shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Security & Compliance
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Enterprise-grade security with SOC 2 compliance, data encryption, and built-in
                    protection against prompt injection attacks.
                  </p>
                </div>
              </div>

              {/* Auto-scaling Infrastructure */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-lighter/20 via-transparent to-accent-lighter/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Auto-scaling Infrastructure
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Handle any load with intelligent auto-scaling that adapts to demand while
                    optimizing costs and performance automatically.
                  </p>
                </div>
              </div>

              {/* Developer Experience */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-warning-lighter/20 via-transparent to-warning-lighter/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-warning to-warning-light shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">Developer Experience</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Intuitive APIs, comprehensive documentation, and powerful debugging tools that
                    make development fast and enjoyable.
                  </p>
                </div>
              </div>

              {/* AI Agent Marketplace */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-lighter/20 via-transparent to-secondary-lighter/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-light shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">AI Agent Marketplace</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Discover and deploy pre-built AI agents or share your creations with a thriving
                    community of developers.
                  </p>
                </div>
              </div>

              {/* Advanced Analytics */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-lighter/20 via-transparent to-accent-lighter/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light to-accent shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">Advanced Analytics</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Deep insights into agent performance, user interactions, and business metrics
                    with customizable dashboards and reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white shadow-lg transition-all duration-300 hover:from-primary-light hover:to-accent-light hover:shadow-xl"
              >
                Start Building Today
              </Button>
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
              <Card className="border-0 bg-card/70 shadow-lg backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-secondary to-muted-dark px-3 py-1 text-xs font-medium text-white">
                      Tech Lead
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 font-medium leading-relaxed text-foreground">
                    &quot;GraphBit cut our AI development time by <strong>70%</strong>. The
                    marketplace had exactly what we needed, and the tracing tools helped us optimize
                    performance instantly.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Sarah Kim</p>
                      <p className="text-sm text-muted-foreground">CTO, AI Startup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/70 shadow-lg backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-secondary to-muted-dark px-3 py-1 text-xs font-medium text-white">
                      Enterprise
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 font-medium leading-relaxed text-foreground">
                    &quot;The observability features are game-changing. We can now track every LLM
                    interaction across our <strong>25+ microservices</strong>
                    in real-time.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-success to-primary text-sm font-bold text-white">
                      DK
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">David Kim</p>
                      <p className="text-sm text-muted-foreground">Lead Engineer, Fortune 500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/70 shadow-lg backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-secondary to-muted-dark px-3 py-1 text-xs font-medium text-white">
                      Solo Dev
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 font-medium leading-relaxed text-foreground">
                    &quot;From prototype to production in <strong>2 days</strong>. Now earning{' '}
                    <strong>$15K/month</strong> from my AI SaaS. GraphBit made it possible.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-secondary text-sm font-bold text-white">
                      AC
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Alex Chen</p>
                      <p className="text-sm text-muted-foreground">Indie Developer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Modern CTA Section */}
        <section className="relative py-16 sm:py-20 lg:py-24">
          <div className="container-responsive">
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-secondary via-muted-dark to-secondary p-8 shadow-2xl lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-success/10" />

              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Ready to build the future of AI?
                </h2>
                <p className="mb-8 text-lg text-white/80 sm:text-xl">
                  Join thousands of developers using GraphBit to create, deploy, and monitor AI
                  agents at scale. Start your free trial today.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/marketplace">
                    <Button
                      size="lg"
                      className="bg-white px-8 py-4 text-lg font-semibold text-secondary transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-xl"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Button>
                  </Link>

                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white/20 bg-transparent px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      View Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute left-4 top-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
              <div className="absolute bottom-4 right-4 h-32 w-32 rounded-full bg-gradient-to-br from-accent/20 to-success/20 blur-xl" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/ui/hero-section';
import { ProblemStatementSection } from '@/components/ui/problem-statement-section';
import { SolutionOverviewSection } from '@/components/ui/solution-overview-section';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Star,
  Zap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Enhanced background with modern gradient layers */}
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative">
        {/* New Hero Section */}
        <HeroSection />

        {/* Problem Statement Section */}
        <ProblemStatementSection />

        {/* Solution Overview Section */}
        <SolutionOverviewSection />
        
        {/* Enhanced Features Section */}
        <section id="features-section" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/30 to-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Key Features</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Everything You Need to Build 
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Production-Ready AI Agents
                </span>
              </h2>
              
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                From development to deployment, monitoring to scaling - GraphBit provides the complete toolkit for AI agent success.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {/* Real-time Monitoring */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg mb-6">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Monitoring</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Track every interaction, performance metric, and decision path with comprehensive real-time dashboards and alerts.
                  </p>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg mb-6">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Security & Compliance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enterprise-grade security with SOC 2 compliance, data encryption, and built-in protection against prompt injection attacks.
                  </p>
                </div>
              </div>

              {/* Auto-scaling Infrastructure */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg mb-6">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Auto-scaling Infrastructure</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Handle any load with intelligent auto-scaling that adapts to demand while optimizing costs and performance automatically.
                  </p>
                </div>
              </div>

              {/* Developer Experience */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg mb-6">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Developer Experience</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Intuitive APIs, comprehensive documentation, and powerful debugging tools that make development fast and enjoyable.
                  </p>
                </div>
              </div>

              {/* AI Agent Marketplace */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg mb-6">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Agent Marketplace</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover and deploy pre-built AI agents or share your creations with a thriving community of developers.
                  </p>
                </div>
              </div>

              {/* Advanced Analytics */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg mb-6">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Deep insights into agent performance, user interactions, and business metrics with customizable dashboards and reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Building Today
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="relative py-16 sm:py-20 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">10,000+</div>
                <div className="text-gray-400">AI Agents Deployed</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400">Enterprise Customers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Testimonials */}
        <section className="relative py-16 sm:py-20 lg:py-24">
          <div className="container-responsive">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                What developers are saying
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                See how GraphBit is transforming AI development workflows
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-1 text-xs font-medium text-white">
                      Tech Lead
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 font-medium leading-relaxed text-gray-900">
                    "GraphBit cut our AI development time by <strong>70%</strong>. 
                    The marketplace had exactly what we needed, and the tracing tools 
                    helped us optimize performance instantly."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Kim</p>
                      <p className="text-sm text-gray-600">CTO, AI Startup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-1 text-xs font-medium text-white">
                      Enterprise
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 font-medium leading-relaxed text-gray-900">
                    "The observability features are game-changing. We can now track 
                    every LLM interaction across our <strong>25+ microservices</strong> 
                    in real-time."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-sm font-bold text-white">
                      DK
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">David Kim</p>
                      <p className="text-sm text-gray-600">Lead Engineer, Fortune 500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-1 text-xs font-medium text-white">
                      Solo Dev
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 font-medium leading-relaxed text-gray-900">
                    "From prototype to production in <strong>2 days</strong>. 
                    Now earning <strong>$15K/month</strong> from my AI SaaS. 
                    GraphBit made it possible."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
                      AC
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Alex Chen</p>
                      <p className="text-sm text-gray-600">Indie Developer</p>
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
            This code applies responsive design improvements to the main page, including adjustments to background orbs, text sizes, and button layouts, to ensure a better user experience across different devices.            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />

              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Ready to build the future of AI?
                </h2>
                <p className="mb-8 text-lg text-gray-300 sm:text-xl">
                  Join thousands of developers using GraphBit to create, deploy, and monitor 
                  AI agents at scale. Start your free trial today.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/marketplace">
                    <Button
                      size="lg"
                      className="bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:scale-105"
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

                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl" />
              <div className="absolute bottom-4 right-4 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
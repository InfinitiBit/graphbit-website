import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
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
  ArrowRight,
  BarChart3,
  Package,
  Code,
  Sparkles,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Globe,
  Users,
  Clock,
  TrendingUp,
  Activity,
  Download,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Enhanced background with gradient layers */}
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      {/* Enhanced floating bubble system with multiple layers */}
      <div className="-z-5 pointer-events-none fixed inset-0 overflow-hidden">
        {/* Main floating bubbles with variety */}
        <div
          className="bubble bubble-1"
          style={{
            left: '10%',
            animationDelay: '0s',
            animationDuration: '15s',
          }}
        ></div>
        <div
          className="bubble bubble-2"
          style={{
            left: '25%',
            animationDelay: '3s',
            animationDuration: '18s',
          }}
        ></div>
        <div
          className="bubble bubble-3"
          style={{
            left: '45%',
            animationDelay: '7s',
            animationDuration: '12s',
          }}
        ></div>
        <div
          className="bubble bubble-4"
          style={{
            left: '65%',
            animationDelay: '2s',
            animationDuration: '20s',
          }}
        ></div>
        <div
          className="bubble bubble-5"
          style={{
            left: '80%',
            animationDelay: '9s',
            animationDuration: '16s',
          }}
        ></div>
        <div
          className="bubble bubble-6"
          style={{
            left: '15%',
            animationDelay: '5s',
            animationDuration: '14s',
          }}
        ></div>
        <div
          className="bubble bubble-7"
          style={{
            left: '90%',
            animationDelay: '11s',
            animationDuration: '22s',
          }}
        ></div>

        {/* Smaller accent bubbles for subtle movement */}
        <div
          className="micro-bubble"
          style={{
            left: '5%',
            animationDelay: '1s',
            animationDuration: '25s',
          }}
        ></div>
        <div
          className="micro-bubble"
          style={{
            left: '35%',
            animationDelay: '8s',
            animationDuration: '19s',
          }}
        ></div>
        <div
          className="micro-bubble"
          style={{
            left: '55%',
            animationDelay: '13s',
            animationDuration: '17s',
          }}
        ></div>
        <div
          className="micro-bubble"
          style={{
            left: '75%',
            animationDelay: '4s',
            animationDuration: '21s',
          }}
        ></div>
        <div
          className="micro-bubble"
          style={{
            left: '95%',
            animationDelay: '15s',
            animationDuration: '23s',
          }}
        ></div>
      </div>

      {/* Enhanced gradient orbs for depth */}
      <div className="-z-5 pointer-events-none fixed inset-0 overflow-hidden">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      <main className="relative min-h-screen">
        {/* Enhanced Hero Section with proper top spacing */}
        <section className="relative overflow-hidden pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
          <div className="container-responsive relative z-10">
            <div className="mx-auto max-w-6xl text-center">
              {/* Enhanced badge with black theme */}
              <div className="animate-fade-in-up mb-6 sm:mb-8">
                <span className="responsive-px responsive-text-sm shadow-modern touch-target-sm inline-flex items-center rounded-full border-2 border-gray-200 bg-white py-2 font-bold text-gray-900 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 sm:py-3">
                  <Sparkles className="mr-2 h-3.5 w-3.5 animate-pulse" />
                  <span className="relative">
                    🚀 <span className="hidden xs:inline">Introducing </span> LLM Tracing & Agent
                    Marketplace
                  </span>
                </span>
              </div>

              {/* Main heading with enhanced responsive styling */}
              <div className="animate-fade-in-up animation-delay-200">
                <h1 className="responsive-text-3xl hero-title text-balance font-bold tracking-tight">
                  <span className="hero-title-main block">Ship production-ready AI agents in</span>
                  <span className="gradient-text-enhanced relative mt-2 inline-block lg:mt-0">
                    2 minutes
                    <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-gray-100/40 via-gray-200/20 to-gray-100/40 opacity-60 blur-xl"></div>
                  </span>
                  <span className="responsive-text-base mt-3 block text-gray-600 sm:mt-4">
                    Turn your AI ideas into revenue-generating products today
                  </span>
                </h1>
              </div>

              {/* Enhanced description with key value props */}
              <div className="animate-fade-in-up animation-delay-400">
                <p className="responsive-text-sm responsive-px relative mx-auto mt-6 max-w-4xl text-balance leading-relaxed text-gray-600 sm:mt-8 lg:px-0">
                  <span className="relative z-10">
                    The most intuitive platform for deploying, monitoring, and scaling AI agents.
                    Access our curated marketplace with <strong>1,000+ pre-built agents</strong>,
                    get
                    <strong>real-time tracing insights</strong>, and deploy with{' '}
                    <strong>enterprise-grade security</strong>— all backed by our{' '}
                    <strong>99.99% uptime SLA</strong>.
                  </span>
                </p>

                {/* New value proposition highlights */}
                <div className="responsive-gap responsive-text-xs mt-4 flex flex-wrap items-center justify-center text-gray-500 sm:mt-6">
                  <div className="touch-target-sm group flex items-center gap-2">
                    <Star className="h-3 w-3 text-gray-400 transition-colors group-hover:text-gray-600 sm:h-4 sm:w-4" />
                    <span className="transition-colors group-hover:text-gray-700">
                      SOC 2 Certified
                    </span>
                  </div>
                  <div className="touch-target-sm group flex items-center gap-2">
                    <Users className="h-3 w-3 text-gray-400 transition-colors group-hover:text-gray-600 sm:h-4 sm:w-4" />
                    <span className="transition-colors group-hover:text-gray-700">
                      10K+ Active Developers
                    </span>
                  </div>
                  <div className="touch-target-sm group flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-400 transition-colors group-hover:text-gray-600 sm:h-4 sm:w-4" />
                    <span className="transition-colors group-hover:text-gray-700">
                      Deploy in &lt;2 minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA buttons with black theme */}
              <div className="responsive-gap animate-fade-in-up animation-delay-600 mt-8 flex flex-wrap items-center justify-center sm:mt-12">
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    className="responsive-text-base shadow-modern hover:shadow-enhanced touch-target group h-12 bg-black px-6 font-bold text-white transition-all duration-200 hover:bg-gray-800 sm:h-14 sm:px-8"
                  >
                    <span className="flex items-center">
                      <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden xs:inline">Start Building </span>Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </Link>
                <Link href="/tracing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="responsive-text-base touch-target group h-12 border-2 border-gray-300 px-6 font-bold text-black transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 sm:h-14 sm:px-8"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">Watch </span>Demo
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Enhanced feature indicators with black theme */}
              <div className="responsive-gap responsive-text-xs animate-fade-in-up animation-delay-800 mt-12 flex flex-wrap items-center justify-center text-gray-700 sm:mt-16">
                <div className="touch-target-sm flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                  <span className="font-medium">Free tier available</span>
                </div>
                <div className="touch-target-sm flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50">
                  <div className="animation-delay-300 h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                  <span className="font-medium">100% open source</span>
                </div>
                <div className="touch-target-sm flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50">
                  <div className="animation-delay-600 h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="touch-target-sm flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50">
                  <div className="animation-delay-900 h-2 w-2 animate-pulse rounded-full bg-orange-500"></div>
                  <span className="font-medium">API-first platform</span>
                </div>
              </div>

              {/* Hero stats cards with black theme */}
              <div className="relative mx-auto mt-20 max-w-4xl sm:mt-24">
                <div className="animate-fade-in-up animation-delay-1000 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                  <div className="shadow-subtle hover:shadow-modern rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-200 sm:p-4">
                    <div className="responsive-text-base flex items-center gap-1 font-bold text-gray-900">
                      99.99%
                      <TrendingUp className="h-3 w-3 text-green-500 sm:h-4 sm:w-4" />
                    </div>
                    <div className="text-xs font-medium text-gray-600">Uptime SLA</div>
                  </div>
                  <div className="shadow-subtle hover:shadow-modern rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-200 sm:p-4">
                    <div className="responsive-text-base flex items-center gap-1 font-bold text-gray-900">
                      &lt;50ms
                      <Zap className="h-3 w-3 text-yellow-500 sm:h-4 sm:w-4" />
                    </div>
                    <div className="text-xs font-medium text-gray-600">Response Time</div>
                  </div>
                  <div className="shadow-subtle hover:shadow-modern rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-200 sm:p-4">
                    <div className="responsive-text-base flex items-center gap-1 font-bold text-gray-900">
                      1,000+
                      <Download className="h-3 w-3 text-blue-500 sm:h-4 sm:w-4" />
                    </div>
                    <div className="text-xs font-medium text-gray-600">AI Agents</div>
                  </div>
                  <div className="shadow-subtle hover:shadow-modern rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-200 sm:p-4">
                    <div className="responsive-text-base flex items-center gap-1 font-bold text-gray-900">
                      50M+
                      <Activity className="h-3 w-3 text-red-500 sm:h-4 sm:w-4" />
                    </div>
                    <div className="text-xs font-medium text-gray-600">API Calls</div>
                  </div>
                </div>
              </div>

              {/* Trust indicators with black theme */}
              <div className="animate-fade-in-up animation-delay-1000 mt-20 sm:mt-24">
                <p className="responsive-text-sm mb-4 font-bold text-gray-700 sm:mb-6">
                  🏢 Trusted by industry leaders
                </p>
                <div className="responsive-gap flex flex-wrap items-center justify-center">
                  <div className="responsive-text-sm cursor-default rounded-lg border border-gray-200 bg-white px-4 py-2 font-bold text-gray-900 transition-colors hover:bg-gray-50">
                    TechCorp
                  </div>
                  <div className="responsive-text-sm hidden cursor-default rounded-lg border border-gray-200 bg-white px-4 py-2 font-bold text-gray-900 transition-colors hover:bg-gray-50 xs:block">
                    AI Innovations
                  </div>
                  <div className="responsive-text-sm cursor-default rounded-lg border border-gray-200 bg-white px-4 py-2 font-bold text-gray-900 transition-colors hover:bg-gray-50">
                    StartupLab
                  </div>
                  <div className="responsive-text-sm hidden cursor-default rounded-lg border border-gray-200 bg-white px-4 py-2 font-bold text-gray-900 transition-colors hover:bg-gray-50 sm:block">
                    DataFlow
                  </div>
                  <div className="responsive-text-sm hidden cursor-default rounded-lg border border-gray-200 bg-white px-4 py-2 font-bold text-gray-900 transition-colors hover:bg-gray-50 md:block">
                    CloudTech
                  </div>
                </div>
              </div>

              {/* Quick feature preview cards with black theme */}
              <div className="grid-responsive-3 responsive-gap animate-fade-in-up animation-delay-1200 mx-auto mt-16 max-w-5xl sm:mt-20">
                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardContent className="p-4 text-center sm:p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="responsive-text-base mb-2 font-bold text-gray-900">
                      🚀 Instant Deploy
                    </h3>
                    <p className="responsive-text-sm text-gray-700">
                      One-click deployment from our marketplace of{' '}
                      <strong>1,000+ vetted AI agents</strong>
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardContent className="p-4 text-center sm:p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="responsive-text-base mb-2 font-bold text-gray-900">
                      📊 Real-time Insights
                    </h3>
                    <p className="responsive-text-sm text-gray-700">
                      Monitor performance and costs with <strong>live analytics</strong> and
                      optimization tips
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-4 text-center sm:p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="responsive-text-base mb-2 font-bold text-gray-900">
                      🔒 Enterprise Ready
                    </h3>
                    <p className="responsive-text-sm text-gray-700">
                      <strong>SOC 2 certified</strong> with enterprise-grade security &{' '}
                      <strong>99.99% uptime</strong>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Simplified background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/4 ml-[-15rem] h-[25rem] w-[25rem] rotate-45 rounded-full bg-gradient-to-br from-gray-50/60 to-gray-100/40 opacity-80 blur-3xl sm:ml-[-20rem] sm:h-[40rem] sm:w-[40rem]"></div>
            <div className="absolute bottom-1/4 right-1/2 mr-[-20rem] h-[20rem] w-[20rem] -rotate-12 rounded-full bg-gradient-to-tl from-gray-50/50 to-gray-100/30 opacity-60 blur-3xl sm:mr-[-25rem] sm:h-[35rem] sm:w-[35rem]"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="responsive-py border-gray border-t-4 bg-white/40 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
              <h2 className="responsive-text-2xl text-balance font-bold tracking-tight text-gray-900">
                The AI platform that pays for itself in week 1
              </h2>
              <p className="responsive-text-base mt-4 text-balance text-gray-600">
                Save 6+ months of development time and $100K+ in engineering costs
              </p>
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="grid-responsive-3 responsive-gap">
                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg sm:h-14 sm:w-14">
                      <Package className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">
                      🚀 Agent Marketplace
                    </CardTitle>
                    <CardDescription className="responsive-text-xs text-gray-600">
                      Deploy pre-built agents in seconds, not weeks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="responsive-text-sm space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>
                          <strong>1,000+</strong> vetted AI agents ready to deploy
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>
                          <strong>One-click</strong> deployment system
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <span>
                          <strong>Auto-updates</strong> with version control
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        Save 10+ dev hours per agent
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg sm:h-14 sm:w-14">
                      <BarChart3 className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">
                      📊 Real-time Insights
                    </CardTitle>
                    <CardDescription className="responsive-text-xs text-gray-600">
                      Monitor performance and optimize costs instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="responsive-text-sm space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>
                          <strong>Live tracking</strong> of all agent outputs
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span>
                          <strong>Cost analytics</strong> with optimization tips
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                        <span>
                          <strong>Performance metrics</strong> and alerts
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        Reduce costs by 40% on average
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg sm:h-14 sm:w-14">
                      <Shield className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">
                      🔒 Enterprise Security
                    </CardTitle>
                    <CardDescription className="responsive-text-xs text-gray-600">
                      Bank-level security with compliance guarantees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="responsive-text-sm space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span>
                          <strong>SOC 2 Type II</strong> certified
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span>
                          <strong>End-to-end</strong> encryption
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                        <span>
                          <strong>Role-based</strong> access control
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        99.99% uptime SLA
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg sm:h-14 sm:w-14">
                      <Zap className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">
                      ⚡ Lightning Performance
                    </CardTitle>
                    <CardDescription className="responsive-text-xs text-gray-600">
                      Global infrastructure built for speed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="responsive-text-sm space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>
                          <strong>&lt;50ms</strong> average response time
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>
                          <strong>Global CDN</strong> with edge locations
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <span>
                          <strong>Auto-scaling</strong> infrastructure
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                        5x faster than competitors
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg sm:h-14 sm:w-14">
                      <Globe className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">
                      🌍 Global Scale
                    </CardTitle>
                    <CardDescription className="responsive-text-xs text-gray-600">
                      Deploy anywhere, scale everywhere
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="responsive-text-sm space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>
                          <strong>Multi-region</strong> deployments
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span>
                          <strong>Auto-failover</strong> and redundancy
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                        <span>
                          <strong>24/7 monitoring</strong> and support
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                        Trusted by 10K+ developers
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border-2 border-gray-300 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg sm:h-14 sm:w-14">
                      <Code className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">
                      💎 Open Source
                    </CardTitle>
                    <CardDescription className="responsive-text-xs text-gray-600">
                      Built transparently with community trust
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="responsive-text-sm space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span>
                          <strong>100% open source</strong> codebase
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span>
                          <strong>Active community</strong> contributions
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                        <span>
                          <strong>No vendor lock-in</strong> ever
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                        Free forever tier
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Customer confidence section */}
              <div className="mt-12 text-center sm:mt-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">Join 10,000+ developers building the future</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-gray border-b-4 border-t-4 bg-white/30 py-12 backdrop-blur-sm sm:py-16">
          <div className="container-responsive">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="responsive-text-xl mb-2 font-bold text-gray-900">
                🚀 10,000+ developers can't be wrong
              </h2>
              <p className="responsive-text-sm text-gray-600">
                See why top companies choose GraphBit over building from scratch
              </p>
            </div>
            <div className="grid-responsive-4 responsive-gap">
              <div className="hover:shadow-modern rounded-xl border border-gray-200 bg-white p-4 text-center transition-shadow duration-200 sm:p-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">1,000+</div>
                <div className="responsive-text-xs font-medium text-gray-600">
                  Ready-to-Deploy Agents
                </div>
                <div className="mt-2 inline-block rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">
                  Growing daily
                </div>
              </div>
              <div className="hover:shadow-modern rounded-xl border border-gray-200 bg-white p-4 text-center transition-shadow duration-200 sm:p-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">50M+</div>
                <div className="responsive-text-xs font-medium text-gray-600">
                  API Calls This Month
                </div>
                <div className="mt-2 inline-block rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                  +67% growth
                </div>
              </div>
              <div className="hover:shadow-modern rounded-xl border border-gray-200 bg-white p-4 text-center transition-shadow duration-200 sm:p-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">99.99%</div>
                <div className="responsive-text-xs font-medium text-gray-600">
                  Guaranteed Uptime
                </div>
                <div className="mt-2 inline-block rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                  Enterprise SLA
                </div>
              </div>
              <div className="hover:shadow-modern rounded-xl border border-gray-200 bg-white p-4 text-center transition-shadow duration-200 sm:p-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">&lt;50ms</div>
                <div className="responsive-text-xs font-medium text-gray-600">
                  Average Response Time
                </div>
                <div className="mt-2 inline-block rounded-full bg-purple-50 px-2 py-1 text-xs text-purple-700">
                  Industry leading
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="responsive-py bg-white/20 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
              <h2 className="responsive-text-2xl text-balance font-bold tracking-tight text-gray-900">
                "We went from idea to $15K MRR in 48 hours"
              </h2>
              <p className="responsive-text-base mt-4 text-balance text-gray-600">
                Real stories from developers who 10x'd their productivity with GraphBit
              </p>
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="grid-responsive-3 responsive-gap">
                <Card className="hover:shadow-modern border border-gray-200 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                        Enterprise
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="responsive-text-sm mb-6 font-medium leading-relaxed text-gray-900">
                      &quot;GraphBit saved us <strong className="text-black">6 months</strong> of
                      development time. Our team deployed{' '}
                      <strong className="text-black">15 AI agents</strong> in the first week. The
                      ROI has been incredible.&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                        SM
                      </div>
                      <div>
                        <p className="responsive-text-sm font-semibold text-gray-900">
                          Sarah Martinez
                        </p>
                        <p className="text-xs font-medium text-gray-600">
                          CTO, TechFlow (500+ employees)
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-green-700">Verified Customer</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>
                          📈 <strong>500%</strong> faster deployment
                        </span>
                        <span>
                          💰 <strong>$120K</strong> saved annually
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border border-gray-200 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                        Startup
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="responsive-text-sm mb-6 font-medium leading-relaxed text-gray-900">
                      &quot;The real-time tracing helped us reduce costs by{' '}
                      <strong className="text-black">40%</strong> and improve performance by{' '}
                      <strong className="text-black">3x</strong>. We couldn't have scaled without
                      GraphBit.&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                        DK
                      </div>
                      <div>
                        <p className="responsive-text-sm font-semibold text-gray-900">David Kim</p>
                        <p className="text-xs font-medium text-gray-600">
                          Lead Engineer, AI Innovations
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="text-xs text-blue-700">Series A Startup</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>
                          ⚡ <strong>3x</strong> faster inference
                        </span>
                        <span>
                          💡 <strong>25</strong> agents deployed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-modern border border-gray-200 bg-white transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                        Solo Dev
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="responsive-text-sm mb-6 font-medium leading-relaxed text-gray-900">
                      &quot;From prototype to production in{' '}
                      <strong className="text-black">2 days</strong>. The marketplace had exactly
                      what I needed. Now earning <strong className="text-black">$15K/month</strong>{' '}
                      from my AI SaaS.&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                        AC
                      </div>
                      <div>
                        <p className="responsive-text-sm font-semibold text-gray-900">Alex Chen</p>
                        <p className="text-xs font-medium text-gray-600">Founder, StartupAI</p>
                        <div className="mt-1 flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          <span className="text-xs text-purple-700">Indie Hacker</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>
                          🚀 <strong>48hrs</strong> to launch
                        </span>
                        <span>
                          💵 <strong>$15K</strong> MRR achieved
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social proof metrics */}
              <div className="mt-12 rounded-2xl bg-black p-6 text-white sm:mt-16 sm:p-8">
                <div className="mb-6 text-center">
                  <h3 className="responsive-text-lg mb-2 font-bold">
                    Join the GraphBit Success Stories
                  </h3>
                  <p className="responsive-text-sm text-gray-300">
                    Real metrics from our community
                  </p>
                </div>
                <div className="grid-responsive-4 responsive-gap text-center">
                  <div>
                    <div className="responsive-text-xl font-bold text-white">98%</div>
                    <div className="text-xs text-gray-300">Customer Satisfaction</div>
                  </div>
                  <div>
                    <div className="responsive-text-xl font-bold text-white">$2.3M+</div>
                    <div className="text-xs text-gray-300">Customer Savings</div>
                  </div>
                  <div>
                    <div className="responsive-text-xl font-bold text-white">15,000+</div>
                    <div className="text-xs text-gray-300">Agents Deployed</div>
                  </div>
                  <div>
                    <div className="responsive-text-xl font-bold text-white">72hrs</div>
                    <div className="text-xs text-gray-300">Avg. Time to ROI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="responsive-py border-gray border-t-4 bg-white/40 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
              <h2 className="responsive-text-2xl text-balance font-bold tracking-tight text-gray-900">
                💰 Start earning before you start paying
              </h2>
              <p className="responsive-text-base mt-4 text-balance text-gray-600">
                Free forever tier • No credit card required • ROI typically achieved in 72 hours
              </p>
            </div>

            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Free Plan */}
                <Card className="hover:shadow-modern border border-gray-200 bg-white transition-shadow duration-200">
                  <CardHeader>
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        🚀 Perfect Start
                      </div>
                    </div>
                    <CardTitle className="responsive-text-base">Starter</CardTitle>
                    <CardDescription>For individuals and small projects</CardDescription>
                    <div className="mt-4">
                      <span className="responsive-text-2xl font-bold text-gray-900">$0</span>
                      <span className="responsive-text-xs text-gray-600">/month forever</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>
                          <strong>3 AI agents</strong> - perfect for testing
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>
                          <strong>1K API calls/month</strong> - generous free tier
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>
                          <strong>Basic tracing</strong> - essential insights
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>
                          <strong>Community support</strong> - active Discord
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                        ✨ No credit card required • Upgrade anytime
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="touch-target w-full bg-black text-white hover:bg-gray-800">
                      Start Building Free
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="shadow-modern relative scale-105 border-2 border-black bg-white">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white">
                      ⭐ Most Popular
                    </span>
                  </div>
                  <CardHeader className="pt-8">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        🚀 Best Value
                      </div>
                    </div>
                    <CardTitle className="responsive-text-base">Professional</CardTitle>
                    <CardDescription>For growing teams and businesses</CardDescription>
                    <div className="mt-4">
                      <span className="responsive-text-2xl font-bold text-gray-900">$29</span>
                      <span className="responsive-text-xs text-gray-600">/month per user</span>
                      <div className="mt-1 text-xs text-green-600">Save $348/year vs monthly</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-black" />
                        <span>
                          <strong>Unlimited agents</strong> - scale without limits
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-black" />
                        <span>
                          <strong>100K API calls/month</strong> - high volume ready
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-black" />
                        <span>
                          <strong>Advanced analytics</strong> - deep insights
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-black" />
                        <span>
                          <strong>Priority support</strong> - 4hr response time
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-black" />
                        <span>
                          <strong>Custom integrations</strong> - API access
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                        🎯 14-day free trial • Cancel anytime • 97% customer retention
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="touch-target w-full bg-black font-bold text-white hover:bg-gray-800">
                      Start Free Trial
                    </Button>
                  </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card className="hover:shadow-modern border border-gray-200 bg-white transition-shadow duration-200">
                  <CardHeader>
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                        🏢 Enterprise Ready
                      </div>
                    </div>
                    <CardTitle className="responsive-text-base">Enterprise</CardTitle>
                    <CardDescription>For large organizations and teams</CardDescription>
                    <div className="mt-4">
                      <span className="responsive-text-2xl font-bold text-gray-900">Custom</span>
                      <div className="mt-1 text-xs text-purple-600">Volume discounts available</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-600" />
                        <span>
                          <strong>Everything in Professional</strong> +
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-600" />
                        <span>
                          <strong>Unlimited API calls</strong> - no usage limits
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-600" />
                        <span>
                          <strong>On-premise deployment</strong> - your infrastructure
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-600" />
                        <span>
                          <strong>24/7 dedicated support</strong> - phone & Slack
                        </span>
                      </li>
                      <li className="responsive-text-sm flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-600" />
                        <span>
                          <strong>Custom SLA</strong> - up to 99.99% uptime
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="rounded-lg bg-purple-50 px-3 py-2 text-xs text-purple-700">
                        🤝 SOC2 compliant • GDPR ready • Custom contracts
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="touch-target w-full bg-black text-white hover:bg-gray-800">
                      Contact Sales
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="responsive-py border-gray border-t-4 bg-white/30 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="border-1 shadow-modern relative rounded-2xl border-black bg-white p-8 text-center sm:p-12 lg:p-16">
              <div className="mt-4">
                <h2 className="responsive-text-2xl text-balance font-bold tracking-tight text-gray-900">
                  ⚡ Join the AI gold rush (while spots are still available)
                </h2>
                <p className="responsive-text-base mx-auto mt-4 max-w-3xl text-balance text-gray-600 sm:mt-6">
                  <strong>10,000+ developers</strong> are already building profitable AI businesses
                  with GraphBit. Start your journey today -{' '}
                  <strong>completely free, no credit card required</strong>.
                </p>
              </div>

              {/* Value props */}
              <div className="responsive-gap responsive-text-sm mt-6 flex flex-wrap items-center justify-center text-gray-700 sm:mt-8">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>
                    <strong>Free forever</strong> tier
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>
                    <strong>Deploy in 2 minutes</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>
                    <strong>1,000+</strong> ready agents
                  </span>
                </div>
              </div>

              <div className="responsive-gap mt-8 flex flex-wrap items-center justify-center sm:mt-10">
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    className="shadow-modern hover:shadow-enhanced touch-target h-14 bg-black px-8 text-lg font-bold text-white transition-all duration-200 hover:bg-gray-800 sm:h-16 sm:px-10"
                  >
                    <span className="flex items-center">
                      <Zap className="mr-3 h-5 w-5" />
                      Start Building Now
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </span>
                  </Button>
                </Link>
                <Link href="https://github.com/graphbit" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="touch-target h-14 border-2 border-gray-300 px-8 text-lg font-bold text-black transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 sm:h-16 sm:px-10"
                  >
                    <span className="flex items-center">
                      <Code className="mr-3 h-5 w-5" />
                      View Source Code
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-8 border-t-2 border-gray-100 pt-6 sm:mt-10">
                <div className="responsive-gap responsive-text-xs flex flex-wrap items-center justify-center text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span>98% Customer Satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>10,000+ Active Developers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>Average Setup: 2 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

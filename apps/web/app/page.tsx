import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navigation />
      
      {/* Enhanced background with gradient layers */}
      <div className="fixed inset-0 animated-gradient-bg -z-10"></div>
      
      {/* Enhanced floating bubble system with multiple layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
        {/* Main floating bubbles with variety */}
        <div className="bubble bubble-1" style={{ 
          left: '10%', 
          animationDelay: '0s',
          animationDuration: '15s'
        }}></div>
        <div className="bubble bubble-2" style={{ 
          left: '25%', 
          animationDelay: '3s',
          animationDuration: '18s'
        }}></div>
        <div className="bubble bubble-3" style={{ 
          left: '45%', 
          animationDelay: '7s',
          animationDuration: '12s'
        }}></div>
        <div className="bubble bubble-4" style={{ 
          left: '65%', 
          animationDelay: '2s',
          animationDuration: '20s'
        }}></div>
        <div className="bubble bubble-5" style={{ 
          left: '80%', 
          animationDelay: '9s',
          animationDuration: '16s'
        }}></div>
        <div className="bubble bubble-6" style={{ 
          left: '15%', 
          animationDelay: '5s',
          animationDuration: '14s'
        }}></div>
        <div className="bubble bubble-7" style={{ 
          left: '90%', 
          animationDelay: '11s',
          animationDuration: '22s'
        }}></div>
        
        {/* Smaller accent bubbles for subtle movement */}
        <div className="micro-bubble" style={{ 
          left: '5%', 
          animationDelay: '1s',
          animationDuration: '25s'
        }}></div>
        <div className="micro-bubble" style={{ 
          left: '35%', 
          animationDelay: '8s',
          animationDuration: '19s'
        }}></div>
        <div className="micro-bubble" style={{ 
          left: '55%', 
          animationDelay: '13s',
          animationDuration: '17s'
        }}></div>
        <div className="micro-bubble" style={{ 
          left: '75%', 
          animationDelay: '4s',
          animationDuration: '21s'
        }}></div>
        <div className="micro-bubble" style={{ 
          left: '95%', 
          animationDelay: '15s',
          animationDuration: '23s'
        }}></div>
      </div>
      
      {/* Enhanced gradient orbs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>
      
      <main className="min-h-screen relative">
        {/* Enhanced Hero Section with proper top spacing */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
          <div className="container-responsive relative z-10">
            <div className="mx-auto max-w-6xl text-center">
              {/* Enhanced badge with black theme */}
              <div className="mb-6 sm:mb-8 animate-fade-in-up">
                <span className="inline-flex items-center rounded-full bg-white border-2 border-gray-200 responsive-px py-2 sm:py-3 responsive-text-sm font-bold text-gray-900 shadow-modern hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 touch-target-sm">
                  <Sparkles className="mr-2 h-3.5 w-3.5 animate-pulse" />
                  <span className="relative">
                    🚀 <span className="hidden xs:inline">Introducing </span> LLM Tracing & Agent Marketplace
                  </span>
                </span>
              </div>
              
              {/* Main heading with enhanced responsive styling */}
              <div className="animate-fade-in-up animation-delay-200">
                <h1 className="responsive-text-3xl font-bold tracking-tight text-balance hero-title">
                  <span className="block hero-title-main">Ship production-ready AI agents in</span>
                  <span className="gradient-text-enhanced relative inline-block mt-2 lg:mt-0">
                    2 minutes
                    <div className="absolute -inset-2 bg-gradient-to-r from-gray-100/40 via-gray-200/20 to-gray-100/40 rounded-xl blur-xl opacity-60"></div>
                  </span>
                  <span className="block responsive-text-base mt-3 sm:mt-4 text-gray-600">
                    Turn your AI ideas into revenue-generating products today
                  </span>
                </h1>
              </div>
              
              {/* Enhanced description with key value props */}
              <div className="animate-fade-in-up animation-delay-400">
                <p className="mt-6 sm:mt-8 responsive-text-sm leading-relaxed text-gray-600 max-w-4xl mx-auto text-balance relative responsive-px lg:px-0">
                  <span className="relative z-10">
                    The most intuitive platform for deploying, monitoring, and scaling AI agents. 
                    Access our curated marketplace with <strong>1,000+ pre-built agents</strong>, get 
                    <strong>real-time tracing insights</strong>, and deploy with <strong>enterprise-grade security</strong> 
                    — all backed by our <strong>99.99% uptime SLA</strong>.
                  </span>
                </p>
                
                {/* New value proposition highlights */}
                <div className="mt-4 sm:mt-6 flex items-center justify-center responsive-gap flex-wrap responsive-text-xs text-gray-500">
                  <div className="flex items-center gap-2 group touch-target-sm">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <span className="group-hover:text-gray-700 transition-colors">SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center gap-2 group touch-target-sm">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <span className="group-hover:text-gray-700 transition-colors">10K+ Active Developers</span>
                  </div>
                  <div className="flex items-center gap-2 group touch-target-sm">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <span className="group-hover:text-gray-700 transition-colors">Deploy in &lt;2 minutes</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA buttons with black theme */}
              <div className="mt-8 sm:mt-12 flex items-center justify-center responsive-gap flex-wrap animate-fade-in-up animation-delay-600">
                <Link href="/marketplace">
                  <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 responsive-text-base shadow-modern hover:shadow-enhanced transition-all duration-200 bg-black hover:bg-gray-800 text-white font-bold group touch-target">
                    <span className="flex items-center">
                      <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden xs:inline">Start Building </span>Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </Link>
                <Link href="/tracing">
                  <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 responsive-text-base border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-black font-bold transition-all duration-200 group touch-target">
                    <span className="flex items-center">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">Watch </span>Demo
                    </span>
                  </Button>
                </Link>
              </div>
              
              {/* Enhanced feature indicators with black theme */}
              <div className="mt-12 sm:mt-16 flex items-center justify-center responsive-gap responsive-text-xs text-gray-700 flex-wrap animate-fade-in-up animation-delay-800">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 touch-target-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Free tier available</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 touch-target-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-300"></div>
                  <span className="font-medium">100% open source</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 touch-target-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-600"></div>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 touch-target-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-900"></div>
                  <span className="font-medium">API-first platform</span>
                </div>
              </div>

              {/* Hero stats cards with black theme */}
              <div className="mt-20 sm:mt-24 relative max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 animate-fade-in-up animation-delay-1000">
                  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-subtle hover:shadow-modern transition-shadow duration-200">
                    <div className="responsive-text-base font-bold text-gray-900 flex items-center gap-1">
                      99.99%
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                    </div>
                    <div className="text-xs text-gray-600 font-medium">Uptime SLA</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-subtle hover:shadow-modern transition-shadow duration-200">
                    <div className="responsive-text-base font-bold text-gray-900 flex items-center gap-1">
                      &lt;50ms
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                    </div>
                    <div className="text-xs text-gray-600 font-medium">Response Time</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-subtle hover:shadow-modern transition-shadow duration-200">
                    <div className="responsive-text-base font-bold text-gray-900 flex items-center gap-1">
                      1,000+
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                    </div>
                    <div className="text-xs text-gray-600 font-medium">AI Agents</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-subtle hover:shadow-modern transition-shadow duration-200">
                    <div className="responsive-text-base font-bold text-gray-900 flex items-center gap-1">
                      50M+
                      <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                    </div>
                    <div className="text-xs text-gray-600 font-medium">API Calls</div>
                  </div>
                </div>
              </div>

              {/* Trust indicators with black theme */}
              <div className="mt-20 sm:mt-24 animate-fade-in-up animation-delay-1000">
                <p className="responsive-text-sm text-gray-700 font-bold mb-4 sm:mb-6">🏢 Trusted by industry leaders</p>
                <div className="flex items-center justify-center responsive-gap flex-wrap">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 responsive-text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-default">TechCorp</div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 responsive-text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-default hidden xs:block">AI Innovations</div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 responsive-text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-default">StartupLab</div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 responsive-text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-default hidden sm:block">DataFlow</div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 responsive-text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-default hidden md:block">CloudTech</div>
                </div>
              </div>

              {/* Quick feature preview cards with black theme */}
              <div className="mt-16 sm:mt-20 grid-responsive-3 responsive-gap max-w-5xl mx-auto animate-fade-in-up animation-delay-1200">
                <Card className="bg-white border-2 border-gray-300 hover:shadow-modern transition-shadow duration-200">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 responsive-text-base">🚀 Instant Deploy</h3>
                    <p className="responsive-text-sm text-gray-700">One-click deployment from our marketplace of <strong>1,000+ vetted AI agents</strong></p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-2 border-gray-300 hover:shadow-modern transition-shadow duration-200">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 responsive-text-base">📊 Real-time Insights</h3>
                    <p className="responsive-text-sm text-gray-700">Monitor performance and costs with <strong>live analytics</strong> and optimization tips</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-2 border-gray-300 hover:shadow-modern transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 responsive-text-base">🔒 Enterprise Ready</h3>
                    <p className="responsive-text-sm text-gray-700"><strong>SOC 2 certified</strong> with enterprise-grade security & <strong>99.99% uptime</strong></p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Simplified background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/4 ml-[-15rem] sm:ml-[-20rem] h-[25rem] w-[25rem] sm:h-[40rem] sm:w-[40rem] bg-gradient-to-br from-gray-50/60 to-gray-100/40 opacity-80 rotate-45 rounded-full blur-3xl"></div>
            <div className="absolute right-1/2 bottom-1/4 mr-[-20rem] sm:mr-[-25rem] h-[20rem] w-[20rem] sm:h-[35rem] sm:w-[35rem] bg-gradient-to-tl from-gray-50/50 to-gray-100/30 opacity-60 -rotate-12 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="responsive-py border-t-4 border-gray bg-white/40 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
              <h2 className="responsive-text-2xl font-bold tracking-tight text-gray-900 text-balance">
                The AI platform that pays for itself in week 1
              </h2>
              <p className="mt-4 responsive-text-base text-gray-600 text-balance">
                Save 6+ months of development time and $100K+ in engineering costs
              </p>
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="grid-responsive-3 responsive-gap">
                <Card className="border-2 border-gray-300 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">🚀 Agent Marketplace</CardTitle>
                    <CardDescription className="text-gray-600 responsive-text-xs">
                      Deploy pre-built agents in seconds, not weeks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 responsive-text-sm text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span><strong>1,000+</strong> vetted AI agents ready to deploy</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span><strong>One-click</strong> deployment system</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span><strong>Auto-updates</strong> with version control</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium">
                        Save 10+ dev hours per agent
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-300 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">📊 Real-time Insights</CardTitle>
                    <CardDescription className="text-gray-600 responsive-text-xs">
                      Monitor performance and optimize costs instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 responsive-text-sm text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span><strong>Live tracking</strong> of all agent outputs</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span><strong>Cost analytics</strong> with optimization tips</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span><strong>Performance metrics</strong> and alerts</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-full font-medium">
                        Reduce costs by 40% on average
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-300 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">🔒 Enterprise Security</CardTitle>
                    <CardDescription className="text-gray-600 responsive-text-xs">
                      Bank-level security with compliance guarantees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 responsive-text-sm text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span><strong>SOC 2 Type II</strong> certified</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span><strong>End-to-end</strong> encryption</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span><strong>Role-based</strong> access control</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full font-medium">
                        99.99% uptime SLA
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-300 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">⚡ Lightning Performance</CardTitle>
                    <CardDescription className="text-gray-600 responsive-text-xs">
                      Global infrastructure built for speed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 responsive-text-sm text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span><strong>&lt;50ms</strong> average response time</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span><strong>Global CDN</strong> with edge locations</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span><strong>Auto-scaling</strong> infrastructure</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded-full font-medium">
                        5x faster than competitors
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-300 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">🌍 Global Scale</CardTitle>
                    <CardDescription className="text-gray-600 responsive-text-xs">
                      Deploy anywhere, scale everywhere
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 responsive-text-sm text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span><strong>Multi-region</strong> deployments</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span><strong>Auto-failover</strong> and redundancy</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span><strong>24/7 monitoring</strong> and support</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full font-medium">
                        Trusted by 10K+ developers
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-300 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="responsive-text-base text-gray-900">💎 Open Source</CardTitle>
                    <CardDescription className="text-gray-600 responsive-text-xs">
                      Built transparently with community trust
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 responsive-text-sm text-gray-700">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span><strong>100% open source</strong> codebase</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span><strong>Active community</strong> contributions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span><strong>No vendor lock-in</strong> ever</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded-full font-medium">
                        Free forever tier
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Customer confidence section */}
              <div className="mt-12 sm:mt-16 text-center">
                <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">Join 10,000+ developers building the future</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 border-b-4 border-t-4 border-gray bg-white/30 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="responsive-text-xl font-bold text-gray-900 mb-2">
                🚀 10,000+ developers can't be wrong
              </h2>
              <p className="responsive-text-sm text-gray-600">
                See why top companies choose GraphBit over building from scratch
              </p>
            </div>
            <div className="grid-responsive-4 responsive-gap">
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:shadow-modern transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">1,000+</div>
                <div className="responsive-text-xs text-gray-600 font-medium">Ready-to-Deploy Agents</div>
                <div className="mt-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full inline-block">
                  Growing daily
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:shadow-modern transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">50M+</div>
                <div className="responsive-text-xs text-gray-600 font-medium">API Calls This Month</div>
                <div className="mt-2 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block">
                  +67% growth
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:shadow-modern transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">99.99%</div>
                <div className="responsive-text-xs text-gray-600 font-medium">Guaranteed Uptime</div>
                <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full inline-block">
                  Enterprise SLA
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:shadow-modern transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="responsive-text-2xl font-bold text-gray-900">&lt;50ms</div>
                <div className="responsive-text-xs text-gray-600 font-medium">Average Response Time</div>
                <div className="mt-2 text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded-full inline-block">
                  Industry leading
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="responsive-py bg-white/20 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
              <h2 className="responsive-text-2xl font-bold tracking-tight text-gray-900 text-balance">
                "We went from idea to $15K MRR in 48 hours"
              </h2>
              <p className="mt-4 responsive-text-base text-gray-600 text-balance">
                Real stories from developers who 10x'd their productivity with GraphBit
              </p>
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="grid-responsive-3 responsive-gap">
                <Card className="border border-gray-200 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                        Enterprise
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-900 mb-6 responsive-text-sm leading-relaxed font-medium">
                      &quot;GraphBit saved us <strong className="text-black">6 months</strong> of development time. Our team deployed <strong className="text-black">15 AI agents</strong> in the first week. The ROI has been incredible.&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        SM
                      </div>
                      <div>
                        <p className="font-semibold responsive-text-sm text-gray-900">Sarah Martinez</p>
                        <p className="text-xs text-gray-600 font-medium">CTO, TechFlow (500+ employees)</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-700">Verified Customer</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>📈 <strong>500%</strong> faster deployment</span>
                        <span>💰 <strong>$120K</strong> saved annually</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                        Startup
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-900 mb-6 responsive-text-sm leading-relaxed font-medium">
                      &quot;The real-time tracing helped us reduce costs by <strong className="text-black">40%</strong> and improve performance by <strong className="text-black">3x</strong>. We couldn't have scaled without GraphBit.&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        DK
                      </div>
                      <div>
                        <p className="font-semibold responsive-text-sm text-gray-900">David Kim</p>
                        <p className="text-xs text-gray-600 font-medium">Lead Engineer, AI Innovations</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-blue-700">Series A Startup</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>⚡ <strong>3x</strong> faster inference</span>
                        <span>💡 <strong>25</strong> agents deployed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                        Solo Dev
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-900 mb-6 responsive-text-sm leading-relaxed font-medium">
                      &quot;From prototype to production in <strong className="text-black">2 days</strong>. The marketplace had exactly what I needed. Now earning <strong className="text-black">$15K/month</strong> from my AI SaaS.&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        AC
                      </div>
                      <div>
                        <p className="font-semibold responsive-text-sm text-gray-900">Alex Chen</p>
                        <p className="text-xs text-gray-600 font-medium">Founder, StartupAI</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-xs text-purple-700">Indie Hacker</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>🚀 <strong>48hrs</strong> to launch</span>
                        <span>💵 <strong>$15K</strong> MRR achieved</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Social proof metrics */}
              <div className="mt-12 sm:mt-16 bg-black rounded-2xl p-6 sm:p-8 text-white">
                <div className="text-center mb-6">
                  <h3 className="responsive-text-lg font-bold mb-2">Join the GraphBit Success Stories</h3>
                  <p className="text-gray-300 responsive-text-sm">Real metrics from our community</p>
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
        <section className="responsive-py border-t-4 border-gray bg-white/40 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
              <h2 className="responsive-text-2xl font-bold tracking-tight text-gray-900 text-balance">
                💰 Start earning before you start paying
              </h2>
              <p className="mt-4 responsive-text-base text-gray-600 text-balance">
                Free forever tier • No credit card required • ROI typically achieved in 72 hours
              </p>
            </div>

            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Free Plan */}
                <Card className="border border-gray-200 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        🚀 Perfect Start
                      </div>
                    </div>
                    <CardTitle className="responsive-text-base">Starter</CardTitle>
                    <CardDescription>For individuals and small projects</CardDescription>
                    <div className="mt-4">
                      <span className="responsive-text-2xl font-bold text-gray-900">$0</span>
                      <span className="text-gray-600 responsive-text-xs">/month forever</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span><strong>3 AI agents</strong> - perfect for testing</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span><strong>1K API calls/month</strong> - generous free tier</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span><strong>Basic tracing</strong> - essential insights</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span><strong>Community support</strong> - active Discord</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                        ✨ No credit card required • Upgrade anytime
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full touch-target bg-black hover:bg-gray-800 text-white">
                      Start Building Free
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="relative border-2 border-black bg-white shadow-modern scale-105">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                      ⭐ Most Popular
                    </span>
                  </div>
                  <CardHeader className="pt-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        🚀 Best Value
                      </div>
                    </div>
                    <CardTitle className="responsive-text-base">Professional</CardTitle>
                    <CardDescription>For growing teams and businesses</CardDescription>
                    <div className="mt-4">
                      <span className="responsive-text-2xl font-bold text-gray-900">$29</span>
                      <span className="text-gray-600 responsive-text-xs">/month per user</span>
                      <div className="text-xs text-green-600 mt-1">Save $348/year vs monthly</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                        <span><strong>Unlimited agents</strong> - scale without limits</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                        <span><strong>100K API calls/month</strong> - high volume ready</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                        <span><strong>Advanced analytics</strong> - deep insights</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                        <span><strong>Priority support</strong> - 4hr response time</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                        <span><strong>Custom integrations</strong> - API access</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                        🎯 14-day free trial • Cancel anytime • 97% customer retention
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full touch-target bg-black hover:bg-gray-800 text-white font-bold">
                      Start Free Trial
                    </Button>
                  </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card className="border border-gray-200 bg-white hover:shadow-modern transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                        🏢 Enterprise Ready
                      </div>
                    </div>
                    <CardTitle className="responsive-text-base">Enterprise</CardTitle>
                    <CardDescription>For large organizations and teams</CardDescription>
                    <div className="mt-4">
                      <span className="responsive-text-2xl font-bold text-gray-900">Custom</span>
                      <div className="text-xs text-purple-600 mt-1">Volume discounts available</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span><strong>Everything in Professional</strong> +</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span><strong>Unlimited API calls</strong> - no usage limits</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span><strong>On-premise deployment</strong> - your infrastructure</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span><strong>24/7 dedicated support</strong> - phone & Slack</span>
                      </li>
                      <li className="flex items-center gap-3 responsive-text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span><strong>Custom SLA</strong> - up to 99.99% uptime</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs text-purple-700 bg-purple-50 px-3 py-2 rounded-lg">
                        🤝 SOC2 compliant • GDPR ready • Custom contracts
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full touch-target bg-black hover:bg-gray-800 text-white">
                      Contact Sales
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="responsive-py border-t-4 border-gray bg-white/30 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="relative bg-white border-1 border-black rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-modern">
              
              <div className="mt-4">
                <h2 className="responsive-text-2xl font-bold tracking-tight text-gray-900 text-balance">
                  ⚡ Join the AI gold rush (while spots are still available)
                </h2>
                <p className="mt-4 sm:mt-6 responsive-text-base text-gray-600 max-w-3xl mx-auto text-balance">
                  <strong>10,000+ developers</strong> are already building profitable AI businesses with GraphBit. 
                  Start your journey today - <strong>completely free, no credit card required</strong>.
                </p>
              </div>
              
              {/* Value props */}
              <div className="mt-6 sm:mt-8 flex items-center justify-center responsive-gap flex-wrap responsive-text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span><strong>Free forever</strong> tier</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span><strong>Deploy in 2 minutes</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span><strong>1,000+</strong> ready agents</span>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-10 flex items-center justify-center responsive-gap flex-wrap">
                <Link href="/marketplace">
                  <Button size="lg" className="h-14 sm:h-16 px-8 sm:px-10 bg-black hover:bg-gray-800 text-white font-bold text-lg shadow-modern hover:shadow-enhanced transition-all duration-200 touch-target">
                    <span className="flex items-center">
                      <Zap className="mr-3 h-5 w-5" />
                      Start Building Now
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </span>
                  </Button>
                </Link>
                <Link href="https://github.com/graphbit" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="h-14 sm:h-16 px-8 sm:px-10 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-black font-bold text-lg transition-all duration-200 touch-target">
                    <span className="flex items-center">
                      <Code className="mr-3 h-5 w-5" />
                      View Source Code
                    </span>
                  </Button>
                </Link>
              </div>
              
              {/* Trust signals */}
              <div className="mt-8 sm:mt-10 pt-6 border-t-2 border-gray-100">
                <div className="flex items-center justify-center responsive-gap flex-wrap responsive-text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
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

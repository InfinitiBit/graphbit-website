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
  PlayCircle,
  Rocket,
  Brain,
  Target,
  Database,
  Cpu,
  GitBranch,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Enhanced background with modern gradient layers */}
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative min-h-screen pt-16 sm:pt-20">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
          {/* Advanced Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>

          <div className="container-responsive relative z-10">
            <div className="mx-auto max-w-6xl text-center">
              {/* Enhanced badge with modern styling */}
              <div className="animate-fade-in-up mb-12">
                <span className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/80 to-gray-50/80 px-8 py-4 text-sm font-semibold text-gray-900 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:shadow-3xl hover:scale-105">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
                    <Sparkles className="h-4 w-4 text-white animate-pulse" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-50 animate-ping"></div>
                  </div>
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    🚀 Introducing AI Agent Marketplace & LLM Tracing
                  </span>
                  <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                </span>
              </div>

              {/* Enhanced hero title with advanced styling */}
              <h1 className="animate-fade-in-up animation-delay-200 hero-title mx-auto mb-8 max-w-5xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
                <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
                  Build AI Agents
                </span>
                <span className="mt-3 block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-pulse">
                  That Actually Work
                </span>
              </h1>

              {/* Enhanced description with better styling */}
              <p className="animate-fade-in-up animation-delay-400 mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 sm:text-2xl lg:text-2xl font-light">
                Download <span className="font-semibold text-gray-800">production-ready AI agents</span>, track every LLM interaction, 
                and scale your AI applications with <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">confidence</span>.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link href="/marketplace">
                  <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-0">
                    <span className="relative z-10 flex items-center gap-3">
                      <Rocket className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      Explore Marketplace
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </Link>
                <Link href="/tracing">
                  <Button variant="outline" className="group px-10 py-4 text-lg font-semibold rounded-2xl border-2 border-gray-300 hover:border-gray-400 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300">
                    <span className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900">
                      <Activity className="h-5 w-5 transition-transform group-hover:scale-110" />
                      Start Tracing
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Enhanced trust indicators */}
              <div className="animate-fade-in-up animation-delay-800 flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>500+ Ready Agents</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>10k+ Developers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>99.9% Uptime</span>
                </div>
              </div>

              {/* Enhanced CTA buttons */}
              <div className="animate-fade-in-up animation-delay-600 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Rocket className="h-5 w-5" />
                      Explore Marketplace
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Button>
                </Link>

                <Link href="/tracing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group rounded-full border-2 border-gray-200/50 bg-white/70 px-8 py-4 text-lg font-semibold text-gray-900 backdrop-blur-sm transition-all duration-300 hover:border-gray-300/50 hover:bg-white/80 hover:shadow-lg"
                  >
                    <PlayCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="animate-fade-in-up animation-delay-800 mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>1M+ API Calls Tracked</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>500+ AI Agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modern floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="bubble-1 absolute top-20 left-10 animate-float"></div>
            <div className="bubble-2 absolute top-40 right-20 animate-float animation-delay-200"></div>
            <div className="bubble-3 absolute bottom-20 left-20 animate-float animation-delay-400"></div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/30 to-white">
          <div className="container-responsive">
            <div className="mx-auto max-w-4xl text-center mb-20">
              <div className="animate-fade-in-up mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 text-sm font-semibold text-blue-800">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Complete AI Toolkit
                </span>
              </div>
              <h2 className="animate-fade-in-up animation-delay-200 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
                Everything you need to build
                <span className="block mt-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  intelligent AI systems
                </span>
              </h2>
              <p className="animate-fade-in-up animation-delay-400 mt-8 text-xl leading-relaxed text-gray-600 font-light">
                From development to production, GraphBit provides the complete toolkit for AI agent management with enterprise-grade reliability.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Enhanced Feature Cards */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-blue-50/30 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <CardHeader className="relative pb-6 pt-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    AI Agent Marketplace
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                    Browse, download, and deploy production-ready AI agents. From chatbots to data processors, 
                    find the perfect agent for your use case.
                  </CardDescription>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 text-sm font-semibold text-blue-800">500+ Agents</span>
                    <span className="rounded-full bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 text-sm font-semibold text-green-800">Ready to Deploy</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                    <span>Explore Marketplace</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-purple-50/30 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                <CardHeader className="relative pb-6 pt-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                    LLM Tracing & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                    Monitor every LLM interaction in real-time. Track performance, costs, and quality 
                    with comprehensive analytics and debugging tools.
                  </CardDescription>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="rounded-full bg-gradient-to-r from-purple-100 to-purple-200 px-4 py-2 text-sm font-semibold text-purple-800">Real-time</span>
                    <span className="rounded-full bg-gradient-to-r from-pink-100 to-pink-200 px-4 py-2 text-sm font-semibold text-pink-800">Analytics</span>
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300">
                    <span>Start Tracing</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-green-50/30 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-teal-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-teal-500"></div>
                <CardHeader className="relative pb-6 pt-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-teal-600 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                    Enterprise SDK
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                    Integrate seamlessly with our robust SDK. Support for Python, JavaScript, and REST APIs 
                    with enterprise-grade security and scalability.
                  </CardDescription>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="rounded-full bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 text-sm font-semibold text-green-800">Multi-language</span>
                    <span className="rounded-full bg-gradient-to-r from-teal-100 to-teal-200 px-4 py-2 text-sm font-semibold text-teal-800">Secure</span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300">
                    <span>View Documentation</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="relative pb-4">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">LLM Tracing & Analytics</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-gray-600">
                    Monitor every API call, track performance metrics, and optimize your AI models 
                    with comprehensive observability tools.
                  </CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">Real-time</span>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">Analytics</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="relative pb-4">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Enterprise Security</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-gray-600">
                    SOC 2 compliant infrastructure, end-to-end encryption, and role-based access controls 
                    for enterprise-grade security.
                  </CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">SOC 2</span>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">Encrypted</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Modern Stats Section */}
        <section className="relative py-16 sm:py-20">
          <div className="container-responsive">
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 backdrop-blur-sm p-8 shadow-2xl lg:p-12">
              <div className="mx-auto max-w-2xl text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Trusted by developers worldwide
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Join thousands of developers building the future of AI
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Active Developers</div>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">API Calls Tracked</div>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">AI Agents</div>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime SLA</div>
                </div>
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
                      <Rocket className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Button>
                  </Link>

                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white/20 bg-transparent px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                    >
                      <PlayCircle className="mr-2 h-5 w-5" />
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
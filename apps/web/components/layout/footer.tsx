'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUp,
  Sparkles,
  Code,
  Users,
  BarChart3 as BookOpen,
  MessageCircle
} from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-gray-200/50 bg-white/70 backdrop-blur-sm">
      <div className="container-responsive py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="group mb-6 flex items-center space-x-3">
              <div className="relative">
                <div className="rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2.5 shadow-lg transition-transform duration-200 group-hover:scale-105">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur transition-opacity duration-200 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-2xl font-bold text-transparent">
                  GraphBit
                </span>
                <span className="text-sm text-gray-500 font-medium -mt-1">AI Platform</span>
              </div>
            </Link>

            <p className="mb-6 max-w-sm text-gray-600 leading-relaxed">
              The complete platform for building, deploying, and monitoring AI agents. 
              Trusted by developers worldwide.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              <Link
                href="https://github.com/graphbit-org/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/50 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:border-gray-300/50 hover:bg-white/80 hover:shadow-md"
              >
                <Github className="h-4 w-4 text-gray-600 transition-colors group-hover:text-gray-900" />
              </Link>
              <Link
                href="https://twitter.com/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/50 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:border-gray-300/50 hover:bg-white/80 hover:shadow-md"
              >
                <Twitter className="h-4 w-4 text-gray-600 transition-colors group-hover:text-gray-900" />
              </Link>
              <Link
                href="https://linkedin.com/company/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/50 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:border-gray-300/50 hover:bg-white/80 hover:shadow-md"
              >
                <Linkedin className="h-4 w-4 text-gray-600 transition-colors group-hover:text-gray-900" />
              </Link>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/marketplace"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Agent Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/tracing"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  LLM Tracing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-600 transition-colors hover:text-gray-900"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 border-t border-gray-200/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="text-center lg:text-left">
              <h3 className="font-semibold text-gray-900 flex items-center justify-center lg:justify-start gap-2">
                <Mail className="h-4 w-4" />
                Stay updated
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Get the latest AI insights and product updates
              </p>
            </div>

            <div className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-gray-200/50 bg-white/60 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:border-gray-300/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-200/50"
              />
              <Button 
                size="sm" 
                className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-6 font-medium"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200/50 pt-8 lg:flex-row">
          <div className="flex flex-col items-center gap-4 text-sm text-gray-600 lg:flex-row lg:gap-6">
            <p>&copy; 2024 GraphBit. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-gray-900">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Scroll to top button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group mt-4 rounded-full border border-gray-200/50 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:border-gray-300/50 hover:bg-white/80 hover:shadow-md lg:mt-0"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
'use client';

import { Button } from '@/components/ui/button';
import { BarChart3 as BookOpen, Code, Users, X } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/30 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      <div className="container-responsive py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="group mb-6 flex items-center space-x-3">
              <div className="relative">
                <div className="rounded-lg bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-2.5 shadow-lg transition-transform duration-200 group-hover:scale-105">
                  <X className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur transition-opacity duration-200 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent dark:from-slate-200 dark:via-blue-300 dark:to-indigo-200">
                  GraphBit
                </span>
                <span className="-mt-1 text-sm font-medium text-muted-foreground">AI Platform</span>
              </div>
            </Link>

            <p className="mb-6 max-w-sm leading-relaxed text-muted-foreground">
              The complete platform for building, deploying, and monitoring AI agents. Trusted by
              developers worldwide.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              <Link
                href="https://github.com/graphbit-org/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:border-slate-600 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
              <Link
                href="https://twitter.com/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:border-slate-600 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
              <Link
                href="https://linkedin.com/company/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:border-slate-600 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Code className="h-4 w-4" />
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/marketplace"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Agent Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/tracing"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  LLM Tracing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <BookOpen className="h-4 w-4" />
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Users className="h-4 w-4" />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
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
              <h3 className="flex items-center justify-center gap-2 font-semibold text-gray-900 lg:justify-start">
                <X className="h-4 w-4" />
                Stay updated
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Get the latest AI insights and product updates
              </p>
            </div>

            <div className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                defaultValue=""
                suppressHydrationWarning={true}
                className="flex-1 rounded-full border border-gray-200/50 bg-white/60 px-4 py-2 text-sm text-gray-800 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-800 focus:border-gray-300/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-200/50"
              />
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-blue-500 to-blue-800 px-6 font-medium text-white"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200/50 pt-8 lg:flex-row">
          <div className="flex flex-col items-center gap-4 text-sm text-gray-600 lg:flex-row lg:gap-6">
            <p>&copy; 2025 GraphBit. All rights reserved.</p>
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
            <X className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}

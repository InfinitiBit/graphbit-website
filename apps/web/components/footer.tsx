'use client';

import { Button } from '@/components/ui/button';
import { BarChart3 as BookOpen, Code, Users, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative">
      <div className="container mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12 lg:px-8 lg:py-16">
        <div className="rounded-2xl border border-warning/20 bg-gradient-to-r from-background/95 to-warning/5 shadow-xl backdrop-blur-xl">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Main footer content */}
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {/* Brand section */}
              <div className="sm:col-span-2 lg:col-span-2">
                <Link href="/" className="mb-6 flex items-center space-x-3">
                  <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-warning to-destructive shadow-lg sm:h-10 sm:w-10">
                      <Sparkles className="h-4 w-4 text-white animate-pulse sm:h-5 sm:w-5" />
                      <div className="absolute inset-0 animate-ping rounded-xl bg-gradient-to-br from-warning to-destructive opacity-50"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent sm:text-2xl">
                      GraphBit
                    </span>
                    <span className="-mt-1 text-sm font-medium text-muted-foreground">AI Platform</span>
                  </div>
                </Link>

                <p className="mb-4 sm:mb-6 max-w-sm leading-relaxed text-muted-foreground text-sm sm:text-base">
                  The complete platform for building, deploying, and monitoring AI agents. Trusted by
                  developers worldwide.
                </p>

                {/* Social links */}
                <div className="flex space-x-3 sm:space-x-4">
                  <Link
                    href="https://github.com/graphbit-org/graphbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 backdrop-blur-sm"
                  >
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href="https://twitter.com/graphbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 backdrop-blur-sm"
                  >
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href="https://linkedin.com/company/graphbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 backdrop-blur-sm"
                  >
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Product links */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent">
                  <Code className="h-4 w-4 text-warning" />
                  Product
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/marketplace"
                      className="text-muted-foreground"
                    >
                      Agent Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tracing"
                      className="text-muted-foreground"
                    >
                      LLM Tracing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-muted-foreground"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources links */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent">
                  <BookOpen className="h-4 w-4 text-warning" />
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/blog"
                      className="text-muted-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs"
                      className="text-muted-foreground"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides"
                      className="text-muted-foreground"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/api"
                      className="text-muted-foreground"
                    >
                      API Reference
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support links */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent">
                  <Users className="h-4 w-4 text-warning" />
                  Support
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/help"
                      className="text-muted-foreground"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="text-muted-foreground"
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/status"
                      className="text-muted-foreground"
                    >
                      Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom section */}
            <div className="mt-8 flex flex-col items-center justify-between border-t border-warning/20 pt-8 lg:flex-row">
              <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground lg:flex-row lg:gap-6">
                <p>&copy; 2025 GraphBit. All rights reserved.</p>
                <div className="flex gap-4">
                  <Link href="/privacy" className="">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="">
                    Terms of Service
                  </Link>
                  <Link href="/cookies" className="">
                    Cookie Policy
                  </Link>
                </div>
              </div>

              {/* Scroll to top button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="mt-4 rounded-lg border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 backdrop-blur-sm lg:mt-0"
              >
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="sr-only">Scroll to top</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

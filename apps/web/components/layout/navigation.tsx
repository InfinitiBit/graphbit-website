'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Code, Home, Package, BarChart3, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/marketplace', label: 'Marketplace', icon: Package },
  { href: '/tracing', label: 'Tracing', icon: BarChart3 },
  { href: '/blog', label: 'Blog', icon: Code },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Enhanced scroll effect with glass morphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5'
            : 'bg-white/70 backdrop-blur-md border-b border-transparent',
          'supports-[backdrop-filter]:bg-white/60'
        )}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand - Enhanced with animation */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="group flex items-center space-x-2.5 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/60 hover:shadow-md hover:shadow-black/5"
              >
                <div className="relative">
                  <div className="rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 shadow-lg transition-transform duration-200 group-hover:scale-105">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur transition-opacity duration-200 group-hover:opacity-100" />
                </div>
                <div className="flex flex-col">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-xl font-bold text-transparent">
                    GraphBit
                  </span>
                  <span className="text-xs text-gray-500 font-medium -mt-1">AI Platform</span>
                </div>
              </Link>
            </div>

          {/* Desktop Navigation - Centered pill navigation */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-center">
              <div className="flex items-center space-x-1 rounded-full bg-gray-100/60 p-1 backdrop-blur-sm border border-gray-200/50">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'relative flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-white text-gray-900 shadow-sm shadow-gray-900/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              <Link
                href="https://github.com/graphbit-org/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 rounded-full border border-gray-200/50 bg-white/60 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-all duration-200 hover:border-gray-300/50 hover:bg-white/80 hover:text-gray-700 hover:shadow-md hover:shadow-black/5"
              >
                <Code className="h-4 w-4 transition-transform group-hover:scale-105" />
                <span className="hidden xl:inline">GitHub</span>
                <ArrowRight className="hidden h-3 w-3 transition-transform group-hover:translate-x-0.5 xl:inline" />
              </Link>

              <Link href="/dashboard">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full border border-gray-200/50 bg-white/60 px-4 backdrop-blur-sm hover:bg-white/80 hover:shadow-md hover:shadow-black/5"
                >
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="default"
                size="sm"
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-gray-900/25 hover:scale-105"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 transition-opacity duration-200 hover:opacity-100" />
              </Button>
            </div>

          {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                className="group flex items-center justify-center rounded-full bg-white/60 p-2.5 backdrop-blur-sm border border-gray-200/50 transition-all duration-200 hover:bg-white/80 hover:shadow-md hover:shadow-black/5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="relative h-6 w-6">
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700 transition-transform duration-200 rotate-0 group-hover:rotate-90" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700 transition-transform duration-200 group-hover:scale-110" />
                  )}
                </div>
              </button>
            </div>
        </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Enhanced Backdrop */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Modern Menu Panel */}
            <div className="fixed inset-x-4 top-20 animate-slide-up rounded-2xl border border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-2xl">
              {/* Navigation Items */}
              <div className="space-y-2 p-6">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'group flex items-center space-x-4 rounded-xl px-4 py-4 text-base font-medium transition-all duration-200',
                        isActive
                          ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'slideIn 0.3s ease-out forwards'
                      }}
                    >
                      <div className={cn(
                        'rounded-lg p-2 transition-colors',
                        isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                      )}>
                        <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-600")} />
                      </div>
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <div className="h-2 w-2 rounded-full bg-white shadow-sm"></div>
                      )}
                    </Link>
                  );
                })}

                {/* GitHub Link for Mobile */}
                <Link
                  href="https://github.com/graphbit-org/graphbit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center space-x-4 rounded-xl px-4 py-4 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-gray-200">
                    <Code className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="flex-1">GitHub</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 border-t border-gray-100 bg-gray-50/50 p-6">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full justify-center rounded-xl border border-gray-200/50 bg-white/60 font-medium backdrop-blur-sm hover:bg-white/80 hover:shadow-md"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-16" />
    </>
  );
}
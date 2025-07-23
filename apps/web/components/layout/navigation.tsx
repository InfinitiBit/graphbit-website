'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Code, Home, Package, BarChart3, Menu, X, ArrowRight } from 'lucide-react';
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

  // Handle scroll effect for better mobile experience only
  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on screens smaller than lg (1024px)
      if (window.innerWidth < 1024) {
        setScrolled(window.scrollY > 20);
      } else {
        setScrolled(false);
      }
    };

    // Check initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
          'sticky top-0 z-50 transition-all duration-200',
          'rounded-lg border-2 border-black bg-white backdrop-blur-sm',
          'mx-auto my-1.5 max-w-7xl',
          scrolled
            ? 'shadow-modern mx-0 my-0 max-w-none rounded-none border-x-0 border-b-2 border-t-0'
            : 'shadow-modern'
        )}
      >
        <div className="responsive-px flex h-16 items-center lg:h-14">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="touch-target-sm h-9 border-2 border-gray-200 bg-white px-3 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 lg:h-8"
            >
              <Link href="/" className="flex items-center space-x-1.5">
                <Code className="h-4 w-4 text-gray-900" />
                <span className="text-base font-bold text-gray-900 lg:text-sm">GraphBit</span>
              </Link>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between">
            <div className="ml-6 flex items-center space-x-1 xl:space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'touch-target-sm flex items-center space-x-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-gray-900',
                      isActive ? 'bg-gray-100/60 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 xl:space-x-3">
              <Link
                href="https://github.com/graphbit-org/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-sm flex items-center space-x-1.5 rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
              >
                <Code className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">GitHub</span>
                <ArrowRight className="hidden h-3 w-3 xl:inline" />
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="touch-target-sm h-9 px-3 text-sm">
                  <span className="hidden xl:inline">Dashboard</span>
                  <span className="xl:hidden">Dash</span>
                </Button>
              </Link>
              <Button
                variant="default"
                size="sm"
                className="touch-target-sm h-9 border-2 border-black bg-black px-4 text-sm font-bold hover:border-gray-800 hover:bg-gray-800"
              >
                <span className="hidden xl:inline">Sign In</span>
                <span className="xl:hidden">Sign In</span>
              </Button>
            </div>
          </div>

          {/* Tablet Navigation (md breakpoint) */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between lg:hidden">
            <div className="ml-6 flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'touch-target flex flex-col items-center space-y-1 rounded-md px-2 py-2 text-xs font-medium transition-colors hover:text-gray-900',
                      isActive ? 'bg-gray-100/60 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href="https://github.com/graphbit-org/graphbit"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex items-center justify-center rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
              >
                <Code className="h-4 w-4" />
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="touch-target h-10 px-3 text-sm">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="default"
                size="sm"
                className="touch-target h-10 border-2 border-black bg-black px-4 text-sm font-bold hover:border-gray-800 hover:bg-gray-800"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="ml-auto flex md:hidden">
            <button
              className="touch-target flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100/60"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="fixed inset-x-0 top-0 animate-slide-up border-b-4 border-black bg-white backdrop-blur-md">
              {/* Header */}
              <div className="flex h-16 items-center justify-between px-4">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-9 border-2 border-gray-200 bg-white px-3 hover:border-gray-300 hover:bg-gray-50"
                >
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-1.5"
                  >
                    <Code className="h-4 w-4 text-gray-900" />
                    <span className="text-base font-bold text-gray-900">GraphBit</span>
                  </Link>
                </Button>

                <button
                  className="touch-target flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100/60"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1 px-4 py-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'touch-target flex items-center space-x-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* GitHub Link for Mobile */}
                <Link
                  href="https://github.com/graphbit-org/graphbit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="touch-target flex items-center space-x-3 rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  <Code className="h-5 w-5" />
                  <span>GitHub Repository</span>
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 border-t border-gray-100 px-4 py-6">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="lg" className="touch-target w-full justify-center">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="lg"
                  className="touch-target w-full border-2 border-black bg-black font-bold hover:border-gray-800 hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jump when navigation becomes fixed */}
      {scrolled && <div className="h-16 lg:h-14" />}
    </>
  );
}

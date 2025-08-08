'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, BarChart3, Home, Menu, Sparkles, X, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Marketplace', href: '/marketplace', icon: BarChart3 },
  { name: 'Tracing', href: '/tracing', icon: Zap },
  { name: 'Pricing', href: '/pricing', icon: Sparkles },
  //   { name: 'Docs', href: '/docs', icon: BarChart3 },
  //   { name: 'Blog', href: '/blog', icon: BarChart3 },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
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
    <nav className="fixed left-0 right-0 top-0 z-50 px-3 py-2 sm:px-4 sm:py-3 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-warning/20 bg-gradient-to-r from-background/95 to-warning/5 shadow-xl backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:h-18 lg:px-8">
            {/* GraphBit Logo */}
            <Link
              href="/"
              className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Image
                  src="/graphbit-logo.png"
                  alt="GraphBit Logo"
                  width={40}
                  height={40}
                  // className="h-4 w-4"
                />
              </div>
              <span className="bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-base font-bold text-transparent transition-all duration-300 group-hover:from-warning/90 group-hover:via-destructive/90 group-hover:to-accent/90 sm:text-lg lg:text-xl">
                GraphBit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-2 lg:flex">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 text-warning shadow-lg'
                        : 'text-muted-foreground hover:bg-gradient-to-r hover:from-warning/5 hover:to-destructive/5 hover:text-foreground hover:shadow-md'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isActive
                          ? 'text-warning'
                          : 'text-muted-foreground group-hover:text-warning/80'
                      }`}
                    />
                    {item.name}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-warning to-destructive"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden items-center space-x-3 lg:flex">
              <ThemeToggle />
              {isAuthenticated ? (
                <Button
                  onClick={logout}
                  variant="outline"
                  className="rounded-lg border-destructive/20 px-4 py-2 text-sm font-medium text-destructive"
                >
                  <span className="flex items-center gap-2">
                    Log Out
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Button>
              ) : (
                <Link href="/login">
                  <Button className="rounded-lg bg-gradient-to-r from-warning to-destructive px-4 py-2 text-sm font-medium text-white shadow-lg">
                    <span className="relative flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5" />
                      Sign In
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="touch-target-sm group relative rounded-lg border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 p-2 transition-all duration-300 hover:from-warning/20 hover:to-destructive/20 hover:shadow-md hover:shadow-warning/10"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:scale-110" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />

          {/* Mobile Menu Content */}
          <div className="fixed inset-x-3 bottom-4 top-16 max-h-[calc(100vh-5rem)] overflow-hidden rounded-2xl border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-2xl backdrop-blur-xl sm:inset-x-4 sm:top-20 lg:top-24">
            <div className="flex h-full flex-col">
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`touch-target group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? 'border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 text-warning shadow-md'
                            : 'text-muted-foreground hover:bg-gradient-to-r hover:from-warning/5 hover:to-destructive/5 hover:text-foreground hover:shadow-sm'
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 transition-colors duration-300 ${isActive ? 'text-warning' : 'text-muted-foreground group-hover:text-warning/80'}`}
                        />
                        {item.name}
                        {isActive && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-gradient-to-r from-warning to-destructive"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-warning/20 p-4 sm:p-6">
                {isAuthenticated ? (
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="touch-target w-full rounded-lg border-destructive/20 py-3 text-sm font-medium text-destructive"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Log Out
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="touch-target w-full rounded-lg bg-gradient-to-r from-warning to-destructive py-3 text-sm font-medium text-white shadow-lg">
                      <span className="relative flex items-center justify-center gap-2">
                        <Zap className="h-4 w-4" />
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

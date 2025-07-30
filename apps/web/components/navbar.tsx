'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  BarChart3 as BookOpen,
  Home,
  Menu,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Marketplace', href: '/marketplace', icon: X },
  { name: 'Tracing', href: '/tracing', icon: Zap },
  { name: 'Docs', href: '/docs', icon: BookOpen },
  { name: 'Blog', href: '/blog', icon: X },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="responsive-container">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* GraphBit Logo */}
          <Link href="/" className="group z-10 flex items-center space-x-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl sm:h-12 sm:w-12">
                <Sparkles className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20"></div>
              </div>
            </div>
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              GraphBit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 lg:flex">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-100/80 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors duration-300 ${
                      isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  />
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden items-center space-x-4 lg:flex">
            <Link href="/dashboard">
              <Button className="group relative overflow-hidden rounded-xl border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 hover:shadow-xl">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="touch-friendly relative z-10 rounded-lg bg-gray-100 transition-colors hover:bg-gray-200 lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />

          {/* Mobile Menu Content */}
          <div className="fixed inset-x-0 bottom-0 top-16 bg-white shadow-xl sm:top-20">
            <div className="flex h-full flex-col">
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="mobile-spacing px-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`mobile-nav-item rounded-xl ${
                          isActive
                            ? 'border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                            : 'text-gray-700'
                        }`}
                      >
                        <Icon
                          className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                        />
                        {item.name}
                        {isActive && (
                          <div className="ml-auto h-2 w-2 rounded-full bg-blue-500"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-gray-200 p-4">
                <Link href="/dashboard" className="block">
                  <Button className="mobile-cta group rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800">
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

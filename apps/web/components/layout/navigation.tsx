
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles,
  Home,
  BarChart3 as BookOpen,

  BarChart3,

  Zap
} from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="responsive-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* GraphBit Logo */}
          <Link href="/" className="group flex items-center space-x-3 z-10">
            <div className="relative">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
              GraphBit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 hover:bg-gray-100/80 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-colors duration-300 ${
                    isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                  }`} />
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-6 py-2.5 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-10 touch-friendly rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
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
          <div 
            className="mobile-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Content */}
          <div className="fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="mobile-spacing px-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`mobile-nav-item rounded-xl ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700'
                        }`}
                      >
                        <Icon className={`h-5 w-5 mr-3 ${
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        {item.name}
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-gray-200 p-4">
                <Link href="/dashboard" className="block">
                  <Button className="mobile-cta group bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-6 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300">
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

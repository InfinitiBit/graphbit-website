'use client';

import { BarChart3 as BookOpen, Users, Clock, TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface BlogSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogSidebar({ categories, selectedCategory, onCategoryChange }: BlogSidebarProps) {
  const pathname = usePathname();
  
  const stats = [
    { label: 'Total Articles', value: '12+', icon: BookOpen },
    { label: 'Expert Authors', value: '5', icon: Users },
    { label: 'Avg. Read Time', value: '8min', icon: Clock },
  ];

  const getCategoryUrl = (categoryId: string) => {
    switch (categoryId) {
      case 'all':
        return '/blog';
      case 'tutorials':
        return '/blog/tutorials';
      case 'best-practices':
        return '/blog/best-practices';
      case 'advanced':
        return '/blog/advanced';
      default:
        return '/blog';
    }
  };

  const isActive = (categoryId: string) => {
    const categoryUrl = getCategoryUrl(categoryId);
    return pathname === categoryUrl;
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
          Categories
        </h3>
        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isCurrentlyActive = isActive(category.id);
            
            return (
              <Link
                key={category.id}
                href={getCategoryUrl(category.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isCurrentlyActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                {category.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Blog Stats
        </h3>
        <div className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">{stat.label}</span>
                </div>
                <span className="text-sm font-bold text-blue-600">{stat.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
        <div className="space-y-3">
          <a 
            href="/docs" 
            className="block text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            → Documentation
          </a>
          <a 
            href="/marketplace" 
            className="block text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            → Agent Marketplace
          </a>
          <a 
            href="/dashboard" 
            className="block text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            → Dashboard
          </a>
          <a 
            href="/tracing" 
            className="block text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            → LLM Tracing
          </a>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay in the Loop</h3>
        <p className="text-sm text-gray-600 mb-4">
          Get weekly insights on AI, LLMs, and the latest in agent development.
        </p>
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
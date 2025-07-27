'use client';

import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogPost } from '@/lib/blog';
import { BarChart3 as BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'tutorials', name: 'Tutorials', icon: BookOpen },
    { id: 'best-practices', name: 'Best Practices', icon: Sparkles },
    { id: 'advanced', name: 'Advanced Techniques', icon: TrendingUp },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => {
        const categoryMap: { [key: string]: string[] } = {
          'tutorials': ['Getting Started', 'Tutorial'],
          'best-practices': ['Best Practices', 'Architecture', 'Design Patterns'],
          'advanced': ['Advanced', 'Performance', 'Optimization', 'Tracing']
        };
        return post.tags.some(tag => categoryMap[selectedCategory]?.includes(tag));
      });

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(post => post !== featuredPost);

  return (
    <main className="relative pt-16 sm:pt-20">
      {/* Header Section */}
      <section className="px-4 py-12 text-center border-b border-gray-200/50">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-3 shadow-lg">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            GraphBit <span className="text-blue-600">Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Insights, tutorials, and developments in LLM frameworks and AI agents
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <BlogSidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {filteredPosts.length > 0 ? (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-12">
                    <div className="mb-6 flex items-center space-x-3">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                      <h2 className="text-xl font-bold text-gray-900">Featured Article</h2>
                    </div>
                    <BlogCard post={featuredPost} featured={true} />
                  </div>
                )}

                {/* Regular Posts */}
                {regularPosts.length > 0 && (
                  <div>
                    <div className="mb-6 flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedCategory === 'all' ? 'Latest Articles' : categories.find(c => c.id === selectedCategory)?.name}
                      </h2>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        {regularPosts.length} articles
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {regularPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="mb-3 text-lg font-semibold text-gray-700">No Articles Found</h3>
                  <p className="text-gray-500 text-sm">
                    No articles match your current selection. Try browsing all posts.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <section className="px-4 py-12 bg-gradient-to-r from-blue-50 to-purple-50 mt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Stay Updated</h2>
          <p className="mb-6 text-gray-600">
            Get the latest articles delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { BlogCard } from '@/components/blog/blog-card';
import { getAllBlogPosts } from '@/lib/blog';
import { BookOpen, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function BestPracticesPage() {
  const allPosts = getAllBlogPosts();
  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'tutorials', name: 'Tutorials', icon: BookOpen },
    { id: 'best-practices', name: 'Best Practices', icon: BookOpen },
    { id: 'advanced', name: 'Advanced Techniques', icon: BookOpen },
  ];

  // Filter posts for best practices
  const practicesPosts = allPosts.filter(post => 
    post.tags.some(tag => ['Best Practices', 'Architecture', 'Design Patterns', 'Guidelines'].includes(tag))
  );

  const featuredPractice = practicesPosts.find(post => post.featured) || practicesPosts[0];
  const regularPractices = practicesPosts.filter(post => post !== featuredPractice);

  const practiceAreas = [
    { title: 'Agent Architecture', description: 'Design patterns for scalable AI agents' },
    { title: 'Performance Optimization', description: 'Maximize efficiency and response times' },
    { title: 'Error Handling', description: 'Robust error management strategies' },
    { title: 'Security & Privacy', description: 'Protect data and ensure compliance' },
  ];

  return (
    <>
      <Navigation />
      
      {/* Background with gradient */}
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative pt-16 sm:pt-20">
        {/* Header Section */}
        <section className="px-4 py-12 border-b border-gray-200/50">
          <div className="mx-auto max-w-7xl">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Blog
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-3 shadow-lg mr-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                  Best <span className="text-purple-600">Practices</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Proven strategies and patterns for building robust AI systems
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Practice Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {practiceAreas.map((area, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{area.title}</h3>
                      <p className="text-gray-600 text-xs">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <BlogSidebar 
                categories={categories}
                selectedCategory="best-practices"
                onCategoryChange={() => {}}
              />
            </aside>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {practicesPosts.length > 0 ? (
                <>
                  {/* Featured Practice */}
                  {featuredPractice && (
                    <div className="mb-12">
                      <div className="mb-6 flex items-center space-x-3">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Featured Best Practice</h2>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Expert Recommended
                        </span>
                      </div>
                      <BlogCard post={featuredPractice} featured={true} />
                    </div>
                  )}

                  {/* Practice Guidelines */}
                  {regularPractices.length > 0 && (
                    <div>
                      <div className="mb-6 flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h2 className="text-xl font-bold text-gray-900">Practice Guidelines</h2>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          {regularPractices.length} guides
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {regularPractices.map((post, index) => (
                          <BlogCard key={post.slug} post={post} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                    <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">No Best Practices Yet</h3>
                    <p className="text-gray-500 text-sm">
                      We're compiling industry best practices. Check back soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Practice Checklist */}
          <div className="mt-16 bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              Development Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Planning Phase</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Define clear objectives
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Choose appropriate architecture
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Plan error handling
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Development</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Implement logging
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Add monitoring
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Write comprehensive tests
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Deployment</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Performance testing
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Security validation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Documentation review
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <section className="px-4 py-12 bg-gradient-to-r from-purple-50 to-indigo-50 mt-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Share Your Practices</h2>
            <p className="mb-6 text-gray-600">
              Help the community by sharing your own best practices and lessons learned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs" className="bg-purple-600 text-white px-6 py-2 text-sm rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Contribute Guide
              </Link>
              <Link href="/marketplace" className="bg-white text-purple-600 border border-purple-600 px-6 py-2 text-sm rounded-lg font-medium hover:bg-purple-50 transition-colors">
                View Examples
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
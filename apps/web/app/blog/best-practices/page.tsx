import { BlogCard } from '@/components/blog/blog-card';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navbar';
import { getAllBlogPosts } from '@/lib/blog';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function BestPracticesPage() {
  const allPosts = getAllBlogPosts();
  const categories = [
    { id: 'all', name: 'All Posts', icon: 'BookOpen' },
    { id: 'tutorials', name: 'Tutorials', icon: 'BookOpen' },
    { id: 'best-practices', name: 'Best Practices', icon: 'BookOpen' },
    { id: 'advanced', name: 'Advanced Techniques', icon: 'BookOpen' },
  ];

  // Filter posts for best practices
  const practicesPosts = allPosts.filter((post) =>
    post.tags.some((tag) =>
      ['Best Practices', 'Architecture', 'Design Patterns', 'Guidelines'].includes(tag)
    )
  );

  const featuredPractice = practicesPosts.find((post) => post.featured) || practicesPosts[0];
  const regularPractices = practicesPosts.filter((post) => post !== featuredPractice);

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
        <section className="border-b border-gray-200/50 px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Blog
            </Link>

            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-3 shadow-lg">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                  Best <span className="text-purple-600">Practices</span>
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Proven strategies and patterns for building robust AI systems
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Key Practice Areas</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {practiceAreas.map((area, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{area.title}</h3>
                      <p className="text-xs text-gray-600">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="flex-shrink-0 lg:w-64">
              <BlogSidebar categories={categories} selectedCategory="best-practices" />
            </aside>

            {/* Content Area */}
            <div className="min-w-0 flex-1">
              {practicesPosts.length > 0 ? (
                <>
                  {/* Featured Practice */}
                  {featuredPractice && (
                    <div className="mb-12">
                      <div className="mb-6 flex items-center space-x-3">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Featured Best Practice</h2>
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
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
                        {regularPractices.map((post) => (
                          <BlogCard key={post.slug} post={post} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                    <Sparkles className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">
                      No Best Practices Yet
                    </h3>
                    <p className="text-sm text-gray-500">
                      We&apos;re compiling industry best practices. Check back soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Practice Checklist */}
          <div className="mt-16 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
              <CheckCircle className="mr-3 h-6 w-6 text-green-600" />
              Development Checklist
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Planning Phase</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Define clear objectives
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Choose appropriate architecture
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Plan error handling
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Development</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Implement logging
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Add monitoring
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Write comprehensive tests
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Deployment</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Performance testing
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Security validation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Documentation review
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <section className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Share Your Practices</h2>
            <p className="mb-6 text-gray-600">
              Help the community by sharing your own best practices and lessons learned.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
              >
                Contribute Guide
              </Link>
              <Link
                href="/marketplace"
                className="rounded-lg border border-purple-600 bg-white px-6 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50"
              >
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

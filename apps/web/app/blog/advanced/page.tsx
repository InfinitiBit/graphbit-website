import { BlogCard } from '@/components/blog/blog-card';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navbar';
import { getAllBlogPosts } from '@/lib/blog';
import { ArrowRight, BarChart3 as Brain, BarChart3 as Target, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function AdvancedPage() {
  const allPosts = getAllBlogPosts();
  const categories = [
    { id: 'all', name: 'All Posts', icon: 'BarChart3' },
    { id: 'tutorials', name: 'Tutorials', icon: 'BarChart3' },
    { id: 'best-practices', name: 'Best Practices', icon: 'BarChart3' },
    { id: 'advanced', name: 'Advanced Techniques', icon: 'BarChart3' },
  ];

  // Filter posts for advanced techniques
  const advancedPosts = allPosts.filter((post) =>
    post.tags.some((tag) =>
      ['Advanced', 'Performance', 'Optimization', 'Tracing', 'Expert'].includes(tag)
    )
  );

  const featuredAdvanced = advancedPosts.find((post) => post.featured) || advancedPosts[0];
  const regularAdvanced = advancedPosts.filter((post) => post !== featuredAdvanced);

  const advancedTopics = [
    {
      title: 'Performance Optimization',
      description: 'Memory management, caching, and speed enhancements',
      icon: Zap,
      color: 'text-yellow-600',
    },
    {
      title: 'Advanced Tracing',
      description: 'Deep debugging and comprehensive monitoring',
      icon: Target,
      color: 'text-red-600',
    },
    {
      title: 'Neural Architecture',
      description: 'Custom model designs and neural network patterns',
      icon: Brain,
      color: 'text-purple-600',
    },
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
              <div className="mr-4 rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-3 shadow-lg">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                  Advanced <span className="text-orange-600">Techniques</span>
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Expert-level strategies for optimizing and scaling AI systems
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Advanced Focus Areas</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {advancedTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-6 w-6 ${topic.color} mt-0.5 flex-shrink-0`} />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{topic.title}</h3>
                          <p className="mt-1 text-xs text-gray-600">{topic.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="flex items-center text-sm text-amber-800">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <strong>Expert Level:</strong> These techniques require solid understanding of LLM
                  fundamentals and development experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="flex-shrink-0 lg:w-64">
              <BlogSidebar categories={categories} selectedCategory="advanced" />
            </aside>

            {/* Content Area */}
            <div className="min-w-0 flex-1">
              {advancedPosts.length > 0 ? (
                <>
                  {/* Featured Advanced */}
                  {featuredAdvanced && (
                    <div className="mb-12">
                      <div className="mb-6 flex items-center space-x-3">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        <h2 className="text-xl font-bold text-gray-900">
                          Featured Advanced Technique
                        </h2>
                        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                          Expert Level
                        </span>
                      </div>
                      <BlogCard post={featuredAdvanced} featured={true} />
                    </div>
                  )}

                  {/* Advanced Techniques */}
                  {regularAdvanced.length > 0 && (
                    <div>
                      <div className="mb-6 flex items-center space-x-3">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Expert Techniques</h2>
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                          {regularAdvanced.length} techniques
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {regularAdvanced.map((post, index) => (
                          <BlogCard key={post.slug} post={post} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                    <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">
                      No Advanced Techniques Yet
                    </h3>
                    <p className="text-sm text-gray-500">
                      We&apos;re preparing advanced content for expert developers. Stay tuned!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prerequisites Section */}
          <div className="mt-16 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
            <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
              <Brain className="mr-3 h-6 w-6 text-blue-600" />
              Prerequisites & Skills
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-semibold text-gray-900">Technical Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Python/JavaScript Proficiency
                      </p>
                      <p className="text-xs text-gray-600">
                        Strong programming foundation required
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        ML/AI Framework Experience
                      </p>
                      <p className="text-xs text-gray-600">
                        Familiarity with TensorFlow, PyTorch, or similar
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        System Architecture Knowledge
                      </p>
                      <p className="text-xs text-gray-600">Understanding of distributed systems</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-gray-900">Recommended Reading</h3>
                <div className="space-y-2">
                  <Link
                    href="/blog/tutorials"
                    className="block text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    → Complete our Tutorial Series first
                  </Link>
                  <Link
                    href="/blog/best-practices"
                    className="block text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    → Review Best Practices guide
                  </Link>
                  <Link
                    href="/docs"
                    className="block text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    → Study API Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Community Section */}
        <section className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-12 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 text-2xl font-bold">Join Expert Community</h2>
            <p className="mb-6 text-gray-300">
              Connect with other advanced practitioners and share cutting-edge techniques.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Expert Forums
              </Link>
              <Link
                href="/marketplace"
                className="rounded-lg border border-white bg-transparent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-gray-900"
              >
                Advanced Examples
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}


import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogSearch } from '@/components/blog/blog-search';
import { BlogCategories } from '@/components/blog/blog-categories';
import { getAllBlogPosts } from '@/lib/blog';
import { Code, TrendingUp, BookOpen, Sparkles } from 'lucide-react';

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts[0]; // First post as featured
  const regularPosts = posts.slice(1);

  // Get unique tags for categories
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <>
      <Navigation />

      {/* Background with gradient */}
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative pt-16 sm:pt-20">
        {/* Header Section */}
        <section className="px-4 py-16 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-center">
              <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 shadow-lg">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
              GraphBit <span className="text-blue-600">Blog</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700">
              Discover insights, tutorials, and cutting-edge developments in LLM frameworks, 
              AI agents, and the future of intelligent systems. Stay ahead with expert knowledge 
              and practical guides.
            </p>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <BlogSearch />
              <BlogCategories categories={allTags} />
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="px-4 pb-16">
          <div className="mx-auto max-w-6xl">
            {posts.length > 0 ? (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-12">
                    <div className="mb-6 flex items-center space-x-3">
                      <Sparkles className="h-6 w-6 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <BlogCard post={featuredPost} featured={true} />
                      </div>
                      <div className="lg:col-span-1">
                        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900">Why This Article?</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            This featured article represents the latest insights and most valuable 
                            content for developers working with AI agents and LLM frameworks. 
                            Don't miss these cutting-edge developments!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Posts */}
                {regularPosts.length > 0 && (
                  <div>
                    <div className="mb-8 flex items-center space-x-3">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {regularPosts.length} articles
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                      {regularPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto max-w-md rounded-lg border-2 border-gray-200 bg-white p-8 shadow-lg">
                  <div className="mb-4 rounded-full bg-gray-100 p-4 inline-block">
                    <Code className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-700">No Articles Yet</h3>
                  <p className="text-gray-500 leading-relaxed">
                    We're working on bringing you the latest insights and tutorials. 
                    Check back soon for exciting content about AI, LLMs, and more!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="px-4 py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Stay Updated</h2>
            <p className="mb-8 text-lg text-gray-600">
              Get the latest articles and insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

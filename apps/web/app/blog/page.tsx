import { BlogCard } from '@/components/blog/blog-card';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navbar';
import { getAllBlogPosts } from '@/lib/blog';
import { BarChart3 as BookOpen, Sparkles, TrendingUp } from 'lucide-react';

export default async function BlogPage() {
  const posts = getAllBlogPosts();

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'tutorials', name: 'Tutorials', icon: BookOpen },
    { id: 'best-practices', name: 'Best Practices', icon: Sparkles },
    { id: 'advanced', name: 'Advanced Techniques', icon: TrendingUp },
  ];

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const regularPosts = posts.filter((post) => post !== featuredPost);

  return (
    <>
      <Navigation />
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative pt-16 sm:pt-20">
        {/* Header Section */}
        <section className="border-b border-gray-200/50 px-4 py-12 text-center">
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
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="flex-shrink-0 lg:w-64">
              <div className="space-y-6">
                {/* Categories - Static for main blog page */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                    <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    Categories
                  </h3>
                  <nav className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      const isActive = category.id === 'all';
                      const href = category.id === 'all' ? '/blog' : `/blog/${category.id}`;

                      return (
                        <a
                          key={category.id}
                          href={href}
                          className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                          {category.name}
                        </a>
                      );
                    })}
                  </nav>
                </div>

                {/* Stats */}
                <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                    Blog Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          Total Articles
                        </span>
                      </div>
                      <span className="text-sm font-bold text-blue-600">{posts.length}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="min-w-0 flex-1">
              {posts.length > 0 ? (
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
                        <h2 className="text-xl font-bold text-gray-900">Latest Articles</h2>
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
                    <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">No Articles Found</h3>
                    <p className="text-sm text-gray-500">
                      No articles match your current selection. Try browsing all posts.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Stay Updated</h2>
            <p className="mb-6 text-gray-600">Get the latest articles delivered to your inbox.</p>
            <div className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
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

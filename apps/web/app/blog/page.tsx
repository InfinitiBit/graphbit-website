import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { BlogCard } from '@/components/blog/blog-card';
import { getAllBlogPosts } from '@/lib/blog';
import { Code, TrendingUp } from 'lucide-react';

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Navigation />

      {/* Background with gradient */}
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative">
        {/* Header Section */}
        <section className="px-4 py-12 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-center">
              <div className="rounded-lg border-2 border-black bg-white p-3 shadow-md">
                <Code className="h-8 w-8 text-black" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-black md:text-5xl">GraphBit Blog</h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-700">
              Insights, tutorials, and updates about LLM frameworks, AI agents, and the future of
              intelligent systems.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            {posts.length > 0 ? (
              <>
                <div className="mb-8 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
                  <span className="text-gray-500">({posts.length})</span>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto max-w-md rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md">
                  <Code className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">No blog posts yet</h3>
                  <p className="text-gray-500">
                    Check back soon for the latest insights and tutorials.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllBlogPosts } from "@/lib/blog";
import { Code, TrendingUp } from "lucide-react";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Navigation />
      
      {/* Background with gradient */}
      <div className="fixed inset-0 animated-gradient-bg -z-10"></div>
      
      <main className="relative">
        {/* Header Section */}
        <section className="py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white rounded-lg shadow-md border-2 border-black">
                <Code className="h-8 w-8 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              GraphBit Blog
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Insights, tutorials, and updates about LLM frameworks, AI agents, and the future of intelligent systems.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {posts.length > 0 ? (
              <>
                <div className="flex items-center space-x-2 mb-8">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
                  <span className="text-gray-500">({posts.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 max-w-md mx-auto">
                  <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No blog posts yet</h3>
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
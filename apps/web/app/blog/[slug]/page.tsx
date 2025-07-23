import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPost, getBlogPostSlugs } from "@/lib/blog";
import { ArrowRight, Clock, Users, Code } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      
      {/* Background with gradient */}
      <div className="fixed inset-0 animated-gradient-bg -z-10"></div>
      
      <main className="relative">
        {/* Back Button */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8 -ml-3">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 pb-16">
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/80 hover:bg-white border border-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {post.description}
              </p>
            )}

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 py-4 border-y border-gray-200 bg-white/50 rounded-lg px-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-gray-700 prose-strong:text-black prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Back to Blog Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <Link href="/blog">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Blog
              </Button>
            </Link>
          </footer>
        </article>
      </main>
      
      <Footer />
    </>
  );
} 
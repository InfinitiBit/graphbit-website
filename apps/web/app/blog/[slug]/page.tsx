
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPost, getBlogPostSlugs, getAllBlogPosts } from '@/lib/blog';
import { ArrowRight, Clock, Users, Calendar, Star } from 'lucide-react';
import { BlogCard } from '@/components/blog/blog-card';

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

  // Get related posts (same tags)
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <Navigation />

      {/* Background with gradient */}
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative">
        {/* Back Button */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="group -ml-3 mb-8 hover:bg-blue-50">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <article className="mx-auto max-w-4xl px-4 pb-16">
          <header className="mb-12">
            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="mb-8 text-xl leading-relaxed text-gray-700 font-medium">
                {post.description}
              </p>
            )}

            {/* Meta information */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                                        <Star className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button className="flex items-center space-x-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 transition-colors">
                                        <ArrowRight className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-code:rounded prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-pre:border prose-pre:border-gray-200 prose-pre:bg-gray-50 prose-pre:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 space-y-8">
            {/* Author bio */}
            <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-gray-600 mt-1">
                    Expert in AI systems and LLM frameworks. Passionate about building intelligent 
                    solutions that push the boundaries of what's possible with artificial intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-gray-200">
              <Link href="/blog">
                <Button variant="outline" className="group">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                  Back to Blog
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Reading time: {post.readTime}</span>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-4 py-16 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

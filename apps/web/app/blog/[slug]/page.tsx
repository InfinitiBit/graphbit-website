import { BlogCard } from '@/components/blog/blog-card';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllBlogPosts, getBlogPost, getBlogPostSlugs } from '@/lib/blog';
import { ArrowRight, Calendar, Clock, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    .filter((p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag)))
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
                  className="border border-blue-200 bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100"
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
              <p className="mb-8 text-xl font-medium leading-relaxed text-gray-700">
                {post.description}
              </p>
            )}

            {/* Meta information */}
            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
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
                <button className="flex items-center space-x-1 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200">
                  <Star className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button className="flex items-center space-x-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700">
                  <ArrowRight className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic prose-strong:text-gray-900 prose-code:rounded prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-pre:rounded-lg prose-pre:border prose-pre:border-gray-200 prose-pre:bg-gray-50">
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 space-y-8">
            {/* Author bio */}
            <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                  <p className="mt-1 text-gray-600">
                    Expert in AI systems and LLM frameworks. Passionate about building intelligent
                    solutions that push the boundaries of what&apos;s possible with artificial
                    intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
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
          <section className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
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

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPost, getBlogPostSlugs } from '@/lib/blog';
import { ArrowRight, Clock, Users, Code } from 'lucide-react';

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
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>

      <main className="relative">
        {/* Back Button */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="-ml-3 mb-8">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
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
                  className="border border-gray-200 bg-white/80 hover:bg-white"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold leading-tight text-black md:text-5xl">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="mb-8 text-xl leading-relaxed text-gray-700">{post.description}</p>
            )}

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 rounded-lg border-y border-gray-200 bg-white/50 px-4 py-4 text-sm text-gray-600">
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
            className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-gray-700 prose-strong:text-black prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-pre:border prose-pre:border-gray-200 prose-pre:bg-gray-50"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Back to Blog Footer */}
          <footer className="mt-16 border-t border-gray-200 pt-8">
            <Link href="/blog">
              <Button className="bg-black text-white hover:bg-gray-800">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
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

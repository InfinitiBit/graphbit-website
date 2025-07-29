import { BlogCard } from '@/components/blog/blog-card';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navbar';
import { getAllBlogPosts } from '@/lib/blog';
import { ArrowRight, BarChart3 as BookOpen, BarChart3 as GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default async function TutorialsPage() {
  const allPosts = getAllBlogPosts();

  // Filter posts for tutorials
  const tutorialPosts = allPosts.filter((post) =>
    post.tags.some((tag) => ['Getting Started', 'Tutorial', 'Guide'].includes(tag))
  );

  const featuredTutorial = tutorialPosts.find((post) => post.featured) || tutorialPosts[0];
  const regularTutorials = tutorialPosts.filter((post) => post !== featuredTutorial);

  return (
    <>
      <Navigation />
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
              <div className="mr-4 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-3 shadow-lg">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                  Tutorials & <span className="text-green-600">Guides</span>
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Step-by-step guides to master GraphBit and LLM frameworks
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">Learning Path</h2>
              <p className="mb-4 text-sm text-gray-600">
                Start with our getting started guide, then progress through intermediate concepts to
                advanced implementations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  Beginner Friendly
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  Code Examples
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                  Video Tutorials
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="flex-shrink-0 lg:w-64">
              <div className="space-y-6">
                {/* Categories */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                    <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    Categories
                  </h3>
                  <nav className="space-y-2">
                    <Link
                      href="/blog"
                      className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <BookOpen className="mr-3 h-4 w-4 flex-shrink-0" />
                      All Posts
                    </Link>
                    <Link
                      href="/blog/tutorials"
                      className="flex w-full items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-md transition-all duration-200"
                    >
                      <BookOpen className="mr-3 h-4 w-4 flex-shrink-0" />
                      Tutorials
                    </Link>
                    <Link
                      href="/blog/best-practices"
                      className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <BookOpen className="mr-3 h-4 w-4 flex-shrink-0" />
                      Best Practices
                    </Link>
                    <Link
                      href="/blog/advanced"
                      className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <BookOpen className="mr-3 h-4 w-4 flex-shrink-0" />
                      Advanced Techniques
                    </Link>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="min-w-0 flex-1">
              {tutorialPosts.length > 0 ? (
                <>
                  {/* Featured Tutorial */}
                  {featuredTutorial && (
                    <div className="mb-12">
                      <div className="mb-6 flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                        <h2 className="text-xl font-bold text-gray-900">Featured Tutorial</h2>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          Recommended
                        </span>
                      </div>
                      <BlogCard post={featuredTutorial} featured={true} />
                    </div>
                  )}

                  {/* Tutorial Series */}
                  {regularTutorials.length > 0 && (
                    <div>
                      <div className="mb-6 flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-900">All Tutorials</h2>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                          {regularTutorials.length} tutorials
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {regularTutorials.map((post) => (
                          <BlogCard key={post.slug} post={post} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                    <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">No Tutorials Yet</h3>
                    <p className="text-sm text-gray-500">
                      We&apos;re working on comprehensive tutorials. Check back soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <section className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Need Help?</h2>
            <p className="mb-6 text-gray-600">
              Our community and documentation are here to support your learning journey.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                View Documentation
              </Link>
              <Link
                href="/marketplace"
                className="rounded-lg border border-green-600 bg-white px-6 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
              >
                Browse Examples
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

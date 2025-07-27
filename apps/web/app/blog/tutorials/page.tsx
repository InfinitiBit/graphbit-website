import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { BlogCard } from '@/components/blog/blog-card';
import { getAllBlogPosts } from '@/lib/blog';
import { BarChart3 as BookOpen, BarChart3 as GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function TutorialsPage() {
  const allPosts = getAllBlogPosts();

  // Filter posts for tutorials
  const tutorialPosts = allPosts.filter(post => 
    post.tags.some(tag => ['Getting Started', 'Tutorial', 'Guide'].includes(tag))
  );

  const featuredTutorial = tutorialPosts.find(post => post.featured) || tutorialPosts[0];
  const regularTutorials = tutorialPosts.filter(post => post !== featuredTutorial);

  return (
    <>
      <Navigation />
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>
      
      <main className="relative pt-16 sm:pt-20">
        {/* Header Section */}
        <section className="px-4 py-12 border-b border-gray-200/50">
          <div className="mx-auto max-w-7xl">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Blog
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-3 shadow-lg mr-4">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                  Tutorials & <span className="text-green-600">Guides</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Step-by-step guides to master GraphBit and LLM frameworks
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Learning Path</h2>
              <p className="text-gray-600 text-sm mb-4">
                Start with our getting started guide, then progress through intermediate concepts to advanced implementations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Beginner Friendly</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Code Examples</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Video Tutorials</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="space-y-6">
                {/* Categories */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Categories
                  </h3>
                  <nav className="space-y-2">
                    <a href="/blog" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                      <BookOpen className="h-4 w-4 mr-3 flex-shrink-0" />
                      All Posts
                    </a>
                    <a href="/blog/tutorials" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white shadow-md transition-all duration-200">
                      <BookOpen className="h-4 w-4 mr-3 flex-shrink-0" />
                      Tutorials
                    </a>
                    <a href="/blog/best-practices" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                      <BookOpen className="h-4 w-4 mr-3 flex-shrink-0" />
                      Best Practices
                    </a>
                    <a href="/blog/advanced" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                      <BookOpen className="h-4 w-4 mr-3 flex-shrink-0" />
                      Advanced Techniques
                    </a>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {tutorialPosts.length > 0 ? (
                <>
                  {/* Featured Tutorial */}
                  {featuredTutorial && (
                    <div className="mb-12">
                      <div className="mb-6 flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                        <h2 className="text-xl font-bold text-gray-900">Featured Tutorial</h2>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
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
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">No Tutorials Yet</h3>
                    <p className="text-gray-500 text-sm">
                      We're working on comprehensive tutorials. Check back soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <section className="px-4 py-12 bg-gradient-to-r from-green-50 to-emerald-50 mt-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Need Help?</h2>
            <p className="mb-6 text-gray-600">
              Our community and documentation are here to support your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs" className="bg-green-600 text-white px-6 py-2 text-sm rounded-lg font-medium hover:bg-green-700 transition-colors">
                View Documentation
              </Link>
              <Link href="/marketplace" className="bg-white text-green-600 border border-green-600 px-6 py-2 text-sm rounded-lg font-medium hover:bg-green-50 transition-colors">
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
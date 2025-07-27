
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { BlogCard } from '@/components/blog/blog-card';
import { getAllBlogPosts } from '@/lib/blog';
import { TrendingUp, ArrowRight, Zap, BarChart3, BarChart3 as Target, BarChart3 as Brain } from 'lucide-react';
import Link from 'next/link';

export default async function AdvancedPage() {
  const allPosts = getAllBlogPosts();
  const categories = [
    { id: 'all', name: 'All Posts', icon: BarChart3 },
    { id: 'tutorials', name: 'Tutorials', icon: BarChart3 },
    { id: 'best-practices', name: 'Best Practices', icon: BarChart3 },
    { id: 'advanced', name: 'Advanced Techniques', icon: BarChart3 },
  ];

  // Filter posts for advanced techniques
  const advancedPosts = allPosts.filter(post => 
    post.tags.some(tag => ['Advanced', 'Performance', 'Optimization', 'Tracing', 'Expert'].includes(tag))
  );

  const featuredAdvanced = advancedPosts.find(post => post.featured) || advancedPosts[0];
  const regularAdvanced = advancedPosts.filter(post => post !== featuredAdvanced);

  const advancedTopics = [
    { 
      title: 'Performance Optimization', 
      description: 'Memory management, caching, and speed enhancements',
      icon: Zap,
      color: 'text-yellow-600'
    },
    { 
      title: 'Advanced Tracing', 
      description: 'Deep debugging and comprehensive monitoring',
      icon: Target,
      color: 'text-red-600'
    },
    { 
      title: 'Neural Architecture', 
      description: 'Custom model designs and neural network patterns',
      icon: Brain,
      color: 'text-purple-600'
    },
  ];

  return (
    <>
      <Navigation />
      
      {/* Background with gradient */}
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
              <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-3 shadow-lg mr-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                  Advanced <span className="text-orange-600">Techniques</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Expert-level strategies for optimizing and scaling AI systems
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Advanced Focus Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {advancedTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-6 w-6 ${topic.color} mt-0.5 flex-shrink-0`} />
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{topic.title}</h3>
                          <p className="text-gray-600 text-xs mt-1">{topic.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <strong>Expert Level:</strong> These techniques require solid understanding of LLM fundamentals and development experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <BlogSidebar 
                categories={categories}
                selectedCategory="advanced"
                onCategoryChange={() => {}}
              />
            </aside>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {advancedPosts.length > 0 ? (
                <>
                  {/* Featured Advanced */}
                  {featuredAdvanced && (
                    <div className="mb-12">
                      <div className="mb-6 flex items-center space-x-3">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        <h2 className="text-xl font-bold text-gray-900">Featured Advanced Technique</h2>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          Expert Level
                        </span>
                      </div>
                      <BlogCard post={featuredAdvanced} featured={true} />
                    </div>
                  )}

                  {/* Advanced Techniques */}
                  {regularAdvanced.length > 0 && (
                    <div>
                      <div className="mb-6 flex items-center space-x-3">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900">Expert Techniques</h2>
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                          {regularAdvanced.length} techniques
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {regularAdvanced.map((post, index) => (
                          <BlogCard key={post.slug} post={post} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">No Advanced Techniques Yet</h3>
                    <p className="text-gray-500 text-sm">
                      We're preparing advanced content for expert developers. Stay tuned!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prerequisites Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Brain className="h-6 w-6 text-blue-600 mr-3" />
              Prerequisites & Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Technical Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Python/JavaScript Proficiency</p>
                      <p className="text-gray-600 text-xs">Strong programming foundation required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">ML/AI Framework Experience</p>
                      <p className="text-gray-600 text-xs">Familiarity with TensorFlow, PyTorch, or similar</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">System Architecture Knowledge</p>
                      <p className="text-gray-600 text-xs">Understanding of distributed systems</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Recommended Reading</h3>
                <div className="space-y-2">
                  <Link href="/blog/tutorials" className="block text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    → Complete our Tutorial Series first
                  </Link>
                  <Link href="/blog/best-practices" className="block text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    → Review Best Practices guide
                  </Link>
                  <Link href="/docs" className="block text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    → Study API Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Community Section */}
        <section className="px-4 py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 text-2xl font-bold">Join Expert Community</h2>
            <p className="mb-6 text-gray-300">
              Connect with other advanced practitioners and share cutting-edge techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs" className="bg-white text-gray-900 px-6 py-2 text-sm rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Expert Forums
              </Link>
              <Link href="/marketplace" className="bg-transparent text-white border border-white px-6 py-2 text-sm rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
                Advanced Examples
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
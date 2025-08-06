import { Card } from '@/components/ui/card';
import { Shield, BarChart3, Globe, AlertCircle, CheckCircle } from 'lucide-react';

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Cookies Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn about how GraphBit uses cookies and similar technologies to enhance your experience.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* What Are Cookies */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our platform.
              </p>
              <p>
                Similar technologies include web beacons, pixels, local storage, and session storage, 
                which serve similar purposes for improving website functionality and analytics.
              </p>
            </div>
          </Card>

          {/* Types of Cookies */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>
            </div>
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="rounded-lg border border-green-200 dark:border-green-800 p-4">
                <div className="mb-3 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">Essential Cookies</h3>
                  <span className="rounded-full bg-green-100 dark:bg-green-900 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-200">
                    Always Active
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  These cookies are necessary for our website to function properly and cannot be disabled.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground pl-4">
                  <li>• Authentication and session management</li>
                  <li>• Security and fraud prevention</li>
                  <li>• Load balancing and performance optimization</li>
                  <li>• CSRF protection and form submission</li>
                  <li>• Theme preferences (dark/light mode)</li>
                </ul>
              </div>

              {/* Performance Cookies */}
              <div className="rounded-lg border border-blue-200 dark:border-blue-800 p-4">
                <div className="mb-3 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Performance Cookies</h3>
                  <span className="rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-200">
                    Optional
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  These cookies help us understand how you interact with our platform to improve performance.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground pl-4">
                  <li>• Page load times and error tracking</li>
                  <li>• Feature usage analytics</li>
                  <li>• API performance monitoring</li>
                  <li>• Agent deployment success rates</li>
                  <li>• Platform optimization insights</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="rounded-lg border border-purple-200 dark:border-purple-800 p-4">
                <div className="mb-3 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400">Functional Cookies</h3>
                  <span className="rounded-full bg-purple-100 dark:bg-purple-900 px-2 py-1 text-xs font-medium text-purple-800 dark:text-purple-200">
                    Optional
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  These cookies enable enhanced functionality and personalization features.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground pl-4">
                  <li>• User interface preferences</li>
                  <li>• Dashboard layout customizations</li>
                  <li>• Agent configuration history</li>
                  <li>• Saved search filters and sorting</li>
                  <li>• Language and region settings</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="rounded-lg border border-orange-200 dark:border-orange-800 p-4">
                <div className="mb-3 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400">Analytics Cookies</h3>
                  <span className="rounded-full bg-orange-100 dark:bg-orange-900 px-2 py-1 text-xs font-medium text-orange-800 dark:text-orange-200">
                    Optional
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  These cookies help us understand user behavior to improve our services.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground pl-4">
                  <li>• Google Analytics for website traffic analysis</li>
                  <li>• User journey and conversion tracking</li>
                  <li>• A/B testing for feature improvements</li>
                  <li>• Heat mapping and user interaction tracking</li>
                  <li>• Platform usage statistics</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Third-Party Cookies */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                <Globe className="h-5 w-5 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-semibold">Third-Party Cookies and Services</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use trusted third-party services that may set their own cookies. These services help us 
                provide better functionality and insights:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-foreground">Authentication</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Clerk (authentication service)</li>
                    <li>• Google OAuth</li>
                    <li>• GitHub OAuth</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-foreground">Analytics</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Google Analytics</li>
                    <li>• Vercel Analytics</li>
                    <li>• PostHog (optional)</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-foreground">Performance</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Vercel Speed Insights</li>
                    <li>• CloudFlare (CDN)</li>
                    <li>• Error tracking services</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-foreground">Support</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Intercom (chat support)</li>
                    <li>• Zendesk (helpdesk)</li>
                    <li>• Email delivery services</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Platform Specific Cookies */}
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">AI Platform-Specific Cookies</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As an AI platform, we use specific cookies to enhance your AI development experience:
              </p>
              <ul className="space-y-3 pl-4">
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span><strong>Agent Session Cookies:</strong> Maintain state for long-running AI agent deployments</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span><strong>Trace Data Cookies:</strong> Store temporary trace viewing preferences and filters</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span><strong>Model Preference Cookies:</strong> Remember your preferred AI models and configurations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span><strong>Development Environment Cookies:</strong> Store IDE preferences and workspace settings</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span><strong>Marketplace Cookies:</strong> Track agent discovery preferences and download history</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Cookie Management */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold">Managing Your Cookie Preferences</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Cookie Settings</h3>
                <p>
                  You can manage your cookie preferences at any time through our cookie settings panel. 
                  Click the "Cookie Settings" button that appears on our website to customize your preferences.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Browser Settings</h3>
                <p>
                  Most browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="mt-2 space-y-1 pl-4">
                  <li>• Block all cookies or only third-party cookies</li>
                  <li>• Delete existing cookies</li>
                  <li>• Set preferences for specific websites</li>
                  <li>• Receive notifications when cookies are set</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Impact of Disabling Cookies</h3>
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 text-orange-500 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">
                        Please note:
                      </p>
                      <p className="text-orange-700 dark:text-orange-300">
                        Disabling essential cookies may impact website functionality, including login capabilities, 
                        agent deployment features, and dashboard preferences. Performance and analytics cookies 
                        can be disabled without affecting core functionality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Cookie Retention */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">Cookie Retention and Data</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-foreground">Session Cookies</h3>
                  <p className="text-sm">
                    Automatically deleted when you close your browser. Used for authentication and temporary preferences.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-foreground">Persistent Cookies</h3>
                  <p className="text-sm">
                    Stored for specific periods (typically 30 days to 2 years) to remember your preferences across sessions.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-foreground">Analytics Cookies</h3>
                  <p className="text-sm">
                    Usually retained for 24 months to provide meaningful usage analytics and platform improvements.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-foreground">Functional Cookies</h3>
                  <p className="text-sm">
                    Retained until you change your preferences or for up to 12 months to maintain your customizations.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Updates and Contact */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500/10">
                <Globe className="h-5 w-5 text-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold">Updates and Contact Information</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Policy Updates</h3>
                <p>
                  We may update this Cookies Policy to reflect changes in our technology, legal requirements, 
                  or services. We will notify you of significant changes through our platform or via email.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Questions and Support</h3>
                <p>
                  If you have questions about our use of cookies or need help managing your preferences, 
                  please contact us:
                </p>
                <ul className="mt-2 space-y-1 pl-4">
                  <li>Email: <a href="mailto:privacy@graphbit.ai" className="text-primary hover:underline">privacy@graphbit.ai</a></li>
                  <li>Support: <a href="mailto:support@graphbit.ai" className="text-primary hover:underline">support@graphbit.ai</a></li>
                  <li>Documentation: Visit our help center for detailed cookie management guides</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Cookie Consent Notice */}
          <Card className="p-6 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">Your Consent Matters</h3>
              <p className="text-muted-foreground">
                By continuing to use GraphBit, you acknowledge that you have read and understood this Cookies Policy. 
                You can withdraw or modify your consent at any time through our cookie settings or browser preferences.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Manage Cookie Preferences
                </button>
                <button className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium hover:bg-primary/5 transition-colors">
                  View Privacy Policy
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
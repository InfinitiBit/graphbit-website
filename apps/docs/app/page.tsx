import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  BookOpen,
  Code2,
  Sparkles,
  ArrowRight,
  Zap,
  BarChart3,
  FileText,
  GitBranch,
  Settings,
  Users,
  Shield,
  Rocket
} from 'lucide-react';

const navigationSections = [
  {
    title: 'Getting Started',
    icon: Rocket,
    items: [
      { name: 'Quick Start', href: '/docs/quick-start', description: 'Get up and running with GraphBit in minutes' },
      { name: 'Installation', href: '/docs/installation', description: 'Install GraphBit Framework and CLI tools' },
      { name: 'First Agent', href: '/docs/first-agent', description: 'Build your first AI agent with GraphBit' },
      { name: 'Configuration', href: '/docs/configuration', description: 'Configure your GraphBit environment' },
    ]
  },
  {
    title: 'Framework',
    icon: Code2,
    items: [
      { name: 'Core Concepts', href: '/docs/concepts', description: 'Understand GraphBit\'s architecture and principles' },
      { name: 'Agent Builder', href: '/docs/agent-builder', description: 'Create and customize AI agents' },
      { name: 'LLM Integration', href: '/docs/llm-integration', description: 'Connect with various language models' },
      { name: 'Workflow Engine', href: '/docs/workflows', description: 'Design complex AI workflows' },
    ]
  },
  {
    title: 'Cloud Platform',
    icon: BarChart3,
    items: [
      { name: 'Dashboard', href: '/docs/dashboard', description: 'Monitor and manage your AI applications' },
      { name: 'Tracing & Analytics', href: '/docs/tracing', description: 'Track LLM calls and performance metrics' },
      { name: 'Deployment', href: '/docs/deployment', description: 'Deploy agents to production' },
      { name: 'Scaling', href: '/docs/scaling', description: 'Scale your AI applications globally' },
    ]
  },
  {
    title: 'API Reference',
    icon: FileText,
    items: [
      { name: 'REST API', href: '/docs/api/rest', description: 'Complete REST API documentation' },
      { name: 'GraphQL API', href: '/docs/api/graphql', description: 'GraphQL schema and queries' },
      { name: 'SDKs', href: '/docs/sdks', description: 'Official SDKs for popular languages' },
      { name: 'Webhooks', href: '/docs/webhooks', description: 'Real-time event notifications' },
    ]
  }
];

const quickLinks = [
  { name: 'Framework GitHub', href: 'https://github.com/graphbit/framework', icon: GitBranch },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Security', href: '/docs/security', icon: Shield },
  { name: 'Support', href: '/support', icon: Settings },
];

export default function DocsHome() {
  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Navigation Header */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="responsive-container">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20">
                  <Sparkles className="h-4 w-4 text-white animate-pulse transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                GraphBit
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Zap className="h-4 w-4" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="responsive-section border-b border-border/50">
        <div className="responsive-container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              <BookOpen className="h-4 w-4" />
              Documentation
            </div>

            <h1 className="responsive-heading-xl mb-6 hero-title-main">
              GraphBit Documentation
            </h1>

            <p className="responsive-text mb-8 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale AI agents with GraphBit Framework and Cloud Platform.
              From quick start guides to advanced API references.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/quick-start"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 text-base font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Rocket className="h-5 w-5" />
                Quick Start
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/docs/api"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground hover:bg-muted transition-all duration-200"
              >
                <Code2 className="h-5 w-5" />
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="responsive-section">
        <div className="responsive-container">
          <div className="grid gap-8 lg:gap-12">
            {navigationSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="responsive-heading-md text-foreground">{section.title}</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group rounded-lg border border-border bg-card p-6 hover:bg-muted/50 hover:border-primary/20 transition-all duration-200 hover:shadow-subtle"
                      >
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-medium">Learn more</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="responsive-section border-t border-border/50 bg-muted/30">
        <div className="responsive-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="responsive-heading-md text-center mb-8 text-foreground">
              Quick Links
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:bg-muted/50 hover:border-accent/20 transition-all duration-200 hover:shadow-subtle"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-accent/10 to-success/10 border border-accent/20">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="responsive-container">
          <div className="flex flex-col sm:flex-row items-center justify-between py-8 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2024 GraphBit.</span>
              <span>Built with the GraphBit Framework.</span>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/docs/changelog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Changelog
              </Link>
              <Link
                href="/docs/contributing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contributing
              </Link>
              <Link
                href="https://github.com/graphbit/framework"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

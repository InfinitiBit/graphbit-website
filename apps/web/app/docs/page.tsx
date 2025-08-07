'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  BarChart,
  BarChart3 as Brain,
  Check,
  Code,
  Copy,
  Database,
  Globe,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const sidebarSections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '#introduction', icon: Sparkles },
      { label: 'Quick Start', href: '#quick-start', icon: Zap },
      { label: 'Installation', href: '#installation', icon: Code },
      { label: 'Authentication', href: '#authentication', icon: Shield },
      { label: 'Configuration', href: '#configuration', icon: Settings },
      { label: 'First Steps', href: '#first-steps', icon: ArrowRight },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { label: 'AI Agents', href: '#ai-agents', icon: Brain },
      { label: 'LLM Tracing', href: '#llm-tracing', icon: BarChart },
      { label: 'Marketplace', href: '#marketplace', icon: Globe },
      { label: 'Workflows', href: '#workflows', icon: ArrowRight },
      { label: 'Data Models', href: '#data-models', icon: Database },
      { label: 'Event System', href: '#events', icon: Zap },
      { label: 'Security', href: '#security', icon: Shield },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Agent API', href: '#agent-api', icon: Code },
      { label: 'Tracing API', href: '#tracing-api', icon: BarChart },
      { label: 'Webhooks', href: '#webhooks', icon: Zap },
      { label: 'SDKs', href: '#sdks', icon: Sparkles },
      { label: 'REST Endpoints', href: '#rest-api', icon: Globe },
      { label: 'GraphQL Schema', href: '#graphql', icon: Database },
      { label: 'Rate Limiting', href: '#rate-limits', icon: Shield },
      { label: 'Error Codes', href: '#errors', icon: X },
    ],
  },
  {
    title: 'Guides & Tutorials',
    items: [
      { label: 'Building Your First Agent', href: '#first-agent', icon: Brain },
      { label: 'Advanced Tracing', href: '#advanced-tracing', icon: BarChart },
      { label: 'Custom Workflows', href: '#custom-workflows', icon: ArrowRight },
      { label: 'Performance Optimization', href: '#performance', icon: Zap },
      { label: 'Deployment Strategies', href: '#deployment', icon: Globe },
      { label: 'Monitoring & Alerts', href: '#monitoring', icon: BarChart },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { label: 'OpenAI Integration', href: '#openai', icon: Brain },
      { label: 'Anthropic Claude', href: '#claude', icon: Brain },
      { label: 'Langchain', href: '#langchain', icon: Code },
      { label: 'LlamaIndex', href: '#llamaindex', icon: Database },
      { label: 'Custom Providers', href: '#custom-providers', icon: Sparkles },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Examples', href: '#examples', icon: Code },
      { label: 'Community', href: '#community', icon: Users },
      { label: 'Support', href: '#support', icon: MessageSquare },
      { label: 'Changelog', href: '#changelog', icon: ArrowRight },
      { label: 'Migration Guide', href: '#migration', icon: ArrowRight },
      { label: 'Best Practices', href: '#best-practices', icon: Sparkles },
    ],
  },
];

const codeExamples = {
  python: `from graphbit import Agent, trace

# Initialize GraphBit client
client = Agent(api_key="your_api_key")

@trace
def my_llm_function(prompt):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

# Use your traced function
result = my_llm_function("Explain quantum computing")`,

  javascript: `import { Agent, trace } from '@graphbit/sdk';

// Initialize GraphBit client
const client = new Agent({ apiKey: 'your_api_key' });

const tracedFunction = trace(async (prompt) => {
  const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });
  return response.choices[0].message.content;
});

// Use your traced function
const result = await tracedFunction('Explain quantum computing');`,

  curl: `curl -X POST https://api.graphbit.com/v1/traces \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "llm_completion",
    "input": "Explain quantum computing",
    "output": "Quantum computing is...",
    "metadata": {
      "model": "gpt-4",
      "tokens": 150
    }
  }'`,
};

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeCodeTab, setActiveCodeTab] = useState('python');
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <>
      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.2);
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.4);
        }
      `}</style>
      <div className="min-h-screen w-full bg-gradient-background">
        {/* Docs page header section */}
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="container-responsive py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden hover:bg-muted"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-2 shadow-lg">
                    <Sparkles className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">Documentation</h1>
                    <p className="hidden text-sm text-muted-foreground sm:block">
                      Everything you need to build with GraphBit
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    className="w-64 rounded-lg border border-border bg-card/50 py-2 pl-10 pr-4 backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="flex">
            {/* Sidebar - Always fixed positioned with independent scrolling */}
            <aside
              className={`fixed top-20 bottom-0 left-0 z-40 w-80 transform border-r border-border bg-card/90 backdrop-blur-sm transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'} overflow-hidden`}
            >
              <div
                className="h-full overflow-y-auto sidebar-scroll"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'hsl(var(--muted-foreground) / 0.2) transparent'
                }}
              >
                <div className="space-y-6 p-6 pb-8">
                  {sidebarSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="mb-3 font-semibold text-foreground">{section.title}</h3>
                      <nav className="space-y-1">
                        {section.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                              setActiveSection(item.href.slice(1));
                              setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                              activeSection === item.href.slice(1)
                                ? 'bg-gradient-to-r from-primary/10 to-accent/10 font-medium text-primary border border-primary/20'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                            {activeSection === item.href.slice(1) && (
                              <ArrowRight className="ml-auto h-4 w-4 text-primary" />
                            )}
                          </a>
                        ))}
                      </nav>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Overlay for mobile - Between sidebar and nav */}
            {sidebarOpen && (
              <div
                className="fixed top-20 bottom-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Main Content - Fixed sidebar margin on desktop, full width on mobile */}
            <main className="w-full lg:ml-80 scroll-smooth">
              <div className="container-responsive max-w-4xl py-8">
              {/* Introduction Section */}
              <section id="introduction" className="mb-16">
                <div className="mb-8">
                  <h1 className="mb-4 text-4xl font-bold text-foreground hero-title-main">Welcome to GraphBit</h1>
                  <p className="text-xl leading-relaxed text-muted-foreground">
                    GraphBit is a powerful cloud platform for managing AI agents, tracking LLM
                    outputs, and scaling your AI applications with confidence.
                  </p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card className="group border-0 bg-gradient-to-br from-primary/5 to-primary-light/10 transition-all duration-300 hover:shadow-enhanced border border-primary/10">
                    <CardHeader>
                      <div className="mb-2 w-fit rounded-lg bg-gradient-to-br from-primary/10 to-primary-light/20 p-2 border border-primary/20">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-foreground">AI Agents</CardTitle>
                      <CardDescription className="text-muted-foreground">Deploy and manage AI agents at scale</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="group border-0 bg-gradient-to-br from-accent/5 to-accent-light/10 transition-all duration-300 hover:shadow-enhanced border border-accent/10">
                    <CardHeader>
                      <div className="mb-2 w-fit rounded-lg bg-gradient-to-br from-accent/10 to-accent-light/20 p-2 border border-accent/20">
                        <BarChart className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-lg text-foreground">LLM Tracing</CardTitle>
                      <CardDescription className="text-muted-foreground">Monitor and optimize model performance</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="group border-0 bg-gradient-to-br from-success/5 to-success-light/10 transition-all duration-300 hover:shadow-enhanced border border-success/10">
                    <CardHeader>
                      <div className="mb-2 w-fit rounded-lg bg-gradient-to-br from-success/10 to-success-light/20 p-2 border border-success/20">
                        <Globe className="h-6 w-6 text-success" />
                      </div>
                      <CardTitle className="text-lg text-foreground">Marketplace</CardTitle>
                      <CardDescription className="text-muted-foreground">Discover and share AI solutions</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </section>

              {/* Quick Start Section */}
              <section id="quick-start" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-foreground">Quick Start</h2>

                <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-enhanced">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    Get started in minutes
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary-light/20 text-sm font-semibold text-primary border border-primary/20">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Create an account</h4>
                        <p className="text-muted-foreground">
                          Sign up for a free GraphBit account to get started
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/10 to-accent-light/20 text-sm font-semibold text-accent border border-accent/20">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Install the SDK</h4>
                        <p className="text-muted-foreground">
                          Install our SDK for your preferred programming language
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-success/10 to-success-light/20 text-sm font-semibold text-success border border-success/20">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Start tracing</h4>
                        <p className="text-muted-foreground">
                          Add tracing to your LLM calls and monitor performance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="overflow-hidden rounded-xl bg-secondary border border-border">
                  <div className="flex items-center justify-between border-b border-border px-6 py-3">
                    <div className="flex items-center gap-4">
                      <h4 className="font-medium text-secondary-foreground">Example Usage</h4>
                      <div className="flex items-center gap-1">
                        {Object.keys(codeExamples).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setActiveCodeTab(lang)}
                            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                              activeCodeTab === lang
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-secondary-foreground'
                            }`}
                          >
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(codeExamples[activeCodeTab as keyof typeof codeExamples])
                      }
                      className="text-muted-foreground hover:text-secondary-foreground"
                    >
                      {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="p-6">
                    <pre className="overflow-x-auto text-sm text-secondary-foreground">
                      <code>{codeExamples[activeCodeTab as keyof typeof codeExamples]}</code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* Installation Section */}
              <section id="installation" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-foreground">Installation</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card className="border border-border bg-card shadow-enhanced">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Code className="h-5 w-5 text-primary" />
                        Python
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">Install via pip</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-muted/30 border border-border p-4">
                        <code className="text-sm text-foreground">pip install graphbit</code>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border bg-card shadow-enhanced">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Code className="h-5 w-5 text-accent" />
                        JavaScript
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">Install via npm</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-muted/30 border border-border p-4">
                        <code className="text-sm text-foreground">npm install @graphbit/sdk</code>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* API Reference Section */}
              <section id="agent-api" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-foreground">API Reference</h2>

                <div className="space-y-6">
                  <Card className="border border-border bg-card shadow-enhanced">
                    <CardHeader>
                      <CardTitle className="text-foreground">Agent Management</CardTitle>
                      <CardDescription className="text-muted-foreground">Create, deploy, and manage AI agents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-primary/5 to-primary-light/10 border border-primary/20 p-4">
                          <div>
                            <code className="font-mono text-sm text-primary">POST /api/agents</code>
                            <p className="mt-1 text-sm text-muted-foreground">Create a new agent</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent/5 to-accent-light/10 border border-accent/20 p-4">
                          <div>
                            <code className="font-mono text-sm text-accent">GET /api/agents</code>
                            <p className="mt-1 text-sm text-muted-foreground">List all agents</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-warning/5 to-warning-light/10 border border-warning/20 p-4">
                          <div>
                            <code className="font-mono text-sm text-warning">DELETE /api/agents/:id</code>
                            <p className="mt-1 text-sm text-muted-foreground">Delete an agent</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-warning" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border bg-card shadow-enhanced">
                    <CardHeader>
                      <CardTitle className="text-foreground">Tracing API</CardTitle>
                      <CardDescription className="text-muted-foreground">Monitor and track LLM performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-success/5 to-success-light/10 border border-success/20 p-4">
                          <div>
                            <code className="font-mono text-sm text-success">POST /api/traces</code>
                            <p className="mt-1 text-sm text-muted-foreground">Create a new trace</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-success" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent/5 to-accent-light/10 border border-accent/20 p-4">
                          <div>
                            <code className="font-mono text-sm text-accent">GET /api/traces</code>
                            <p className="mt-1 text-sm text-muted-foreground">Get traces with filters</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Support Section */}
              <section id="support" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-foreground">Need Help?</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card className="group transition-all duration-300 hover:shadow-enhanced border border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Community Support
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">Join our community for help and discussions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-light hover:to-accent-light transition-all duration-200">
                        Join Discord
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="group transition-all duration-300 hover:shadow-enhanced border border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Users className="h-5 w-5 text-success" />
                        Enterprise Support
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">Get priority support for your team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full border-success/20 text-success hover:bg-success/10 hover:border-success transition-all duration-200"
                      >
                        Contact Sales
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

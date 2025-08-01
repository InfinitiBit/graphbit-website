'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  BarChart,
  BarChart3 as Brain,
  Code,
  Globe,
  Menu,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const sidebarSections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '#introduction', icon: X },
      { label: 'Quick Start', href: '#quick-start', icon: ArrowRight },
      { label: 'Installation', href: '#installation', icon: ArrowRight },
      { label: 'Authentication', href: '#authentication', icon: Shield },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { label: 'AI Agents', href: '#ai-agents', icon: Brain },
      { label: 'LLM Tracing', href: '#llm-tracing', icon: BarChart },
      { label: 'Marketplace', href: '#marketplace', icon: Globe },
      { label: 'Workflows', href: '#workflows', icon: X },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Agent API', href: '#agent-api', icon: Code },
      { label: 'Tracing API', href: '#tracing-api', icon: X },
      { label: 'Webhooks', href: '#webhooks', icon: Zap },
      { label: 'SDKs', href: '#sdks', icon: Sparkles },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Examples', href: '#examples', icon: MessageSquare },
      { label: 'Community', href: '#community', icon: Users },
      { label: 'Support', href: '#support', icon: ArrowRight },
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
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm">
          <div className="container-responsive py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-2">
                    <X className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Documentation</h1>
                    <p className="hidden text-sm text-gray-600 sm:block">
                      Everything you need to build with GraphBit
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    className="w-64 rounded-lg border border-gray-200 bg-white/50 py-2 pl-10 pr-4 backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-80 transform border-r bg-white/90 backdrop-blur-sm transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}
          >
            <div className="space-y-6 p-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 font-semibold text-gray-900">{section.title}</h3>
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
                            ? 'bg-blue-50 font-medium text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                        {activeSection === item.href.slice(1) && (
                          <ArrowRight className="ml-auto h-4 w-4" />
                        )}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 lg:ml-0">
            <div className="container-responsive max-w-4xl py-8">
              {/* Introduction Section */}
              <section id="introduction" className="mb-16">
                <div className="mb-8">
                  <h1 className="mb-4 text-4xl font-bold text-gray-900">Welcome to GraphBit</h1>
                  <p className="text-xl leading-relaxed text-gray-600">
                    GraphBit is a powerful cloud platform for managing AI agents, tracking LLM
                    outputs, and scaling your AI applications with confidence.
                  </p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card className="group border-0 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 w-fit rounded-lg bg-blue-100 p-2">
                        <Brain className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">AI Agents</CardTitle>
                      <CardDescription>Deploy and manage AI agents at scale</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="group border-0 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 w-fit rounded-lg bg-purple-100 p-2">
                        <BarChart className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">LLM Tracing</CardTitle>
                      <CardDescription>Monitor and optimize model performance</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="group border-0 bg-gradient-to-br from-green-50 to-teal-50 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 w-fit rounded-lg bg-green-100 p-2">
                        <Globe className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">Marketplace</CardTitle>
                      <CardDescription>Discover and share AI solutions</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </section>

              {/* Quick Start Section */}
              <section id="quick-start" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Quick Start</h2>

                <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    Get started in minutes
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Create an account</h4>
                        <p className="text-gray-600">
                          Sign up for a free GraphBit account to get started
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Install the SDK</h4>
                        <p className="text-gray-600">
                          Install our SDK for your preferred programming language
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Start tracing</h4>
                        <p className="text-gray-600">
                          Add tracing to your LLM calls and monitor performance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="overflow-hidden rounded-xl bg-gray-900">
                  <div className="flex items-center justify-between border-b border-gray-700 px-6 py-3">
                    <div className="flex items-center gap-4">
                      <h4 className="font-medium text-white">Example Usage</h4>
                      <div className="flex items-center gap-1">
                        {Object.keys(codeExamples).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setActiveCodeTab(lang)}
                            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                              activeCodeTab === lang
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white'
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
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode ? <X className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="p-6">
                    <pre className="overflow-x-auto text-sm text-gray-300">
                      <code>{codeExamples[activeCodeTab as keyof typeof codeExamples]}</code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* Installation Section */}
              <section id="installation" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Installation</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Python
                      </CardTitle>
                      <CardDescription>Install via pip</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-gray-100 p-4">
                        <code className="text-sm">pip install graphbit</code>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        JavaScript
                      </CardTitle>
                      <CardDescription>Install via npm</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-gray-100 p-4">
                        <code className="text-sm">npm install @graphbit/sdk</code>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* API Reference Section */}
              <section id="agent-api" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">API Reference</h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Management</CardTitle>
                      <CardDescription>Create, deploy, and manage AI agents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                          <div>
                            <code className="font-mono text-sm">POST /api/agents</code>
                            <p className="mt-1 text-sm text-gray-600">Create a new agent</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                          <div>
                            <code className="font-mono text-sm">GET /api/agents</code>
                            <p className="mt-1 text-sm text-gray-600">List all agents</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                          <div>
                            <code className="font-mono text-sm">DELETE /api/agents/:id</code>
                            <p className="mt-1 text-sm text-gray-600">Delete an agent</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tracing API</CardTitle>
                      <CardDescription>Monitor and track LLM performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                          <div>
                            <code className="font-mono text-sm">POST /api/traces</code>
                            <p className="mt-1 text-sm text-gray-600">Create a new trace</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                          <div>
                            <code className="font-mono text-sm">GET /api/traces</code>
                            <p className="mt-1 text-sm text-gray-600">Get traces with filters</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Support Section */}
              <section id="support" className="mb-16">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Need Help?</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card className="group transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        Community Support
                      </CardTitle>
                      <CardDescription>Join our community for help and discussions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full transition-colors group-hover:bg-blue-700">
                        Join Discord
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="group transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        Enterprise Support
                      </CardTitle>
                      <CardDescription>Get priority support for your team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full transition-colors group-hover:border-green-600 group-hover:text-green-600"
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


'use client';

import { useState } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Book,
  ChevronRight,
  Search,
  Menu,
  X,
  Play,
  Code,
  Zap,
  BarChart3 as Brain,
  BarChart,
  Shield,
  Globe,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Layers,
  Settings,
  Users,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

const sidebarSections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '#introduction', icon: Book },
      { label: 'Quick Start', href: '#quick-start', icon: Play },
      { label: 'Installation', href: '#installation', icon: Settings },
      { label: 'Authentication', href: '#authentication', icon: Shield },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { label: 'AI Agents', href: '#ai-agents', icon: Brain },
      { label: 'LLM Tracing', href: '#llm-tracing', icon: BarChart },
      { label: 'Marketplace', href: '#marketplace', icon: Globe },
      { label: 'Workflows', href: '#workflows', icon: Layers },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Agent API', href: '#agent-api', icon: Code },
      { label: 'Tracing API', href: '#tracing-api', icon: FileText },
      { label: 'Webhooks', href: '#webhooks', icon: Zap },
      { label: 'SDKs', href: '#sdks', icon: Sparkles },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Examples', href: '#examples', icon: MessageSquare },
      { label: 'Community', href: '#community', icon: Users },
      { label: 'Support', href: '#support', icon: ExternalLink },
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
  }'`
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
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
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
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <Book className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Documentation</h1>
                    <p className="text-sm text-gray-600 hidden sm:block">Everything you need to build with GraphBit</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/90 backdrop-blur-sm border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
            <div className="p-6 space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-gray-900 mb-3">{section.title}</h3>
                  <nav className="space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setActiveSection(item.href.slice(1));
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          activeSection === item.href.slice(1)
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                        {activeSection === item.href.slice(1) && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
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
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 lg:ml-0">
            <div className="container-responsive py-8 max-w-4xl">
              
              {/* Introduction Section */}
              <section id="introduction" className="mb-16">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to GraphBit
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    GraphBit is a powerful cloud platform for managing AI agents, tracking LLM outputs, and scaling your AI applications with confidence.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardHeader>
                      <div className="p-2 bg-blue-100 rounded-lg w-fit mb-2">
                        <Brain className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">AI Agents</CardTitle>
                      <CardDescription>Deploy and manage AI agents at scale</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardHeader>
                      <div className="p-2 bg-purple-100 rounded-lg w-fit mb-2">
                        <BarChart className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">LLM Tracing</CardTitle>
                      <CardDescription>Monitor and optimize model performance</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-teal-50">
                    <CardHeader>
                      <div className="p-2 bg-green-100 rounded-lg w-fit mb-2">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
                
                <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Get started in minutes</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Create an account</h4>
                        <p className="text-gray-600">Sign up for a free GraphBit account to get started</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Install the SDK</h4>
                        <p className="text-gray-600">Install our SDK for your preferred programming language</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Start tracing</h4>
                        <p className="text-gray-600">Add tracing to your LLM calls and monitor performance</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="border-b border-gray-700 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h4 className="text-white font-medium">Example Usage</h4>
                      <div className="flex items-center gap-1">
                        {Object.keys(codeExamples).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setActiveCodeTab(lang)}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
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
                      onClick={() => copyToClipboard(codeExamples[activeCodeTab as keyof typeof codeExamples])}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="p-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>{codeExamples[activeCodeTab as keyof typeof codeExamples]}</code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* Installation Section */}
              <section id="installation" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Installation</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Python
                      </CardTitle>
                      <CardDescription>Install via pip</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 rounded-lg p-4">
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
                      <div className="bg-gray-100 rounded-lg p-4">
                        <code className="text-sm">npm install @graphbit/sdk</code>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* API Reference Section */}
              <section id="agent-api" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">API Reference</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Management</CardTitle>
                      <CardDescription>Create, deploy, and manage AI agents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <code className="text-sm font-mono">POST /api/agents</code>
                            <p className="text-sm text-gray-600 mt-1">Create a new agent</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <code className="text-sm font-mono">GET /api/agents</code>
                            <p className="text-sm text-gray-600 mt-1">List all agents</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <code className="text-sm font-mono">DELETE /api/agents/:id</code>
                            <p className="text-sm text-gray-600 mt-1">Delete an agent</p>
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
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <code className="text-sm font-mono">POST /api/traces</code>
                            <p className="text-sm text-gray-600 mt-1">Create a new trace</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <code className="text-sm font-mono">GET /api/traces</code>
                            <p className="text-sm text-gray-600 mt-1">Get traces with filters</p>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        Community Support
                      </CardTitle>
                      <CardDescription>Join our community for help and discussions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group-hover:bg-blue-700 transition-colors">
                        Join Discord
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        Enterprise Support
                      </CardTitle>
                      <CardDescription>Get priority support for your team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full group-hover:border-green-600 group-hover:text-green-600 transition-colors">
                        Contact Sales
                        <ExternalLink className="ml-2 h-4 w-4" />
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

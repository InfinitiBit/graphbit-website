'use client';

import { Navigation } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Code,
  DollarSign,
  Filter,
  Hash,
  RefreshCw,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

// Mock data for demonstration
const mockTraces = [
  {
    id: 'trace-1',
    agentName: 'ChatGPT Assistant',
    sessionId: 'session-123',
    input: 'Write a Python function to calculate factorial',
    output:
      "Here's a Python function to calculate factorial:\n\n```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n```",
    modelName: 'gpt-4',
    promptTokens: 28,
    completionTokens: 85,
    totalTokens: 113,
    latency: 1250,
    cost: 0.0056,
    status: 'success',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: 'trace-2',
    agentName: 'Code Analyzer',
    sessionId: 'session-124',
    input: 'Analyze this code for potential bugs: function divide(a, b) { return a / b; }',
    output:
      "Analysis complete. Found 1 potential issue:\n\n1. Division by zero: The function doesn't check if 'b' is zero, which would result in Infinity or -Infinity.",
    modelName: 'gpt-3.5-turbo',
    promptTokens: 42,
    completionTokens: 68,
    totalTokens: 110,
    latency: 890,
    cost: 0.0022,
    status: 'success',
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: 'trace-3',
    agentName: 'Content Generator',
    sessionId: 'session-125',
    input: 'Generate a product description for eco-friendly water bottle',
    output: 'Error: Rate limit exceeded. Please try again later.',
    modelName: 'gpt-4',
    promptTokens: 18,
    completionTokens: 0,
    totalTokens: 18,
    latency: 450,
    cost: 0.0009,
    status: 'error',
    error: 'Rate limit exceeded',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
];

const mockStats = {
  totalCalls: 1548,
  successRate: 94.2,
  avgLatency: 1120,
  totalCost: 28.45,
  totalTokens: 156789,
  activeAgents: 12,
};

const statCards = [
  {
    title: 'Total Calls',
    value: mockStats.totalCalls.toLocaleString(),
    change: '+12%',
    icon: BarChart3,
    color: 'text-blue-600',
    bgGradient: 'from-blue-500/10 to-blue-600/10',
    trend: 'up',
  },
  {
    title: 'Success Rate',
    value: `${mockStats.successRate}%`,
    change: 'Healthy',
    icon: CheckCircle,
    color: 'text-green-600',
    bgGradient: 'from-green-500/10 to-green-600/10',
    trend: 'up',
  },
  {
    title: 'Avg Latency',
    value: `${mockStats.avgLatency}ms`,
    change: '-5%',
    icon: Clock,
    color: 'text-orange-600',
    bgGradient: 'from-orange-500/10 to-orange-600/10',
    trend: 'down',
  },
  {
    title: 'Total Cost',
    value: `$${mockStats.totalCost}`,
    change: 'This month',
    icon: DollarSign,
    color: 'text-purple-600',
    bgGradient: 'from-purple-500/10 to-purple-600/10',
    trend: 'neutral',
  },
  {
    title: 'Total Tokens',
    value: `${(mockStats.totalTokens / 1000).toFixed(1)}K`,
    change: 'Used today',
    icon: Hash,
    color: 'text-indigo-600',
    bgGradient: 'from-indigo-500/10 to-indigo-600/10',
    trend: 'neutral',
  },
  {
    title: 'Active Agents',
    value: mockStats.activeAgents.toString(),
    change: 'Running now',
    icon: Activity,
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-500/10 to-emerald-600/10',
    trend: 'neutral',
  },
];

export default function TracingPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTraces = mockTraces.filter((trace) => {
    if (selectedStatus === 'all') return true;
    return trace.status === selectedStatus;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-16 sm:pt-20">
        {/* Enhanced Hero Header */}
        <div className="relative overflow-hidden border-b bg-gradient-to-r from-white via-gray-50 to-blue-50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
          <div className="container-responsive relative py-12 sm:py-16 lg:py-20">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-900/10 px-4 py-2 text-sm font-medium text-gray-800 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Real-time monitoring</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                LLM{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Tracing
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 sm:text-xl">
                Monitor and analyze your agent outputs and performance with comprehensive
                observability tools.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="container-responsive py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat, index) => (
              <Card
                key={stat.title}
                className="group relative overflow-hidden border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <CardHeader className="relative pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardDescription>
                    <div className={`rounded-lg p-2 ${stat.bgGradient}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="mb-2 text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {stat.trend === 'down' && (
                      <TrendingUp className="h-3 w-3 rotate-180 text-red-500" />
                    )}
                    {stat.trend === 'neutral' && <Activity className="h-3 w-3" />}
                    <span>{stat.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="container-responsive pb-8">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {['1h', '24h', '7d', '30d'].map((range) => (
                    <Button
                      key={range}
                      variant={selectedTimeRange === range ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTimeRange(range)}
                      className="touch-target-sm rounded-full"
                    >
                      <span className="hidden sm:inline">Last </span>
                      {range}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="touch-target w-full gap-2 rounded-full lg:w-auto"
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  <span className="sm:hidden">Filter</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  />
                </Button>
              </div>

              {showFilters && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
                  {[
                    { key: 'all', label: 'All Status', icon: Activity },
                    { key: 'success', label: 'Success', icon: CheckCircle },
                    { key: 'error', label: 'Error', icon: AlertCircle },
                    { key: 'pending', label: 'Pending', icon: RefreshCw },
                  ].map((filter) => (
                    <Button
                      key={filter.key}
                      variant={selectedStatus === filter.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStatus(filter.key)}
                      className="touch-target-sm gap-1 rounded-full"
                    >
                      <filter.icon className="h-3 w-3" />
                      <span className="hidden xs:inline">{filter.label}</span>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Traces List */}
        <div className="container-responsive pb-12">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Recent Traces</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Detailed logs of all LLM interactions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredTraces.map((trace, index) => (
                  <div
                    key={trace.id}
                    className="group rounded-xl border border-gray-100 bg-white/50 p-6 transition-all duration-300 hover:bg-white/80 hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <h4 className="truncate text-lg font-semibold text-gray-900">
                            {trace.agentName}
                          </h4>
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {trace.modelName}
                          </span>
                          {trace.status === 'success' ? (
                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                          ) : trace.status === 'error' ? (
                            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                          ) : (
                            <RefreshCw className="h-5 w-5 flex-shrink-0 animate-spin text-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(trace.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg bg-gray-50 p-4">
                          <span className="mb-2 block text-sm font-semibold text-gray-900">
                            Input:
                          </span>
                          <p className="text-sm leading-relaxed text-gray-700">{trace.input}</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <span className="mb-2 block text-sm font-semibold text-gray-900">
                            Output:
                          </span>
                          <p className="line-clamp-3 text-sm leading-relaxed text-gray-700">
                            {trace.output}
                          </p>
                        </div>
                        {trace.error && (
                          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <span className="mb-2 block text-sm font-semibold text-red-700">
                              Error:
                            </span>
                            <p className="text-sm text-red-600">{trace.error}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{trace.latency}ms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          <span>{trace.totalTokens} tokens</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>${trace.cost.toFixed(4)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Session: {trace.sessionId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTraces.length === 0 && (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-4">
                    <Activity className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No traces found</h3>
                  <p className="text-sm text-gray-600">
                    No traces match your current filter criteria.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

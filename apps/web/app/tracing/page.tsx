"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Filter,
  Calendar,
  ChevronDown,
  Hash,
} from "lucide-react";

// Mock data for demonstration
const mockTraces = [
  {
    id: "trace-1",
    agentName: "ChatGPT Assistant",
    sessionId: "session-123",
    input: "Write a Python function to calculate factorial",
    output: "Here's a Python function to calculate factorial:\n\n```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n```",
    modelName: "gpt-4",  // Changed from model to modelName
    promptTokens: 28,
    completionTokens: 85,
    totalTokens: 113,
    latency: 1250,
    cost: 0.0056,
    status: "success",
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "trace-2",
    agentName: "Code Analyzer",
    sessionId: "session-124",
    input: "Analyze this code for potential bugs: function divide(a, b) { return a / b; }",
    output: "Analysis complete. Found 1 potential issue:\n\n1. Division by zero: The function doesn't check if 'b' is zero, which would result in Infinity or -Infinity.",
    modelName: "gpt-3.5-turbo",  // Changed from model to modelName
    promptTokens: 42,
    completionTokens: 68,
    totalTokens: 110,
    latency: 890,
    cost: 0.0022,
    status: "success",
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "trace-3",
    agentName: "Content Generator",
    sessionId: "session-125",
    input: "Generate a product description for eco-friendly water bottle",
    output: "Error: Rate limit exceeded. Please try again later.",
    modelName: "gpt-4",  // Changed from model to modelName
    promptTokens: 18,
    completionTokens: 0,
    totalTokens: 18,
    latency: 450,
    cost: 0.0009,
    status: "error",
    error: "Rate limit exceeded",
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

export default function TracingPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTraces = mockTraces.filter((trace) => {
    if (selectedStatus === "all") return true;
    return trace.status === selectedStatus;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-white/50 backdrop-blur-sm">
          <div className="container-responsive responsive-py">
                    <h1 className="responsive-text-2xl font-bold text-balance">LLM Tracing</h1>
        <p className="mt-2 text-muted-foreground responsive-text-sm">
              Monitor and analyze your agent outputs and performance
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="container-responsive py-6 sm:py-8">
          <div className="grid-responsive-6 responsive-gap">
            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Total Calls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">{mockStats.totalCalls.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Success Rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">{mockStats.successRate}%</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Healthy
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Avg Latency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">{mockStats.avgLatency}ms</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  -5% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Total Cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">${mockStats.totalCost}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <DollarSign className="h-3 w-3" />
                  This month
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Total Tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">{(mockStats.totalTokens / 1000).toFixed(1)}K</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Hash className="h-3 w-3" />
                  Used today
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Active Agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">{mockStats.activeAgents}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Activity className="h-3 w-3" />
                  Running now
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="container-responsive pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTimeRange === "1h" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange("1h")}
                className="touch-target-sm"
              >
                <span className="hidden sm:inline">Last </span>1h
              </Button>
              <Button
                variant={selectedTimeRange === "24h" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange("24h")}
                className="touch-target-sm"
              >
                <span className="hidden sm:inline">Last </span>24h
              </Button>
              <Button
                variant={selectedTimeRange === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange("7d")}
                className="touch-target-sm"
              >
                <span className="hidden sm:inline">Last </span>7d
              </Button>
              <Button
                variant={selectedTimeRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange("30d")}
                className="touch-target-sm"
              >
                <span className="hidden sm:inline">Last </span>30d
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 touch-target w-full lg:w-auto"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              <span className="sm:hidden">Filter</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
                className="touch-target-sm"
              >
                All Status
              </Button>
              <Button
                variant={selectedStatus === "success" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("success")}
                className="gap-1 touch-target-sm"
              >
                <CheckCircle className="h-3 w-3" />
                <span className="hidden xs:inline">Success</span>
                <span className="xs:hidden">✓</span>
              </Button>
              <Button
                variant={selectedStatus === "error" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("error")}
                className="gap-1 touch-target-sm"
              >
                <AlertCircle className="h-3 w-3" />
                <span className="hidden xs:inline">Error</span>
                <span className="xs:hidden">✗</span>
              </Button>
              <Button
                variant={selectedStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("pending")}
                className="gap-1 touch-target-sm"
              >
                <RefreshCw className="h-3 w-3" />
                <span className="hidden xs:inline">Pending</span>
                <span className="xs:hidden">⟳</span>
              </Button>
            </div>
          )}
        </div>

        {/* Traces List */}
        <div className="container-responsive pb-8 sm:pb-12">
          <Card className="border-subtle bg-white/90 backdrop-blur-sm">
            <CardHeader>
                          <CardTitle className="responsive-text-base">Recent Traces</CardTitle>
            <CardDescription className="responsive-text-xs">
                Detailed logs of all LLM interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTraces.map((trace) => (
                  <div
                    key={trace.id}
                    className="rounded-lg border border-gray-100 p-4 sm:p-6 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <h4 className="font-semibold responsive-text-sm truncate">{trace.agentName}</h4>
                          <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                            {trace.modelName}
                          </span>
                          {trace.status === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : trace.status === "error" ? (
                            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                          ) : (
                            <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin flex-shrink-0" />
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                                                  <span className="font-medium responsive-text-xs text-foreground">Input:</span>
                        <p className="responsive-text-xs text-muted-foreground mt-1 bg-gray-50 p-3 rounded border">
                            {trace.input}
                          </p>
                        </div>
                        <div>
                                                  <span className="font-medium responsive-text-xs text-foreground">Output:</span>
                        <p className="responsive-text-xs text-muted-foreground mt-1 bg-gray-50 p-3 rounded border line-clamp-3">
                            {trace.output}
                          </p>
                        </div>
                        {trace.error && (
                          <div>
                                                    <span className="font-medium responsive-text-xs text-red-600">Error:</span>
                        <p className="responsive-text-xs text-red-500 mt-1 bg-red-50 p-3 rounded border">
                              {trace.error}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t pt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {trace.latency}ms
                        </div>
                        <div className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {trace.totalTokens} tokens
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          ${trace.cost.toFixed(4)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="hidden sm:inline">{new Date(trace.createdAt).toLocaleString()}</span>
                          <span className="sm:hidden">{new Date(trace.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredTraces.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <Activity className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                              <h3 className="responsive-text-base font-semibold text-foreground mb-2">No traces found</h3>
            <p className="responsive-text-xs text-muted-foreground">
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
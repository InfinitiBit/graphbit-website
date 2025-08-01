'use client';

import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
  Activity,
  AlertCircle,
  BarChart3,
  CheckCircle,
  Clock,
  BarChart3 as Database,
  Plus,
  Users,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardStats {
  totalAgents: number;
  activeTraces: number;
  totalRequests: number;
  avgResponseTime: number;
  successRate: number;
  errorRate: number;
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [stats] = useState<DashboardStats>({
    totalAgents: 12,
    activeTraces: 147,
    totalRequests: 2847,
    avgResponseTime: 245,
    successRate: 98.2,
    errorRate: 1.8,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'success',
      message: 'Agent "CustomerSupport" completed successfully',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'warning',
      message: 'High latency detected on "DataProcessor"',
      time: '5 minutes ago',
    },
    { id: 3, type: 'success', message: 'New agent "SalesBot" deployed', time: '15 minutes ago' },
    {
      id: 4,
      type: 'error',
      message: 'Agent "ReportGenerator" failed with timeout',
      time: '23 minutes ago',
    },
  ]);

  // Handle authentication redirect
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while Clerk is loading or redirecting
  if (!isLoaded || (isLoaded && !isSignedIn)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-16 sm:pt-20">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container-responsive py-6 sm:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                  Dashboard
                </h1>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Monitor your AI agents and system performance
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="sm:inline">Settings</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-responsive py-6 sm:py-8 lg:py-12">
          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-6">
            <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Agents</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">{stats.totalAgents}</div>
                <p className="mt-1 text-xs text-green-600">+2 this week</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Traces</CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">{stats.activeTraces}</div>
                <p className="mt-1 text-xs text-blue-600">Real-time</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Requests
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalRequests.toLocaleString()}
                </div>
                <p className="mt-1 text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Avg Response Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}ms</div>
                <p className="mt-1 text-xs text-green-600">-15ms from yesterday</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">{stats.successRate}%</div>
                <p className="mt-1 text-xs text-green-600">+0.3% this week</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Error Rate</CardTitle>
                  <X className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">{stats.errorRate}%</div>
                <p className="mt-1 text-xs text-red-600">-0.3% this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 rounded-lg bg-gray-50/50 p-3 transition-colors hover:bg-gray-100/50"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {activity.type === 'success' && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          {activity.type === 'warning' && (
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          )}
                          {activity.type === 'error' && <X className="h-4 w-4 text-red-600" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-5 text-gray-900">
                            {activity.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Deploy New Agent
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Activity className="mr-2 h-4 w-4" />
                    View Live Traces
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Database className="mr-2 h-4 w-4" />
                    Manage Data Sources
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Status</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cache</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium text-yellow-600">Degraded</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
      </main>
    </>
  );
}

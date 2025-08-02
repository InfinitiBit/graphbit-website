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
      <main className="min-h-screen w-full bg-gradient-to-br from-background via-white to-warning/5 pt-16 sm:pt-20">
        {/* Header */}
        <div className="border-b border-warning/20 bg-gradient-to-r from-background/95 to-warning/5 backdrop-blur-sm">
          <div className="container-responsive py-6 sm:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                  Dashboard
                </h1>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
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
            <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Agents</CardTitle>
                  <Users className="h-4 w-4 text-warning" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">{stats.totalAgents}</div>
                <p className="mt-1 text-xs text-warning">+2 this week</p>
              </CardContent>
            </Card>

            <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Traces</CardTitle>
                  <Activity className="h-4 w-4 text-warning animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">{stats.activeTraces}</div>
                <p className="mt-1 text-xs text-warning">Real-time</p>
              </CardContent>
            </Card>

            <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Requests
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-destructive" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">
                  {stats.totalRequests.toLocaleString()}
                </div>
                <p className="mt-1 text-xs text-warning">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Response Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-warning" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">{stats.avgResponseTime}ms</div>
                <p className="mt-1 text-xs text-warning">-15ms from yesterday</p>
              </CardContent>
            </Card>

            <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-warning" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">{stats.successRate}%</div>
                <p className="mt-1 text-xs text-warning">+0.3% this week</p>
              </CardContent>
            </Card>

            <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Error Rate</CardTitle>
                  <X className="h-4 w-4 text-destructive" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">{stats.errorRate}%</div>
                <p className="mt-1 text-xs text-destructive">-0.3% this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
                    <Button variant="outline" size="sm" className="border-warning/20 hover:bg-warning/10">
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
                        className="flex items-start gap-3 rounded-lg bg-warning/5 border border-warning/10 p-3 transition-colors hover:bg-warning/10"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {activity.type === 'success' && (
                            <CheckCircle className="h-4 w-4 text-warning" />
                          )}
                          {activity.type === 'warning' && (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                          {activity.type === 'error' && <X className="h-4 w-4 text-destructive" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-5 text-foreground">
                            {activity.message}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-warning/20 hover:bg-warning/10 hover:border-warning/30" size="sm">
                    <Plus className="mr-2 h-4 w-4 text-warning" />
                    Deploy New Agent
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-warning/20 hover:bg-warning/10 hover:border-warning/30" size="sm">
                    <Activity className="mr-2 h-4 w-4 text-warning" />
                    View Live Traces
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-warning/20 hover:bg-warning/10 hover:border-warning/30" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4 text-warning" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-warning/20 hover:bg-warning/10 hover:border-warning/30" size="sm">
                    <Database className="mr-2 h-4 w-4 text-warning" />
                    Manage Data Sources
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-warning/20 bg-gradient-to-br from-background/95 to-warning/5 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">API Status</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-warning animate-pulse"></div>
                      <span className="text-sm font-medium text-warning">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-warning animate-pulse"></div>
                      <span className="text-sm font-medium text-warning">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cache</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-destructive animate-pulse"></div>
                      <span className="text-sm font-medium text-destructive">Degraded</span>
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

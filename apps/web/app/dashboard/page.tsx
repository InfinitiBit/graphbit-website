"use client";

import { Navigation } from "@/components/layout/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  BarChart3,
  Download,
  Star,
  Activity,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockUserAgents = [
  {
    id: "1",
    name: "My Custom Bot",
    downloads: 234,
    rating: 4.7,
    status: "published",
  },
  {
    id: "2",
    name: "Analytics Agent",
    downloads: 156,
    rating: 4.5,
    status: "draft",
  },
];

const mockRecentActivity = [
  {
    id: "1",
    type: "trace",
    message: "ChatGPT Assistant processed 45 requests",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "download",
    message: "Code Analyzer was downloaded 12 times",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "rating",
    message: "Content Generator received a 5-star rating",
    time: "1 day ago",
  },
];

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-white/50 backdrop-blur-sm">
          <div className="container-responsive responsive-py">
                    <h1 className="responsive-text-2xl font-bold text-balance">Welcome back, Developer!</h1>
        <p className="mt-2 text-muted-foreground responsive-text-sm">
              Manage your agents and monitor their performance
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="container-responsive py-6 sm:py-8">
          <div className="grid-responsive-4 responsive-gap">
            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Total Agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 published</p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Total Downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+23% this month</p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">API Calls Today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">$2.34 cost</p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-subtle">
              <CardHeader className="pb-2">
                <CardDescription className="responsive-text-xs">Average Rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="responsive-text-2xl font-bold flex items-center gap-1">
                  4.6 <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-500 text-yellow-500" />
                </div>
                <p className="text-xs text-muted-foreground">from 89 reviews</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="container-responsive grid gap-6 sm:gap-8 pb-8 lg:grid-cols-2">
          {/* My Agents */}
          <Card className="border-subtle bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                              <CardTitle className="responsive-text-base">My Agents</CardTitle>
            <CardDescription className="responsive-text-xs">Agents you&apos;ve created</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="gap-2 touch-target-sm w-full sm:w-auto">
                  <Plus className="h-4 w-4" />
                  New Agent
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-gray-100 p-4 gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                                          <h4 className="font-semibold responsive-text-sm truncate">{agent.name}</h4>
                    <div className="mt-2 flex items-center gap-4 responsive-text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {agent.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {agent.rating}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          agent.status === "published" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-gray-50 text-gray-700"
                        }`}>
                          {agent.status}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="touch-target-sm w-full sm:w-auto">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
              <Link href="/marketplace" className="mt-4 block">
                <Button variant="link" className="w-full gap-2 touch-target justify-center sm:justify-start">
                  View all agents
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-subtle bg-white/90 backdrop-blur-sm">
            <CardHeader>
                          <CardTitle className="responsive-text-base">Recent Activity</CardTitle>
            <CardDescription className="responsive-text-xs">Latest updates from your agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 flex-shrink-0">
                      {activity.type === "trace" ? (
                        <Activity className="h-4 w-4 text-primary" />
                      ) : activity.type === "download" ? (
                        <Download className="h-4 w-4 text-primary" />
                      ) : (
                        <Star className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="responsive-text-xs text-foreground leading-relaxed">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/tracing" className="mt-4 block">
                <Button variant="link" className="w-full gap-2 touch-target justify-center sm:justify-start">
                  View all activity
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="container-responsive pb-8 sm:pb-12">
          <Card className="glass-effect border-subtle">
            <CardContent className="py-8 sm:py-12 text-center">
                        <h3 className="responsive-text-xl font-bold text-balance">Ready to build something amazing?</h3>
          <p className="mt-3 sm:mt-4 text-muted-foreground responsive-text-sm text-balance max-w-2xl mx-auto">
                Explore our marketplace or start tracking your LLM outputs
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center responsive-gap">
                <Link href="/marketplace">
                  <Button size="lg" className="gap-2 touch-target w-full sm:w-auto">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                    Browse Marketplace
                  </Button>
                </Link>
                <Link href="/tracing">
                  <Button variant="outline" size="lg" className="gap-2 touch-target w-full sm:w-auto">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                    View Tracing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
} 
'use client';

import { AgentDetailModal } from '@/components/marketplace/agent-detail-modal';
import { Navigation } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useStore, { Agent } from '@/lib/store/useStore';
import {
  ArrowRight,
  BarChart,
  BarChart3 as Brain,
  ChevronDown,
  Clock,
  Download,
  Filter,
  Globe,
  MessageSquare,
  Package,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const categories = [
  { value: 'all', label: 'All Categories', icon: Globe, color: 'from-blue-500 to-purple-500' },
  { value: 'chatbot', label: 'Chatbots', icon: MessageSquare, color: 'from-green-500 to-teal-500' },
  { value: 'analyzer', label: 'Analyzers', icon: BarChart, color: 'from-orange-500 to-red-500' },
  { value: 'generator', label: 'Generators', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { value: 'translator', label: 'Translators', icon: Globe, color: 'from-indigo-500 to-blue-500' },
  {
    value: 'classifier',
    label: 'Classifiers',
    icon: Filter,
    color: 'from-yellow-500 to-orange-500',
  },
];

const featuredStats = [
  { icon: Package, label: 'Active Agents', value: '2,400+', color: 'text-blue-600' },
  { icon: Users, label: 'Developers', value: '12K+', color: 'text-green-600' },
  { icon: Download, label: 'Downloads', value: '50K+', color: 'text-purple-600' },
  { icon: TrendingUp, label: 'Growth', value: '+25%', color: 'text-orange-600' },
];

export default function MarketplacePage() {
  const {
    agents,
    agentSearchQuery,
    agentCategory,
    isLoadingAgents,
    selectedAgent,
    setAgentSearchQuery,
    setAgentCategory,
    setSelectedAgent,
    fetchAgents,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showFilters = agentCategory !== 'all' || agentSearchQuery !== '';

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentCategory, agentSearchQuery]);

  const openAgentModal = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const closeAgentModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };

  return (
    <>
      <Navigation />
      <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-16 sm:pt-20">
        {/* Enhanced Hero Header */}
        <div className="relative overflow-hidden border-b bg-gradient-to-r from-white via-gray-50 to-blue-50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
          <div className="container-responsive relative py-16 sm:py-20 lg:py-24">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/20 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>New agents added weekly</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                AI Agent{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Marketplace
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground sm:text-xl">
                Discover, deploy, and scale production-ready AI agents. Built by developers, for
                developers.
              </p>

              {/* Stats Grid */}
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
                {featuredStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-card/80 hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <stat.icon
                        className={`h-5 w-5 ${stat.color} transition-transform group-hover:scale-110`}
                      />
                      <div className="text-left">
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="container-responsive py-8 sm:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl bg-card/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for AI agents, frameworks, or use cases..."
                    value={agentSearchQuery}
                    onChange={(e) => setAgentSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border-2 border-border bg-background py-4 pl-12 pr-4 text-lg text-foreground transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setAgentCategory(agentCategory === 'all' ? 'chatbot' : 'all')}
                  className="group gap-3 rounded-2xl border-2 px-6 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <Filter className="h-5 w-5" />
                  Filters
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
                  />
                </Button>
              </div>

              {/* Enhanced Category Filters */}
              <div className="mt-6 flex flex-wrap gap-3">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const isActive = agentCategory === category.value;
                  return (
                    <Button
                      key={category.value}
                      variant={isActive ? 'default' : 'outline'}
                      onClick={() => setAgentCategory(category.value)}
                      className={`group relative overflow-hidden rounded-2xl px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'border-2 bg-card hover:shadow-md'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span className="hidden sm:inline">{category.label}</span>
                        <span className="sm:hidden">
                          {category.value === 'all' ? 'All' : category.label.split('s')[0]}
                        </span>
                      </span>
                      {!isActive && (
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                        />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Agents Grid */}
        <div className="container-responsive pb-16 sm:pb-20">
          {isLoadingAgents ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card
                  key={i}
                  className="animate-pulse overflow-hidden rounded-3xl border-0 shadow-xl"
                >
                  <CardHeader className="p-6">
                    <div className="h-6 w-3/4 rounded-xl bg-muted"></div>
                    <div className="mt-3 h-4 w-1/2 rounded-lg bg-muted"></div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                      <div className="h-4 w-full rounded-lg bg-muted"></div>
                      <div className="h-4 w-5/6 rounded-lg bg-muted"></div>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <div className="h-6 w-16 rounded-full bg-muted"></div>
                      <div className="h-6 w-20 rounded-full bg-muted"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent, index) => (
                <Card
                  key={agent.id}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border-0 bg-card/90 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openAgentModal(agent)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                  <CardHeader className="relative p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="truncate text-xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-blue-400">
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          by {agent.author} • v{agent.version}
                        </CardDescription>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative p-6 pt-0">
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {agent.description}
                    </p>

                    {/* Enhanced Tags */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {agent.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20"
                          style={{ animationDelay: `${tagIndex * 100}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                      {agent.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          +{agent.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Enhanced Stats and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{agent.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-medium">{agent.rating}</span>
                          <span className="text-xs">({agent.reviews})</span>
                        </div>
                      </div>
                      <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <span className="relative z-10 flex items-center gap-2">
                          Install
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span>Verified</span>
                      <Clock className="ml-2 h-3 w-3" />
                      <span>Updated 2 days ago</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Enhanced Empty State */}
          {!isLoadingAgents && agents.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-muted to-muted/80">
                  <Package className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-foreground">No agents found</h3>
                <p className="mb-8 text-muted-foreground">
                  No agents match your current search criteria. Try adjusting your filters or search
                  terms.
                </p>
                <Button
                  onClick={() => {
                    setAgentSearchQuery('');
                    setAgentCategory('all');
                  }}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    Clear all filters
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} isOpen={isModalOpen} onClose={closeAgentModal} />
      )}
    </>
  );
}

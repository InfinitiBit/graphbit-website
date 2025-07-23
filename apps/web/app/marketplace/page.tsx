'use client';

import { useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useStore from '@/lib/store/useStore';
import {
  Download,
  Star,
  Search,
  Filter,
  Code,
  MessageSquare,
  BarChart,
  Globe,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Categories', icon: Globe },
  { value: 'chatbot', label: 'Chatbots', icon: MessageSquare },
  { value: 'analyzer', label: 'Analyzers', icon: BarChart },
  { value: 'generator', label: 'Generators', icon: Sparkles },
  { value: 'translator', label: 'Translators', icon: Globe },
  { value: 'classifier', label: 'Classifiers', icon: Filter },
];

export default function MarketplacePage() {
  const {
    agents,
    agentSearchQuery,
    agentCategory,
    isLoadingAgents,
    setAgentSearchQuery,
    setAgentCategory,
    fetchAgents,
  } = useStore();

  const showFilters = agentCategory !== 'all' || agentSearchQuery !== '';

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentCategory, agentSearchQuery]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-white/50 backdrop-blur-sm">
          <div className="container-responsive responsive-py">
            <h1 className="responsive-text-2xl text-balance font-bold">Agent Marketplace</h1>
            <p className="responsive-text-sm mt-2 text-muted-foreground">
              Discover and download pre-built AI agents for your applications
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="container-responsive py-4 sm:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-2xl flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search agents..."
                value={agentSearchQuery}
                onChange={(e) => setAgentSearchQuery(e.target.value)}
                className="responsive-text-base touch-target-sm w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring sm:py-3"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setAgentCategory(agentCategory === 'all' ? 'chatbot' : 'all')}
              className="touch-target w-full gap-2 lg:w-auto"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              <span className="sm:hidden">Filter</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={agentCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAgentCategory(category.value)}
                  className="touch-target-sm gap-2"
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{category.label}</span>
                  <span className="xs:hidden">
                    {category.value === 'all' ? 'All' : category.label.split('s')[0]}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="container-responsive pb-8 sm:pb-12">
          {isLoadingAgents ? (
            <div className="grid-responsive-3 responsive-gap">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-subtle animate-pulse">
                  <CardHeader>
                    <div className="h-5 w-3/4 rounded bg-gray-200 sm:h-6"></div>
                    <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 sm:h-4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 w-full rounded bg-gray-200 sm:h-4"></div>
                    <div className="mt-2 h-3 w-5/6 rounded bg-gray-200 sm:h-4"></div>
                    <div className="mt-4 flex gap-2">
                      <div className="h-5 w-16 rounded-full bg-gray-200"></div>
                      <div className="h-5 w-12 rounded-full bg-gray-200"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid-responsive-3 responsive-gap">
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="border-subtle hover-lift group bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="responsive-text-base truncate leading-tight">
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="responsive-text-xs mt-1">
                          by {agent.author} • v{agent.version}
                        </CardDescription>
                      </div>
                      <Code className="h-6 w-6 flex-shrink-0 text-muted-foreground sm:h-8 sm:w-8" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="responsive-text-xs line-clamp-3 leading-relaxed text-muted-foreground">
                      {agent.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {agent.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                      {agent.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          +{agent.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col justify-between gap-3 xs:flex-row xs:items-center">
                      <div className="responsive-text-xs flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{agent.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 sm:h-4 sm:w-4" />
                          <span>{agent.rating}</span>
                          <span className="hidden sm:inline">({agent.reviews})</span>
                        </div>
                      </div>
                      <Button size="sm" className="touch-target-sm w-full xs:w-auto">
                        Install
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoadingAgents && agents.length === 0 && (
            <div className="py-12 text-center sm:py-16">
              <div className="mx-auto max-w-md">
                <Code className="mx-auto mb-4 h-12 w-12 text-muted-foreground sm:h-16 sm:w-16" />
                <h3 className="responsive-text-base mb-2 font-semibold text-foreground">
                  No agents found
                </h3>
                <p className="responsive-text-xs text-muted-foreground">
                  No agents match your current search criteria. Try adjusting your filters or search
                  terms.
                </p>
                <Button
                  variant="outline"
                  className="touch-target mt-4"
                  onClick={() => {
                    setAgentSearchQuery('');
                    setAgentCategory('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

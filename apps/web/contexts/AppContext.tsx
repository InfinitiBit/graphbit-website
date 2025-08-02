'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  author: string;
  authorId: string;
  downloads: number;
  rating: number;
  reviews: number;
  tags: string[];
  repositoryUrl?: string;
  documentationUrl?: string;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Extended properties for detailed view
  longDescription?: string;
  instructions?: string;
  settings?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    systemPrompt?: string;
    [key: string]: unknown;
  };
  models?: {
    primary: string;
    fallback?: string[];
    supportedModels: string[];
  };
  knowledge?: {
    domains: string[];
    dataSources: string[];
    lastUpdated: Date;
    expertise: string[];
  };
  capabilities?: string[];
  limitations?: string[];
  useCases?: string[];
  pricing?: {
    tier: 'free' | 'premium' | 'enterprise';
    costPerCall?: number;
    monthlyPrice?: number;
  };
  performance?: {
    avgResponseTime: number;
    uptime: number;
    successRate: number;
  };
}

interface Trace {
  id: string;
  userId: string;
  agentId: string;
  agentName: string;
  sessionId: string;
  input: string;
  output: string;
  modelName: string; // Changed from model to modelName
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  latency: number;
  cost: number;
  status: 'success' | 'error' | 'pending';
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Stats {
  totalCalls: number;
  successRate: number;
  avgLatency: number;
  totalCost: number;
  totalTokens: number;
  activeAgents: number;
}

interface AppContextType {
  // Agent marketplace
  agents: Agent[];
  selectedAgent: Agent | null;
  agentSearchQuery: string;
  agentCategory: string;
  isLoadingAgents: boolean;

  // Traces
  traces: Trace[];
  traceStats: Stats | null;
  selectedTimeRange: string;
  selectedTraceStatus: string;
  isLoadingTraces: boolean;

  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';

  // Actions - Agents
  setAgents: (agents: Agent[]) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  setAgentSearchQuery: (query: string) => void;
  setAgentCategory: (category: string) => void;
  setIsLoadingAgents: (loading: boolean) => void;
  fetchAgents: () => Promise<void>;

  // Actions - Traces
  setTraces: (traces: Trace[]) => void;
  setTraceStats: (stats: Stats | null) => void;
  setSelectedTimeRange: (range: string) => void;
  setSelectedTraceStatus: (status: string) => void;
  setIsLoadingTraces: (loading: boolean) => void;
  fetchTraces: () => Promise<void>;
  createTrace: (trace: Omit<Trace, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;

  // Actions - UI
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Agent marketplace state
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentSearchQuery, setAgentSearchQuery] = useState('');
  const [agentCategory, setAgentCategory] = useState('all');
  const [isLoadingAgents, setIsLoadingAgents] = useState(false);

  // Traces state
  const [traces, setTraces] = useState<Trace[]>([]);
  const [traceStats, setTraceStats] = useState<Stats | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedTraceStatus, setSelectedTraceStatus] = useState('all');
  const [isLoadingTraces, setIsLoadingTraces] = useState(false);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const fetchAgents = async () => {
    setIsLoadingAgents(true);

    try {
      const params = new URLSearchParams();
      if (agentCategory && agentCategory !== 'all') {
        params.append('category', agentCategory);
      }
      if (agentSearchQuery) {
        params.append('search', agentSearchQuery);
      }

      const response = await fetch(`/api/agents?${params}`);
      const data = await response.json();

      if (response.ok) {
        setAgents(data.agents);
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setIsLoadingAgents(false);
    }
  };

  const fetchTraces = async () => {
    setIsLoadingTraces(true);

    try {
      const params = new URLSearchParams();
      if (selectedTraceStatus && selectedTraceStatus !== 'all') {
        params.append('status', selectedTraceStatus);
      }

      const response = await fetch(`/api/traces?${params}`);
      const data = await response.json();

      if (response.ok) {
        setTraces(data.traces);
        setTraceStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch traces:', error);
    } finally {
      setIsLoadingTraces(false);
    }
  };

  const createTrace = async (trace: Omit<Trace, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/traces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trace),
      });

      if (response.ok) {
        // Refresh traces after creating
        await fetchTraces();
      }
    } catch (error) {
      console.error('Failed to create trace:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        // Agent marketplace
        agents,
        selectedAgent,
        agentSearchQuery,
        agentCategory,
        isLoadingAgents,

        // Traces
        traces,
        traceStats,
        selectedTimeRange,
        selectedTraceStatus,
        isLoadingTraces,

        // UI State
        sidebarOpen,
        theme,

        // Actions - Agents
        setAgents,
        setSelectedAgent,
        setAgentSearchQuery,
        setAgentCategory,
        setIsLoadingAgents,
        fetchAgents,

        // Actions - Traces
        setTraces,
        setTraceStats,
        setSelectedTimeRange,
        setSelectedTraceStatus,
        setIsLoadingTraces,
        fetchTraces,
        createTrace,

        // Actions - UI
        toggleSidebar,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useStore must be used within an AppProvider');
  }
  return context;
}
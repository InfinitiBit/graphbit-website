import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

interface AppState {
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

const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        agents: [],
        selectedAgent: null,
        agentSearchQuery: '',
        agentCategory: 'all',
        isLoadingAgents: false,

        traces: [],
        traceStats: null,
        selectedTimeRange: '24h',
        selectedTraceStatus: 'all',
        isLoadingTraces: false,

        sidebarOpen: true,
        theme: 'system',

        // Agent actions
        setAgents: (agents) => set({ agents }),
        setSelectedAgent: (agent) => set({ selectedAgent: agent }),
        setAgentSearchQuery: (query) => set({ agentSearchQuery: query }),
        setAgentCategory: (category) => set({ agentCategory: category }),
        setIsLoadingAgents: (loading) => set({ isLoadingAgents: loading }),

        fetchAgents: async () => {
          const { agentCategory, agentSearchQuery } = get();
          set({ isLoadingAgents: true });

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
              set({ agents: data.agents });
            }
          } catch (error) {
            console.error('Failed to fetch agents:', error);
          } finally {
            set({ isLoadingAgents: false });
          }
        },

        // Trace actions
        setTraces: (traces) => set({ traces }),
        setTraceStats: (stats) => set({ traceStats: stats }),
        setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
        setSelectedTraceStatus: (status) => set({ selectedTraceStatus: status }),
        setIsLoadingTraces: (loading) => set({ isLoadingTraces: loading }),

        fetchTraces: async () => {
          const { selectedTraceStatus } = get();
          set({ isLoadingTraces: true });

          try {
            const params = new URLSearchParams();
            if (selectedTraceStatus && selectedTraceStatus !== 'all') {
              params.append('status', selectedTraceStatus);
            }

            const response = await fetch(`/api/traces?${params}`);
            const data = await response.json();

            if (response.ok) {
              set({
                traces: data.traces,
                traceStats: data.stats,
              });
            }
          } catch (error) {
            console.error('Failed to fetch traces:', error);
          } finally {
            set({ isLoadingTraces: false });
          }
        },

        createTrace: async (trace) => {
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
              get().fetchTraces();
            }
          } catch (error) {
            console.error('Failed to create trace:', error);
          }
        },

        // UI actions
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: 'graphbit-store',
        partialize: (state) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
          agentCategory: state.agentCategory,
          selectedTimeRange: state.selectedTimeRange,
          selectedTraceStatus: state.selectedTraceStatus,
        }),
      }
    )
  )
);

export default useStore;

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Activity,
  AlertCircle,
  BarChart3 as Brain,
  CheckCircle,
  Clock,
  Code,
  Zap as Cpu,
  Shield as Database,
  Download,
  ArrowRight as ExternalLink,
  Globe,
  Shield,
  Star,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  version: string;
  author: string;
  downloads: number;
  rating: number;
  reviews: number;
  tags: string[];
  instructions?: string;
  settings?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    systemPrompt?: string;
    [key: string]: any;
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

interface AgentDetailModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentDetailModal({ agent, isOpen, onClose }: AgentDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'settings', label: 'Settings', icon: X },
    { id: 'models', label: 'Models', icon: Cpu },
    { id: 'knowledge', label: 'Knowledge', icon: X },
    { id: 'performance', label: 'Performance', icon: Activity },
  ];

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPricingColor = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'premium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'enterprise':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-background shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="truncate text-2xl font-bold text-foreground">{agent.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      by {agent.author} • v{agent.version}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{agent.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{agent.rating}</span>
                    <span>({agent.reviews} reviews)</span>
                  </div>
                  <Badge className={`border ${getPricingColor(agent.pricing?.tier || 'free')}`}>
                    {agent.pricing?.tier?.toUpperCase() || 'FREE'}
                  </Badge>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="sticky top-[88px] z-10 border-b border-border bg-background/95 px-6 backdrop-blur-sm">
            <div className="flex space-x-6 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-400 text-blue-400'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Description</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    {agent.longDescription || agent.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-500/10 text-blue-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                {agent.instructions && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Code className="h-5 w-5" />
                      Usage Instructions
                    </h3>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="leading-relaxed text-gray-700">{agent.instructions}</p>
                    </div>
                  </div>
                )}

                {/* Capabilities & Limitations */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {agent.capabilities && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Capabilities
                      </h3>
                      <ul className="space-y-2">
                        {agent.capabilities.map((capability, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {agent.limitations && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        Limitations
                      </h3>
                      <ul className="space-y-2">
                        {agent.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Use Cases */}
                {agent.useCases && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Use Cases
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {agent.useCases.map((useCase, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-3"
                        >
                          <span className="text-sm font-medium text-gray-800">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && agent.settings && (
              <div className="space-y-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <X className="h-5 w-5" />
                  Configuration Settings
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {agent.settings.temperature !== undefined && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <label className="text-sm font-medium text-gray-700">Temperature</label>
                      <div className="mt-1 text-lg font-bold text-gray-900">
                        {agent.settings.temperature}
                      </div>
                      <div className="text-xs text-gray-500">Controls randomness in responses</div>
                    </div>
                  )}

                  {agent.settings.maxTokens !== undefined && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <label className="text-sm font-medium text-gray-700">Max Tokens</label>
                      <div className="mt-1 text-lg font-bold text-gray-900">
                        {agent.settings.maxTokens.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Maximum response length</div>
                    </div>
                  )}

                  {agent.settings.topP !== undefined && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <label className="text-sm font-medium text-gray-700">Top P</label>
                      <div className="mt-1 text-lg font-bold text-gray-900">
                        {agent.settings.topP}
                      </div>
                      <div className="text-xs text-gray-500">Nucleus sampling parameter</div>
                    </div>
                  )}
                </div>

                {agent.settings.systemPrompt && (
                  <div>
                    <h4 className="text-md mb-3 font-semibold text-gray-900">System Prompt</h4>
                    <div className="relative rounded-lg bg-gray-900 p-4">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-green-400">
                        {agent.settings?.systemPrompt}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(agent.settings?.systemPrompt || '')}
                        className="absolute right-2 top-2 rounded-md bg-gray-800 p-2 transition-colors hover:bg-gray-700"
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Code className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'models' && agent.models && (
              <div className="space-y-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Cpu className="h-5 w-5" />
                  Model Configuration
                </h3>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h4 className="text-md mb-3 font-semibold text-gray-900">Primary Model</h4>
                    <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                      <div className="text-lg font-bold text-gray-900">{agent.models.primary}</div>
                      <div className="text-sm text-gray-600">Main model used for processing</div>
                    </div>
                  </div>

                  {agent.models.fallback && agent.models.fallback.length > 0 && (
                    <div>
                      <h4 className="text-md mb-3 font-semibold text-gray-900">Fallback Models</h4>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {agent.models.fallback.map((model, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-orange-200 bg-orange-50 p-3"
                          >
                            <div className="font-medium text-gray-900">{model}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-md mb-3 font-semibold text-gray-900">
                      All Supported Models
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.models.supportedModels.map((model, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'knowledge' && agent.knowledge && (
              <div className="space-y-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Database className="h-5 w-5" />
                  Knowledge Base
                </h3>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h4 className="text-md mb-3 font-semibold text-gray-900">Domain Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.knowledge.domains.map((domain, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md mb-3 font-semibold text-gray-900">Data Sources</h4>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {agent.knowledge.dataSources.map((source, index) => (
                        <div key={index} className="rounded-lg border bg-gray-50 p-3">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">{source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md mb-3 font-semibold text-gray-900">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.knowledge.expertise.map((area, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <Clock className="h-4 w-4" />
                      <span>
                        Last updated: {new Date(agent.knowledge.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && agent.performance && (
              <div className="space-y-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Activity className="h-5 w-5" />
                  Performance Metrics
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                    <div className="mb-2 flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Success Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {agent.performance.successRate}%
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
                    <div className="mb-2 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Avg Response Time</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {agent.performance.avgResponseTime}s
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                    <div className="mb-2 flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Uptime</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      {agent.performance.uptime}%
                    </div>
                  </div>
                </div>

                {agent.pricing && (
                  <div className="rounded-lg border bg-gray-50 p-6">
                    <h4 className="text-md mb-4 font-semibold text-gray-900">
                      Pricing Information
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <span className="text-sm text-gray-600">Tier</span>
                        <div
                          className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${getPricingColor(agent.pricing.tier)}`}
                        >
                          {agent.pricing.tier.toUpperCase()}
                        </div>
                      </div>
                      {agent.pricing.costPerCall && (
                        <div>
                          <span className="text-sm text-gray-600">Cost per Call</span>
                          <div className="text-lg font-bold text-gray-900">
                            ${agent.pricing.costPerCall}
                          </div>
                        </div>
                      )}
                      {agent.pricing.monthlyPrice && (
                        <div>
                          <span className="text-sm text-gray-600">Monthly Price</span>
                          <div className="text-lg font-bold text-gray-900">
                            ${agent.pricing.monthlyPrice}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-gray-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Updated {new Date(Date.now()).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Documentation
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all hover:shadow-lg">
                  <Download className="h-4 w-4" />
                  Install Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

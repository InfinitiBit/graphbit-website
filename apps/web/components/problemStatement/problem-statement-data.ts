import { Clock, Search, Shield, TrendingUp } from 'lucide-react';

export const problems = [
  {
    icon: Clock,
    title: 'Slow Development Cycles',
    description:
      'Months spent building AI agents from scratch, dealing with complex infrastructure and debugging production issues that could have been avoided.',
    linkTitle: 'Learn how GraphBit solves this',
    gradient: 'from-warning to-warning-light',
    background: 'from-warning/5 via-warning/3 to-warning/1',
    border: 'border-warning/20 hover:border-warning/40',
  },
  {
    icon: Search,
    title: 'Zero Visibility',
    description:
      'AI agents fail silently in production with no insights into performance, decision-making processes, or user interactions.',
    linkTitle: 'Learn how GraphBit solves this',
    gradient: 'from-accent to-accent-light',
    background: 'from-accent/5 via-accent/3 to-accent/1',
    border: 'border-accent/20 hover:border-accent/40',
  },
  {
    icon: Shield,
    title: 'Security Vulnerabilities',
    description:
      'Prompt injection attacks, data leaks, and unauthorized access threats that put your business and users at risk.',
    linkTitle: 'Learn how GraphBit solves this',
    gradient: 'from-secondary to-secondary-light',
    background: 'from-secondary/5 via-secondary/3 to-secondary/1',
    border: 'border-secondary/20 hover:border-secondary/40',
  },
  {
    icon: TrendingUp,
    title: 'Poor Performance at Scale',
    description:
      'AI agents that work in development but fail under real-world load, leading to frustrated users and lost revenue.',
    linkTitle: 'Learn how GraphBit solves this',
    gradient: 'from-destructive to-destructive-light',
    background: 'from-destructive/5 via-destructive/3 to-destructive/1',
    border: 'border-destructive/20 hover:border-destructive/40',
  },
];

export const severityData = [
  {
    title: 'Time Impact',
    percentage: 78,
    description: 'Development delays',
    explanation:
      'Traditional AI development approaches result in 6-12 month delays on average. Teams spend 70% of their time on infrastructure rather than core features, leading to significant opportunity costs and delayed market entry.',
  },
  {
    title: 'Revenue Risk',
    percentage: 85,
    description: 'Financial exposure',
    explanation:
      'Silent failures and performance issues lead to an average 23% revenue loss per incident. Without proper monitoring, businesses lose $50K-500K annually due to undetected AI agent failures and poor user experiences.',
  },
  {
    title: 'Security Score',
    percentage: 92,
    description: 'Vulnerability level',
    explanation:
      '87% of AI applications have at least one critical security vulnerability. Prompt injection attacks affect 3 out of 4 unprotected systems, with data breach costs averaging $4.35M per incident.',
  },
  {
    title: 'Scale Failure',
    percentage: 71,
    description: 'Performance degradation',
    explanation:
      'AI agents that work in development fail 71% of the time under production load. Response times increase by 300-500% under real-world traffic, causing user abandonment and system crashes.',
  },
];
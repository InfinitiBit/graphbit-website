'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Zap, 
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface PerformanceMetric {
  id: string;
  name: string;
  description: string;
  unit: string;
  graphbit: number;
  competitor1: number;
  competitor2: number;
  competitor3: number;
  betterIs: 'higher' | 'lower';
  color: string;
  gradient: string;
}

interface PerformanceComparisonProps {
  className?: string;
}

export function PerformanceComparison({ className = "" }: PerformanceComparisonProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>('speed');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const metrics: PerformanceMetric[] = [
    {
      id: 'speed',
      name: 'Deployment Speed',
      description: 'Time from code to production',
      unit: 'minutes',
      graphbit: 2.5,
      competitor1: 45,
      competitor2: 120,
      competitor3: 180,
      betterIs: 'lower',
      color: 'hsl(var(--success))',
      gradient: 'from-success to-success-light'
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      description: 'Average memory consumption per agent',
      unit: 'MB',
      graphbit: 128,
      competitor1: 512,
      competitor2: 1024,
      competitor3: 2048,
      betterIs: 'lower',
      color: 'hsl(var(--primary))',
      gradient: 'from-primary to-primary-light'
    },
    {
      id: 'complexity',
      name: 'Setup Complexity',
      description: 'Lines of configuration code required',
      unit: 'lines',
      graphbit: 15,
      competitor1: 150,
      competitor2: 300,
      competitor3: 500,
      betterIs: 'lower',
      color: 'hsl(var(--secondary))',
      gradient: 'from-secondary to-secondary-light'
    },
    {
      id: 'accuracy',
      name: 'Response Accuracy',
      description: 'Percentage of accurate responses',
      unit: '%',
      graphbit: 94.5,
      competitor1: 87.2,
      competitor2: 82.1,
      competitor3: 78.9,
      betterIs: 'higher',
      color: 'hsl(var(--warning))',
      gradient: 'from-warning to-warning-light'
    },
    {
      id: 'cost',
      name: 'Cost per Request',
      description: 'Average cost per API request',
      unit: '$',
      graphbit: 0.002,
      competitor1: 0.008,
      competitor2: 0.015,
      competitor3: 0.025,
      betterIs: 'lower',
      color: 'hsl(var(--accent))',
      gradient: 'from-accent to-accent-light'
    },
    {
      id: 'scalability',
      name: 'Auto-scaling Speed',
      description: 'Time to scale from 1 to 100 instances',
      unit: 'seconds',
      graphbit: 30,
      competitor1: 180,
      competitor2: 300,
      competitor3: 600,
      betterIs: 'lower',
      color: 'hsl(var(--primary))',
      gradient: 'from-primary to-accent'
    }
  ];

  const currentMetric = metrics.find(m => m.id === selectedMetric) || metrics[0];

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `$${value.toFixed(3)}`;
    }
    if (unit === '%') {
      return `${value.toFixed(1)}%`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k ${unit}`;
    }
    return `${value} ${unit}`;
  };

  const getImprovementPercentage = (graphbitValue: number, competitorValue: number, betterIs: 'higher' | 'lower') => {
    if (betterIs === 'higher') {
      return ((graphbitValue - competitorValue) / competitorValue * 100).toFixed(1);
    } else {
      return ((competitorValue - graphbitValue) / competitorValue * 100).toFixed(1);
    }
  };

  // Early return if no current metric
  if (!currentMetric) {
    return <div>Loading...</div>;
  }

  // Prepare data for Recharts
  const chartData = [
    {
      name: 'GraphBit',
      value: currentMetric.graphbit,
      color: 'hsl(var(--success))',
      gradient: 'from-success to-success-light'
    },
    {
      name: 'LangChain',
      value: currentMetric.competitor1,
      color: 'hsl(var(--primary))',
      gradient: 'from-primary to-primary-light'
    },
    {
      name: 'AutoGen',
      value: currentMetric.competitor2,
      color: 'hsl(var(--secondary))',
      gradient: 'from-secondary to-secondary-light'
    },
    {
      name: 'Custom Solution',
      value: currentMetric.competitor3,
      color: 'hsl(var(--muted-foreground))',
      gradient: 'from-muted to-muted-dark'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length && payload[0]) {
      return (
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-700">
          <p className="font-semibold">{label}</p>
          <p className="text-green-400">
            {formatValue(payload[0].value, currentMetric.unit)}
          </p>
          {label === 'GraphBit' && (
            <p className="text-xs text-green-300 mt-1">
              Best performance
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section className={`relative bg-gradient-to-b from-background via-muted/30 to-background py-20 sm:py-24 lg:py-32 ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              Performance Metrics
            </span>
          </div>
          
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            See How GraphBit
            <span className="mt-2 block bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
              Outperforms the Competition
            </span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Real benchmarks showing GraphBit&apos;s superior performance across key metrics that matter for AI development.
          </p>
        </div>

        <div className="" ref={containerRef}>
          {/* Metric Selector */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {metrics.map((metric) => (
                <motion.button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedMetric === metric.id
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105'
                      : 'bg-card/80 border border-border/50 text-foreground hover:bg-card hover:border-border backdrop-blur-sm hover:shadow-lg'
                  }`}
                  whileHover={{ scale: selectedMetric === metric.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {metric.name}
                </motion.button>
              ))}
            </div>
          </div>

        {/* Chart Container */}
        <div className="relative">
          {/* Chart Title */}
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">{currentMetric.name}</h4>
            <p className="text-gray-600">{currentMetric.description}</p>
          </div>

          {/* Recharts Bar Chart */}
          <motion.div
            className="relative h-80 mb-8 bg-gray-50/30 rounded-lg border border-gray-200/50 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatValue(value, currentMetric.unit)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationBegin={200}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {chartData.map((competitor, index) => {
              const isGraphBit = competitor.name === 'GraphBit';
              const improvement = isGraphBit 
                ? getImprovementPercentage(currentMetric.graphbit, currentMetric.competitor1, currentMetric.betterIs)
                : null;
              
              return (
                <motion.div
                  key={competitor.name}
                  className={`p-4 rounded-xl border ${
                    isGraphBit 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: competitor.color }}
                    />
                    <h5 className="font-semibold text-gray-900">{competitor.name}</h5>
                    {isGraphBit && (
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Best
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatValue(competitor.value, currentMetric.unit)}
                  </div>
                  {improvement && (
                    <div className="text-sm text-green-600 font-medium">
                      {improvement}% better than LangChain
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Speed Advantage",
                  description: `${getImprovementPercentage(currentMetric.graphbit, currentMetric.competitor1, currentMetric.betterIs)}% faster than LangChain`,
                  color: "text-success",
                  bgColor: "from-success-lighter/20 via-transparent to-success-lighter/10",
                  iconBg: "from-success to-success-light"
                },
                {
                  icon: BarChart3,
                  title: "Resource Efficiency",
                  description: `${getImprovementPercentage(currentMetric.graphbit, currentMetric.competitor2, currentMetric.betterIs)}% more efficient than AutoGen`,
                  color: "text-primary",
                  bgColor: "from-primary-lighter/20 via-transparent to-primary-lighter/10",
                  iconBg: "from-primary to-primary-light"
                },
                {
                  icon: BarChart3,
                  title: "Ease of Use",
                  description: `${getImprovementPercentage(currentMetric.graphbit, currentMetric.competitor3, currentMetric.betterIs)}% simpler than custom solutions`,
                  color: "text-accent",
                  bgColor: "from-accent-lighter/20 via-transparent to-accent-lighter/10",
                  iconBg: "from-accent to-accent-light"
                }
              ].map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <motion.div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${insight.bgColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>
                    
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${insight.iconBg} shadow-lg`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <h5 className="font-semibold text-foreground">{insight.title}</h5>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{insight.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-success/10 to-primary/10 rounded-full blur-2xl" />
    </section>
  );
}
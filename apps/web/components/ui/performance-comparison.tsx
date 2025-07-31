'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Zap, 
  BarChart3,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-600'
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
      color: '#3b82f6',
      gradient: 'from-blue-500 to-indigo-600'
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
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-violet-600'
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
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-600'
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
      color: '#ef4444',
      gradient: 'from-red-500 to-pink-600'
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
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-600'
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
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      name: 'LangChain',
      value: currentMetric.competitor1,
      color: '#3b82f6',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'AutoGen',
      value: currentMetric.competitor2,
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Custom Solution',
      value: currentMetric.competitor3,
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-600'
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
    <div className={`relative bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Performance Comparison</h3>
              <p className="text-gray-600 text-sm">See how GraphBit outperforms the competition</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6" ref={containerRef}>
        {/* Metric Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <motion.button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedMetric === metric.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Speed Advantage",
                description: `${getImprovementPercentage(currentMetric.graphbit, currentMetric.competitor1, currentMetric.betterIs)}% faster than LangChain`,
                color: "text-green-600",
                bgColor: "bg-green-50"
              },
              {
                icon: BarChart3,
                title: "Resource Efficiency",
                description: `${getImprovementPercentage(currentMetric.graphbit, currentMetric.competitor2, currentMetric.betterIs)}% more efficient than AutoGen`,
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              },
              {
                icon: BarChart3,
                title: "Ease of Use",
                description: `${getImprovementPercentage(currentMetric.graphbit, currentMetric.competitor3, currentMetric.betterIs)}% simpler than custom solutions`,
                color: "text-purple-600",
                bgColor: "bg-purple-50"
              }
            ].map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <motion.div
                  key={index}
                  className={`${insight.bgColor} p-4 rounded-xl border border-gray-200`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className={`h-5 w-5 ${insight.color}`} />
                    <h5 className="font-semibold text-gray-900">{insight.title}</h5>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-green-500/10 rounded-full blur-2xl" />
    </div>
  );
}
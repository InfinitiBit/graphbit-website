'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Users,
  BarChart3 as Target,
  Zap,
  Star as Info
} from 'lucide-react';

interface Statistic {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  description: string;
  source: string;
  sourceUrl: string;
  color: string;
  trend: 'up' | 'down';
  chartData?: number[];
}

interface TooltipState {
  visible: boolean;
  content: string;
  url: string;
  x: number;
  y: number;
}

interface StatisticsShowcaseProps {
  className?: string;
}

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(target * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, isInView]);

  return { current, ref };
}

// Simple chart component
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / maxValue) * 80; // Leave 20% padding
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-16 h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        className="opacity-70"
      />
      <circle
        cx={data.length > 1 ? ((data.length - 1) / (data.length - 1)) * 100 : 50}
        cy={data.length > 0 ? 100 - ((data[data.length - 1] || 0) / maxValue) * 80 : 50}
        r="2"
        fill={color}
        className="animate-pulse"
      />
    </svg>
  );
}

export function StatisticsShowcase({ className = "" }: StatisticsShowcaseProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: '',
    url: '',
    x: 0,
    y: 0
  });

  const statistics: Statistic[] = [
    {
      id: 'time-to-production',
      icon: Clock,
      value: 73,
      suffix: '%',
      label: 'Projects Delayed',
      description: 'AI projects exceed initial timeline estimates',
      source: 'McKinsey AI Survey 2024',
      sourceUrl: 'https://www.mckinsey.com',
      color: '#ef4444',
      trend: 'up',
      chartData: [45, 52, 61, 67, 73]
    },
    {
      id: 'cost-overrun',
      icon: DollarSign,
      value: 68,
      suffix: '%',
      label: 'Budget Overruns',
      description: 'Projects exceed planned development costs',
      source: 'Deloitte Tech Trends 2024',
      sourceUrl: 'https://www.deloitte.com',
      color: '#f59e0b',
      trend: 'up',
      chartData: [55, 59, 62, 65, 68]
    },
    {
      id: 'security-issues',
      icon: AlertCircle,
      value: 84,
      suffix: '%',
      label: 'Security Vulnerabilities',
      description: 'AI systems with unaddressed security risks',
      source: 'IBM Security Report 2024',
      sourceUrl: 'https://www.ibm.com',
      color: '#dc2626',
      trend: 'up',
      chartData: [72, 76, 79, 82, 84]
    },
    {
      id: 'developer-productivity',
      icon: Users,
      value: 42,
      suffix: '%',
      label: 'Time on Infrastructure',
      description: 'Developer time spent on setup vs. core features',
      source: 'Stack Overflow Survey 2024',
      sourceUrl: 'https://survey.stackoverflow.co',
      color: '#ea580c',
      trend: 'up',
      chartData: [35, 37, 39, 41, 42]
    },
    {
      id: 'failure-rate',
      icon: Target,
      value: 35,
      suffix: '%',
      label: 'Project Failures',
      description: 'AI projects that never reach production',
      source: 'Gartner Research 2024',
      sourceUrl: 'https://www.gartner.com',
      color: '#b91c1c',
      trend: 'up',
      chartData: [28, 30, 32, 34, 35]
    },
    {
      id: 'debugging-time',
      icon: Zap,
      value: 56,
      suffix: '%',
      label: 'Time Debugging',
      description: 'Development time spent on troubleshooting',
      source: 'JetBrains Developer Survey 2024',
      sourceUrl: 'https://www.jetbrains.com',
      color: '#c2410c',
      trend: 'up',
      chartData: [48, 51, 53, 55, 56]
    }
  ];

  const handleMouseEnter = (stat: Statistic, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: stat.source,
      url: stat.sourceUrl,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-3 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Industry Reality Check
          </h3>
        </motion.div>
        
        <p className="text-gray-300 max-w-2xl mx-auto">
          The numbers don't lie. AI development faces systemic challenges that impact every project.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statistics.map((stat, index) => {
          const IconComponent = stat.icon;
          const { current, ref } = useAnimatedCounter(stat.value, 2000 + index * 200);
          
          return (
            <motion.div
              key={stat.id}
              ref={ref}
              className="group relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br`} style={{
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`
                }}>
                  <IconComponent className="h-5 w-5" />
                </div>
                
                {/* Mini Chart */}
                {stat.chartData && (
                  <MiniChart data={stat.chartData} color={stat.color} />
                )}
              </div>

              {/* Main Statistic */}
              <div className="mb-3">
                <div className="flex items-baseline gap-1 mb-1">
                  <motion.span 
                    className="text-3xl font-bold text-white"
                    key={current} // Re-trigger animation on value change
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {current}
                  </motion.span>
                  <span className="text-lg font-semibold" style={{ color: stat.color }}>
                    {stat.suffix}
                  </span>
                  {stat.trend === 'up' && (
                    <div className="ml-2 flex items-center gap-1 text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full">
                      <TrendingUp className="h-3 w-3" />
                      <span>↑</span>
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {stat.label}
                </h4>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                {stat.description}
              </p>

              {/* Source */}
              <div className="flex items-center justify-between">
                <button
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-400 transition-colors focus:outline-none focus:text-blue-400"
                  onMouseEnter={(e) => handleMouseEnter(stat, e)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => window.open(stat.sourceUrl, '_blank')}
                >
                  <Info className="h-3 w-3" />
                  <span>Source</span>
                </button>
                
                <div className="w-8 h-1 rounded-full bg-gray-700 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: stat.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>

              {/* Progress indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-xl overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: `linear-gradient(90deg, ${stat.color}40, ${stat.color})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        className="bg-gradient-to-r from-red-900/20 via-orange-900/20 to-yellow-900/20 border border-red-500/30 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Critical Issues</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm text-gray-300">Rising Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="text-sm text-gray-300">Industry Impact</span>
            </div>
          </div>
          
          <h4 className="text-lg font-bold text-white mb-2">
            The AI Development Crisis is Real
          </h4>
          <p className="text-gray-300 max-w-3xl mx-auto">
            These statistics represent real challenges facing development teams worldwide. 
            <span className="text-white font-semibold"> GraphBit addresses each of these pain points</span>, 
            transforming industry-wide problems into competitive advantages.
          </p>
        </div>
      </motion.div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-medium">{tooltip.content}</div>
          <div className="text-xs text-gray-400 mt-1">Click to view source</div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-yellow-500/10 rounded-full blur-2xl" />
    </motion.div>
  );
} 
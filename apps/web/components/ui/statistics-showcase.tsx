'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Users,
  BarChart3 as Target,
  Zap
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


interface StatisticsShowcaseProps {
  className?: string;
}

// Statistic card component with animated counter
function StatisticCard({ stat, index }: { stat: Statistic; index: number }) {
  const IconComponent = stat.icon;
  const { current, ref } = useAnimatedCounter(stat.value, 2000 + index * 200);
  
  return (
    <motion.div
      ref={ref}
      className="group relative bg-gradient-to-br from-background/80 to-warning/5 border border-warning/20 rounded-xl p-6 hover:border-warning/40 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-warning to-destructive mb-4 shadow-lg shadow-warning/20">
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        
        {/* Value */}
        <div className="mb-2">
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
            {current.toLocaleString()}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-warning ml-1">
            {stat.suffix}
          </span>
        </div>
        
        {/* Label */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-warning transition-colors">
          {stat.label}
        </h3>
        
        {/* Description */}
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
          {stat.description}
        </p>
        
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-warning/10 to-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
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


export function StatisticsShowcase({ className = "" }: StatisticsShowcaseProps) {

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
      color: 'hsl(var(--warning))',
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
      color: 'hsl(var(--destructive))',
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
      color: 'hsl(var(--accent))',
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
      color: 'hsl(var(--warning))',
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
      color: 'hsl(var(--destructive))',
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
      color: 'hsl(var(--accent))',
      trend: 'up',
      chartData: [48, 51, 53, 55, 56]
    }
  ];


  return (
    <motion.div
      className={`relative bg-gradient-to-r from-background/95 to-warning/5 backdrop-blur-xl border border-warning/20 hover:border-warning/40 transition-colors duration-300 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-xl hover:shadow-2xl ${className}`}
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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-warning to-destructive shadow-xl shadow-warning/30">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
            Industry Reality Check
          </h3>
        </motion.div>
        
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The numbers don&apos;t lie. AI development faces systemic challenges that impact every project.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statistics.map((stat, index) => (
          <StatisticCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        className="bg-gradient-to-r from-warning/10 via-accent/10 to-destructive/10 border border-warning/30 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Critical Issues</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm text-muted-foreground">Rising Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="text-sm text-muted-foreground">Industry Impact</span>
            </div>
          </div>
          
          <h4 className="text-lg font-bold bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent mb-2">
            The AI Development Crisis is Real
          </h4>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            These statistics represent real challenges facing development teams worldwide. 
            <span className="text-foreground font-semibold"> GraphBit addresses each of these pain points</span>, 
            transforming industry-wide problems into competitive advantages.
          </p>
        </div>
      </motion.div>


      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warning/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-destructive/10 to-warning/10 rounded-full blur-2xl" />
    </motion.div>
  );
} 
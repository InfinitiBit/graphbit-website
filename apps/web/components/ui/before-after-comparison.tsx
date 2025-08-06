'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, AlertCircle, CheckCircle, ChevronDown, TrendingUp, Shield } from 'lucide-react';

interface ComparisonMetric {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  before: {
    value: string;
    color: string;
    description: string;
  };
  after: {
    value: string;
    color: string;
    description: string;
  };
}

interface BeforeAfterComparisonProps {
  className?: string;
}

export function BeforeAfterComparison({ className = "" }: BeforeAfterComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const metrics: ComparisonMetric[] = [
    {
      icon: Clock,
      label: "Time to Production",
      before: {
        value: "6-12 months",
        color: "text-slate-400",
        description: "Manual setup, debugging, scaling issues"
      },
      after: {
        value: "2-4 weeks",
        color: "text-emerald-400",
        description: "Pre-built infrastructure, automated workflows"
      }
    },
    {
      icon: DollarSign,
      label: "Development Cost",
      before: {
        value: "$500K+",
        color: "text-slate-400",
        description: "Infrastructure, debugging, security fixes"
      },
      after: {
        value: "$50K",
        color: "text-emerald-400",
        description: "90% cost reduction with GraphBit platform"
      }
    },
    {
      icon: AlertCircle,
      label: "Production Issues",
      before: {
        value: "15-20/month",
        color: "text-slate-400",
        description: "Silent failures, security vulnerabilities"
      },
      after: {
        value: "1-2/month",
        color: "text-emerald-400",
        description: "Proactive monitoring, automated resolution"
      }
    },
    {
      icon: Shield,
      label: "Security Score",
      before: {
        value: "40/100",
        color: "text-slate-400",
        description: "Vulnerable to prompt injection, data leaks"
      },
      after: {
        value: "95/100",
        color: "text-emerald-400",
        description: "Enterprise-grade security built-in"
      }
    }
  ];

  const updateSliderPosition = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  }, [isDragging, updateSliderPosition]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-warning to-destructive shadow-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
            The GraphBit Difference
          </h3>
        </motion.div>
        
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Drag the slider to see how GraphBit transforms AI agent development
        </p>
      </div>

      {/* Interactive Comparison */}
      <div 
        ref={containerRef}
        className="relative h-96 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        {/* Before Side (Without GraphBit) */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-background/60 border border-warning/20 relative">
          {/* Simple dot pattern background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/20 border border-warning/30">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">Without GraphBit</h4>
                  <p className="text-muted-foreground text-sm">Traditional AI Development</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3 mb-6">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Months of infrastructure setup</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Constant debugging cycles</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Security vulnerabilities</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Production failures</span>
                </motion.div>
              </div>
            </div>

            {/* Key Problems */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <ChevronDown className="h-3 w-3 text-warning" />
                <span>70% of time spent on infrastructure</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <ChevronDown className="h-3 w-3 text-warning" />
                <span>87% have critical vulnerabilities</span>
              </div>
            </div>
          </div>
        </div>

        {/* After Side (With GraphBit) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent/60 to-warning/40 border border-accent/30 relative"
          style={{ 
            clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` 
          }}
        >
          {/* Simple dot pattern background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 border border-accent/50">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">With GraphBit</h4>
                  <p className="text-accent text-sm">AI-Powered Development Platform</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3 mb-6">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm text-accent">Instant deployment ready</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm text-accent">Automated testing & monitoring</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm text-accent">Enterprise-grade security</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm text-accent">Proactive issue detection</span>
                </motion.div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent text-xs">
                <TrendingUp className="h-3 w-3" />
                <span>90% faster time to market</span>
              </div>
              <div className="flex items-center gap-2 text-accent text-xs">
                <TrendingUp className="h-3 w-3" />
                <span>80% cost reduction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Control */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-lg cursor-grab active:cursor-grabbing z-20"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          ref={sliderRef}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-card rounded-full shadow-lg border-2 border-border flex items-center justify-center">
                            <div className="w-3 h-3 bg-muted-foreground rounded-full" />
          </div>
          
          {/* Slider indicators */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="w-2 h-2 bg-card rounded-full" />
            <div className="w-1 h-1 bg-white/70 rounded-full" />
            <div className="w-1 h-1 bg-white/50 rounded-full" />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="w-1 h-1 bg-white/50 rounded-full" />
            <div className="w-1 h-1 bg-white/70 rounded-full" />
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        {/* Slider Instructions */}
        <motion.div 
                      className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          ← Drag to compare →
        </motion.div>
      </div>

      {/* Animated Metrics */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const showAfter = sliderPosition > 50;
          
          return (
            <motion.div
              key={index}
              className="bg-background/70 border border-warning/20 hover:border-warning/40 transition-colors rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  showAfter ? 'bg-success/20 border border-success/50' : 'bg-muted/20 border border-border'
                }`}>
                  <IconComponent className={`h-4 w-4 ${showAfter ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
              </div>
              
              <motion.div
                key={showAfter ? 'after' : 'before'}
                initial={{ opacity: 0, x: showAfter ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`text-lg font-bold ${showAfter ? metric.after.color : metric.before.color}`}>
                  {showAfter ? metric.after.value : metric.before.value}
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-400 mt-1">
                  {showAfter ? metric.after.description : metric.before.description}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Without GraphBit</span>
                  <div className="flex-1 bg-muted rounded-full h-2 relative overflow-hidden">
          <motion.div 
                              className="absolute left-0 top-0 h-full bg-gradient-to-r from-muted-foreground to-success rounded-full"
            style={{ width: `${sliderPosition}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <span className="text-sm text-muted-foreground">With GraphBit</span>
      </div>

      {/* Background decoration using CSS variables */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-success/10 rounded-full blur-2xl" />
    </motion.div>
  );
} 
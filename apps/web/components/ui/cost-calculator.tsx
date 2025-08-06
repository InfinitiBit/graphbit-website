'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';

interface CostCalculatorProps {
  className?: string;
}

interface CostBreakdown {
  developmentDelay: number;
  infrastructureCosts: number;
  debuggingTime: number;
  securityRisks: number;
  scalingIssues: number;
  total: number;
}

export function CostCalculator({ className = "" }: CostCalculatorProps) {
  const [teamSize, setTeamSize] = useState(5);
  const [complexity, setComplexity] = useState(2); // 1=Simple, 2=Medium, 3=Complex
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const animatedTotalRef = useRef(0);
  const [breakdown, setBreakdown] = useState<CostBreakdown>({
    developmentDelay: 0,
    infrastructureCosts: 0,
    debuggingTime: 0,
    securityRisks: 0,
    scalingIssues: 0,
    total: 0
  });

  // Cost calculation logic based on industry data
  const calculateCosts = (size: number, complexityLevel: number) => {
    const avgSalary = 120000; // Average AI developer salary
    const hourlyRate = avgSalary / 2080; // ~$58/hour
    
    // Base multipliers for complexity
    const complexityMultiplier = {
      1: 1,     // Simple
      2: 1.5,   // Medium
      3: 2.2    // Complex
    }[complexityLevel] || 1.5;

    // Calculate individual cost components
    const developmentDelay = size * hourlyRate * 40 * 12 * complexityMultiplier; // 12 weeks delay
    const infrastructureCosts = size * 15000 * complexityMultiplier; // Infrastructure overhead
    const debuggingTime = size * hourlyRate * 20 * 8 * complexityMultiplier; // 8 weeks debugging
    const securityRisks = size * 25000 * complexityMultiplier; // Security incident costs
    const scalingIssues = size * hourlyRate * 30 * 6 * complexityMultiplier; // 6 weeks scaling fixes

    const total = developmentDelay + infrastructureCosts + debuggingTime + securityRisks + scalingIssues;

    return {
      developmentDelay: Math.round(developmentDelay),
      infrastructureCosts: Math.round(infrastructureCosts),
      debuggingTime: Math.round(debuggingTime),
      securityRisks: Math.round(securityRisks),
      scalingIssues: Math.round(scalingIssues),
      total: Math.round(total)
    };
  };

  // Animate total when breakdown changes
  useEffect(() => {
    const newBreakdown = calculateCosts(teamSize, complexity);
    setBreakdown(newBreakdown);

    // Animate the total number
    const animateTotal = () => {
      const startTime = Date.now();
      const duration = 1500;
      const startValue = animatedTotalRef.current;
      const endValue = newBreakdown.total;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = startValue + (endValue - startValue) * easeOutCubic;
        const roundedValue = Math.round(currentValue);
        
        animatedTotalRef.current = roundedValue;
        setAnimatedTotal(roundedValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    animateTotal();
  }, [teamSize, complexity]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const complexityLabels = {
    1: 'Simple',
    2: 'Medium',
    3: 'Complex'
  };

  const chartData = [
    { label: 'Development Delays', value: breakdown.developmentDelay, color: 'from-warning to-destructive' },
    { label: 'Infrastructure Overhead', value: breakdown.infrastructureCosts, color: 'from-destructive to-accent' },
    { label: 'Debugging Time', value: breakdown.debuggingTime, color: 'from-warning to-accent' },
    { label: 'Security Risks', value: breakdown.securityRisks, color: 'from-destructive to-warning' },
    { label: 'Scaling Issues', value: breakdown.scalingIssues, color: 'from-accent to-warning' },
  ];

  return (
    <>
      <style>{`
        .cost-calculator-slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        
        .cost-calculator-slider::-webkit-slider-track {
          background: #e2e8f0;
          height: 12px;
          border-radius: 6px;
        }
        
        .dark .cost-calculator-slider::-webkit-slider-track {
          background: #374151;
        }
        
        .cost-calculator-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          height: 24px;
          width: 24px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }
        
        .cost-calculator-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
        }
        
        .cost-calculator-slider::-moz-range-track {
          background: #e2e8f0;
          height: 12px;
          border-radius: 6px;
          border: none;
        }
        
        .dark .cost-calculator-slider::-moz-range-track {
          background: #374151;
        }
        
        .cost-calculator-slider::-moz-range-thumb {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          height: 24px;
          width: 24px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }
        
        .cost-calculator-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
        }
      `}</style>
      
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
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
              Calculate Your AI Development Costs
            </h3>
          </motion.div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how much inefficient AI development is costing your team annually
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Team Size Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-foreground mb-3">
                <Users className="inline h-4 w-4 mr-2 text-warning" />
                Team Size
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-3 cost-calculator-slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1</span>
                  <span className="text-foreground font-semibold">{teamSize} developers</span>
                  <span>20+</span>
                </div>
              </div>
            </motion.div>

            {/* Project Complexity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-foreground mb-3">
                <TrendingUp className="inline h-4 w-4 mr-2 text-warning" />
                Project Complexity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    onClick={() => setComplexity(level)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      complexity === level
                        ? 'border-warning bg-warning/20 text-warning'
                        : 'border-warning/30 bg-background/50 text-foreground hover:border-warning/50'
                    }`}
                  >
                    <div className="text-sm font-medium">{complexityLabels[level as keyof typeof complexityLabels]}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results Summary */}
            <motion.div
              className="bg-gradient-to-br from-warning/10 to-accent/10 border border-warning/30 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-sm text-warning mb-2">Annual Inefficiency Cost</div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent mb-2">
                  {formatCurrency(animatedTotal)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {teamSize} developers building {complexityLabels[complexity as keyof typeof complexityLabels].toLowerCase()} AI projects
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chart Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent mb-4">
                <Clock className="inline h-5 w-5 mr-2 text-warning" />
                Cost Breakdown
              </h4>
              
              <div className="space-y-4">
                {chartData.map((item, index) => {
                  const percentage = breakdown.total > 0 ? (item.value / breakdown.total) * 100 : 0;
                  
                  return (
                    <motion.div
                      key={item.label}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                                          <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold text-foreground">
                          {formatCurrency(item.value)}
                        </span>
                      </div>
                      
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute left-0 top-0 h-full bg-gradient-to-r from-warning via-destructive to-accent rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-1">
                        {percentage.toFixed(1)}% of total cost
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-6 border-t border-warning/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-warning to-destructive px-8 py-4 text-white font-semibold shadow-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="relative flex items-center justify-center gap-3">
                  <DollarSign className="h-5 w-5" />
                  <span>Calculate Your Savings with GraphBit</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
              
              <p className="text-center text-xs text-muted-foreground mt-3">
                See how GraphBit can reduce these costs by up to 80%
              </p>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warning/10 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-destructive/10 to-warning/10 rounded-full blur-2xl" />
      </motion.div>
    </>
  );
} 
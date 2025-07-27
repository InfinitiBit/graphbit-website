'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import React from 'react'; // Added missing import for React

interface SeverityMeterProps {
  percentage: number;
  title: string;
  description: string;
  explanation: string;
  index: number; // Add index prop for consistent IDs
}

function SeverityMeter({ percentage, title, description, explanation, index }: SeverityMeterProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  
  const circumference = 2 * Math.PI * 62; // radius = 62
  
  const strokeDashoffset = useTransform(
    smoothProgress,
    (value) => circumference - (value / 100) * circumference
  );

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        progress.set(percentage);
      }, 300);

      // Animate the percentage number
      const animatePercentage = () => {
        const startTime = Date.now();
        const duration = 1000; // 1 second

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);

          setAnimatedPercentage(Math.round(percentage * easeOutQuart));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      };
      setTimeout(animatePercentage, 300);

      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, progress]);

  // Generate gradient colors based on percentage
  const getGradientColors = (percent: number) => {
    if (percent < 30) return { start: '#fbbf24', end: '#f59e0b' }; // Yellow
    if (percent < 60) return { start: '#f59e0b', end: '#ea580c' }; // Orange
    if (percent < 80) return { start: '#ea580c', end: '#dc2626' }; // Red-orange
    return { start: '#dc2626', end: '#b91c1c' }; // Red
  };

  const { start: gradientStart, end: gradientEnd } = getGradientColors(percentage);
  
  // Use index-based ID for consistent server/client rendering
  const gradientId = `severity-gradient-${index}`;
  
  // Determine severity level for styling
  const isHighSeverity = percentage >= 80;

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <div className="relative">
        {/* Main severity meter */}
        <svg 
          width={140} 
          height={140} 
          className={`transform -rotate-90 transition-all duration-500 ${
            isHighSeverity ? 'drop-shadow-lg filter animate-pulse' : ''
          }`}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor={gradientEnd} />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle
            cx={70}
            cy={70}
            r={62}
            fill="none"
            stroke="rgb(55, 65, 81)"
            strokeWidth={8}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={70}
            cy={70}
            r={62}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            className="transition-all duration-300"
            style={{
              strokeDashoffset,
              filter: "url(#glow)"
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-xl font-bold text-white block leading-none"
          >
            {animatedPercentage}%
          </span>
          <span className="text-xs text-gray-300 mt-1 text-center leading-tight">
            {title}
          </span>
        </div>

        {/* Severity indicator */}
        {isHighSeverity && (
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <AlertCircle className="h-4 w-4 text-red-400" />
          </motion.div>
        )}
      </div>

      {/* Description */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-300 font-medium">{description}</p>
      </div>

      {/* Tooltip */}
      {isTooltipVisible && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 shadow-xl max-w-xs">
            <div className="flex items-start gap-2">
                             <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {explanation}
                </p>
                
                {/* Severity scale */}
                <div className="mt-3 pt-2 border-t border-gray-600">
                  <p className="text-xs text-gray-400 mb-2">Severity Scale:</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-yellow-400">Low (0-30%)</span>
                    <span className="text-orange-400">Medium (30-60%)</span>
                    <span className="text-red-400">High (60%+)</span>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full mt-1" />
                </div>
              </div>
            </div>
            
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface ScrollSeverityMetersProps {
  problems: Array<{
    title: string;
    percentage: number;
    description: string;
    explanation: string;
  }>;
}

export function ScrollSeverityMeters({ problems }: ScrollSeverityMetersProps) {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {problems.map((problem, index) => (
        <SeverityMeter
          key={index}
          index={index} // Pass index for consistent IDs
          percentage={problem.percentage}
          title={problem.title}
          description={problem.description}
          explanation={problem.explanation}
        />
      ))}
    </motion.div>
  );
} 
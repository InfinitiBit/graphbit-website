'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TrendingUp, Zap, Shield, Clock } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />,
    value: 85,
    suffix: '%',
    label: 'Performance Boost',
    color: 'text-green-600'
  },
  {
    icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
    value: 3.2,
    suffix: 'x',
    label: 'Faster Deployment',
    color: 'text-blue-600'
  },
  {
    icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
    value: 99.9,
    suffix: '%',
    label: 'Uptime SLA',
    color: 'text-purple-600'
  },
  {
    icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
    value: 150,
    suffix: 'ms',
    label: 'Avg Response Time',
    color: 'text-orange-600'
  }
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        let displayValue;
        if (suffix === '%' || suffix === 'ms') {
          displayValue = latest.toFixed(1);
        } else if (suffix === 'x') {
          displayValue = latest.toFixed(1);
        } else {
          displayValue = Math.round(latest).toString();
        }
        ref.current.textContent = displayValue;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.21, 1.02, 0.73, 1],
      }}
      className="group relative overflow-hidden rounded-xl bg-card/70 backdrop-blur-sm border border-border/20 p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <motion.div 
          className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 ${stat.color} mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}
          whileHover={{ rotate: 5 }}
        >
          {stat.icon}
        </motion.div>
        
        {/* Value */}
        <div className="mb-1">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <span className={`${stat.color} ml-1 font-extrabold`}>{stat.suffix}</span>
          </span>
        </div>
        
        {/* Label */}
        <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">
          {stat.label}
        </p>
      </div>

      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.color.replace('text-', 'from-')} to-transparent opacity-10 rounded-bl-2xl`} />
    </motion.div>
  );
}

export function AnimatedHeroStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-4 sm:mb-6"
      >
        <h3 className="text-base sm:text-lg font-semibold text-muted-foreground mb-2">
          Trusted by developers worldwide
        </h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
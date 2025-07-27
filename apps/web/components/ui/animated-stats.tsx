'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  Download, 
  TrendingUp, 
  Zap, 
  Clock,
  Database,
  Cpu
} from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = formatNumber(latest, suffix);
        ref.current.textContent = formatted;
      }
    });
  }, [springValue, suffix]);

  return <div ref={ref} />;
}

function formatNumber(value: number, suffix: string): string {
  const rounded = Math.floor(value);
  
  if (suffix === '%') {
    return `${rounded}${suffix}`;
  } else if (suffix === 'x') {
    return `${rounded}${suffix}`;
  } else if (suffix === 'ms') {
    return `${rounded}${suffix}`;
  } else if (suffix === 'K+') {
    return `${Math.floor(rounded / 1000)}K+`;
  } else if (suffix === 'M+') {
    return `${(rounded / 1000000).toFixed(1)}M+`;
  } else {
    return `${rounded}${suffix}`;
  }
}

const defaultStats: StatItem[] = [
  {
    id: 'performance',
    label: 'Performance Boost',
    value: 85,
    suffix: '%',
    icon: <Zap className="h-6 w-6 text-white" />,
    color: 'from-yellow-500 to-orange-600',
    description: 'Faster AI processing'
  },
  {
    id: 'memory',
    label: 'Memory Savings',
    value: 3,
    suffix: 'x',
    icon: <Database className="h-6 w-6 text-white" />,
    color: 'from-green-500 to-emerald-600',
    description: 'Reduced memory usage'
  },
  {
    id: 'latency',
    label: 'Response Time',
    value: 120,
    suffix: 'ms',
    icon: <Clock className="h-6 w-6 text-white" />,
    color: 'from-blue-500 to-cyan-600',
    description: 'Average API response'
  },
  {
    id: 'throughput',
    label: 'CPU Efficiency',
    value: 78,
    suffix: '%',
    icon: <Cpu className="h-6 w-6 text-white" />,
    color: 'from-purple-500 to-indigo-600',
    description: 'Optimized processing'
  }
];

interface AnimatedStatsProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function AnimatedStats({ 
  stats = defaultStats, 
  title = "Performance Metrics",
  subtitle = "Real-world improvements with GraphBit AI agents",
  className = "" 
}: AnimatedStatsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section ref={containerRef} className={`relative py-16 sm:py-20 ${className}`}>
      <div className="container-responsive">
        <motion.div 
          className="rounded-2xl border border-gray-200/50 bg-white/70 backdrop-blur-sm p-8 shadow-2xl lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {subtitle}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="group relative text-center"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className={`mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { 
                      scale: 1, 
                      rotate: 0,
                      transition: { 
                        delay: 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }
                    } : { scale: 0, rotate: -180 }}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Animated Counter */}
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      duration={2 + index * 0.2}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-sm sm:text-base font-semibold text-gray-700 mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs sm:text-sm text-gray-500">
                    {stat.description}
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200/50 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200/50"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { 
              opacity: 1, 
              scaleX: 1,
              transition: { delay: 1, duration: 0.8 }
            } : { opacity: 0, scaleX: 0 }}
          >
            <p className="text-center text-xs sm:text-sm text-gray-500">
              ✨ Real metrics from production deployments
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
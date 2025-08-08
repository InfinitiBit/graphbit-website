'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProblemCardProps {
  problem: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    linkTitle: string;
    gradient: string;
    background: string;
    border: string;
  };
  index: number;
  itemVariants: any;
  iconVariants: any;
}

export function ProblemCard({ problem, index, itemVariants, iconVariants }: ProblemCardProps) {
  const IconComponent = problem.icon;

  return (
    <motion.div
      key={index}
      variants={itemVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${problem.background} border-2 backdrop-blur-xl ${problem.border} p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-5 lg:p-6`}
      >
        {/* Subtle glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-40" />

        {/* Icon */}
        <motion.div
          className="mb-4"
          variants={iconVariants}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br sm:h-12 sm:w-12 lg:h-14 lg:w-14 ${problem.gradient} shadow-lg transition-all duration-300 group-hover:shadow-xl`}
          >
            <IconComponent className="h-5 w-5 text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative">
          <h3 className="mb-3 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl lg:text-2xl">
            {problem.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground lg:text-base">
            {problem.description}
          </p>

          {/* Learn more indicator */}
          <div className="mt-4 flex items-center text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="text-xs font-semibold">Learn how GraphBit solves this</span>
            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${problem.gradient} rounded-b-xl transition-all duration-300 group-hover:w-full`}
        />
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  Clock, 
  Shield, 
  ChevronDown
} from 'lucide-react';
import { ScrollSeverityMeters } from './severity-meter';
import { CostCalculator } from './cost-calculator';
import { BeforeAfterComparison } from './before-after-comparison';
import { ChaosVisualization } from './chaos-visualization';
import { StatisticsShowcase } from './statistics-showcase';

const problems = [
  {
    icon: Clock,
    title: "Slow Development Cycles",
    description: "Months spent building AI agents from scratch, dealing with complex infrastructure, and debugging production issues that could have been avoided.",
    gradient: "from-red-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Zero Visibility",
    description: "AI agents fail silently in production with no insights into performance, decision-making processes, or user interactions.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Security Vulnerabilities",
    description: "Prompt injection attacks, data leaks, and unauthorized access threats that put your business and users at risk.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: ChevronDown,
    title: "Poor Performance at Scale",
    description: "AI agents that work in development but fail under real-world load, leading to frustrated users and lost revenue.",
    gradient: "from-yellow-500 to-red-500"
  }
];

// Severity data for the meters
const severityData = [
  {
    title: "Time Impact",
    percentage: 78,
    description: "Development delays",
    explanation: "Traditional AI development approaches result in 6-12 month delays on average. Teams spend 70% of their time on infrastructure rather than core features, leading to significant opportunity costs and delayed market entry."
  },
  {
    title: "Revenue Risk",
    percentage: 85,
    description: "Financial exposure",
    explanation: "Silent failures and performance issues lead to an average 23% revenue loss per incident. Without proper monitoring, businesses lose $50K-500K annually due to undetected AI agent failures and poor user experiences."
  },
  {
    title: "Security Score",
    percentage: 92,
    description: "Vulnerability level",
    explanation: "87% of AI applications have at least one critical security vulnerability. Prompt injection attacks affect 3 out of 4 unprotected systems, with data breach costs averaging $4.35M per incident."
  },
  {
    title: "Scale Failure",
    percentage: 71,
    description: "Performance degradation",
    explanation: "AI agents that work in development fail 71% of the time under production load. Response times increase by 300-500% under real-world traffic, causing user abandonment and system crashes."
  }
];

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
    y: 60,
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
};

const iconVariants = {
  hidden: { 
    scale: 0,
    rotate: -180 
  },
  visible: {
    scale: 1,
    rotate: 0
  }
};

export function ProblemStatementSection() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-blue-900/10" />
        
        {/* Static background pattern - no hydration issues */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/50 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-orange-500/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-500/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-red-400/50 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-orange-400/30 rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
          
          {/* Radial gradients for atmosphere */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-orange-500/5 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Problem Alert Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl">
                <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></div>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-red-400">
              Critical Development Challenges
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building AI Agents
            <span className="block mt-2 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Shouldn't Be This Hard
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-300 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Developers are struggling with the same painful challenges when building AI agents. 
            <span className="text-white font-medium"> It's time for a better way.</span>
          </motion.p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:shadow-red-500/10 hover:border-red-500/30 hover:scale-[1.02] hover:-translate-y-1">
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Icon */}
                  <motion.div 
                    className="mb-6"
                    variants={iconVariants}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  >
                    <div className={`inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br ${problem.gradient} shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}>
                      <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-red-100 transition-colors duration-300">
                      {problem.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {problem.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${problem.gradient} transition-all duration-500 group-hover:w-full`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistics Showcase Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <StatisticsShowcase className="max-w-6xl mx-auto" />
        </motion.div>

        {/* Chaos Visualization Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ChaosVisualization className="max-w-6xl mx-auto" />
        </motion.div>

        {/* Severity Meters Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Severity Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-orange-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-orange-300 uppercase tracking-wide">
                Impact Analysis
              </span>
            </motion.div>
            
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Measuring the Real Cost
              <span className="block mt-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                of These Problems
              </span>
            </motion.h3>
            
            <motion.p 
              className="max-w-2xl mx-auto text-gray-300 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Each challenge creates measurable business impact. Here's how severe these problems really are.
            </motion.p>
          </div>

          {/* Severity Meters */}
          <ScrollSeverityMeters problems={severityData} />
        </motion.div>

        {/* Cost Calculator Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <CostCalculator className="max-w-6xl mx-auto" />
        </motion.div>

        {/* Before/After Comparison Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <BeforeAfterComparison className="max-w-6xl mx-auto" />
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            <span className="text-white font-semibold">Sound familiar?</span> 
            {" "}Let's solve these problems together.
          </p>
          
          <motion.div
            className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>See how GraphBit solves this</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
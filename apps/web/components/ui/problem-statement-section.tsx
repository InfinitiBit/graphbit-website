'use client';

import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  Clock, 
  Search, 
  Shield,
  TrendingUp,
  ArrowRight
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
    gradient: "from-warning to-warning-light",
    background: "from-warning/5 via-warning/3 to-warning/1",
    border: "border-warning/20 hover:border-warning/40"
  },
  {
    icon: Search,
    title: "Zero Visibility",
    description: "AI agents fail silently in production with no insights into performance, decision-making processes, or user interactions.",
    gradient: "from-accent to-accent-light",
    background: "from-accent/5 via-accent/3 to-accent/1",
    border: "border-accent/20 hover:border-accent/40"
  },
  {
    icon: Shield,
    title: "Security Vulnerabilities",
    description: "Prompt injection attacks, data leaks, and unauthorized access threats that put your business and users at risk.",
    gradient: "from-secondary to-secondary-light",
    background: "from-secondary/5 via-secondary/3 to-secondary/1",
    border: "border-secondary/20 hover:border-secondary/40"
  },
  {
    icon: TrendingUp,
    title: "Poor Performance at Scale",
    description: "AI agents that work in development but fail under real-world load, leading to frustrated users and lost revenue.",
    gradient: "from-destructive to-destructive-light",
    background: "from-destructive/5 via-destructive/3 to-destructive/1",
    border: "border-destructive/20 hover:border-destructive/40"
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
    <section className="relative py-24 sm:py-28 lg:py-36 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Modern gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-warning/10 via-transparent to-destructive/5" />
        
        {/* Sophisticated pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        {/* Enhanced floating elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/6 w-4 h-4 bg-gradient-to-br from-warning to-warning-light rounded-full animate-pulse shadow-lg" />
          <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-gradient-to-br from-accent to-accent-light rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gradient-to-br from-destructive to-destructive-light rounded-full animate-pulse shadow-lg" style={{ animationDelay: '2s' }} />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-gradient-to-br from-primary to-primary-light rounded-full animate-pulse shadow-lg" style={{ animationDelay: '3s' }} />
          
          {/* Large ambient gradients using CSS variables */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-warning/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-destructive/5 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div 
          className="text-center mb-20 sm:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Enhanced Problem Alert Badge */}
          <motion.div 
            className="inline-flex items-center gap-4 mb-8 sm:mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-warning to-destructive shadow-2xl">
                <AlertCircle className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-warning opacity-30 animate-ping"></div>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold text-warning">
                Problem Statement
              </span>
              <span className="text-sm text-muted-foreground uppercase tracking-wide">
                Current State of AI Development
              </span>
            </div>
          </motion.div>

          {/* Enhanced Main Headline */}
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building AI Agents
            <span className="block mt-3 bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
              Shouldn&apos;t Be This Painful
            </span>
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p 
            className="max-w-4xl mx-auto text-xl sm:text-2xl leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Developers waste <span className="font-bold text-warning">months of valuable time</span> struggling with the same painful challenges. 
            <span className="block mt-2 text-foreground font-bold"> There&apos;s a better way to build AI that actually works.</span>
          </motion.p>
        </motion.div>

        {/* Enhanced Problems Grid */}
        <motion.div
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10 max-w-7xl mx-auto"
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
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${problem.background} backdrop-blur-xl border-2 ${problem.border} p-4 sm:p-5 lg:p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}>
                  {/* Subtle glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-40" />
                  
                  {/* Icon */}
                  <motion.div 
                    className="mb-4"
                    variants={iconVariants}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  >
                    <div className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-lg bg-gradient-to-br ${problem.gradient} shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {problem.title}
                    </h3>
                    <p className="text-sm lg:text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {problem.description}
                    </p>
                    
                    {/* Learn more indicator */}
                    <div className="mt-4 flex items-center text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span className="text-xs font-semibold">Learn how GraphBit solves this</span>
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${problem.gradient} transition-all duration-300 group-hover:w-full rounded-b-xl`} />
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
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-warning/10 to-accent/10 border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Impact Analysis
              </span>
            </motion.div>
            
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Measuring the Real Cost
              <span className="block mt-1 bg-gradient-to-r from-warning via-accent to-destructive bg-clip-text text-transparent">
                of These Problems
              </span>
            </motion.h3>
            
            <motion.p 
              className="max-w-2xl mx-auto text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Each challenge creates measurable business impact. Here&apos;s how severe these problems really are.
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
          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            <span className="text-foreground font-semibold">Sound familiar?</span> 
            {" "}Let&apos;s solve these problems together.
          </p>
          
          <motion.div
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors duration-300 cursor-pointer"
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
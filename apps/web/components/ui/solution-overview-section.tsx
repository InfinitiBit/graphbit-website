'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  Users,
  BarChart3 as Cpu,
  BarChart3 as Database,
  BarChart3 as Cloud,
  BarChart3 as GitBranch
} from 'lucide-react';
import { InteractiveArchitectureDiagram } from './interactive-architecture-diagram';
import { LiveCodeDemo } from './live-code-demo';
import { PerformanceComparison } from './performance-comparison';
import { VideoDemoPlayer } from './video-demo-player';

interface SolutionOverviewSectionProps {
  className?: string;
}

interface Benefit {
  id: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  color: string;
  gradient: string;
  bgGradient: string;
  features: string[];
}

const benefits: Benefit[] = [
  {
    id: 'lightning-fast',
    icon: Zap,
    title: 'Lightning Fast Deployment',
    shortDescription: 'Deploy AI agents in minutes, not days',
    detailedDescription: 'GraphBit\'s optimized architecture enables rapid deployment of AI agents with zero configuration overhead. Go from concept to production in under 5 minutes.',
    color: 'text-accent',
    gradient: 'from-accent to-accent-light',
    bgGradient: 'from-accent-lighter/50 to-accent-lighter/20',
    features: ['5-minute deployment', 'Zero configuration', 'Auto-scaling', 'Instant updates']
  },
  {
    id: 'enterprise-security',
    icon: Shield,
    title: 'Enterprise Security',
    shortDescription: 'Bank-grade security and compliance',
    detailedDescription: 'Built with enterprise security standards, GraphBit provides end-to-end encryption, role-based access control, and compliance with SOC 2, GDPR, and HIPAA.',
    color: 'text-primary',
    gradient: 'from-primary to-primary-light',
    bgGradient: 'from-primary-lighter/50 to-primary-lighter/20',
    features: ['End-to-end encryption', 'SOC 2 compliant', 'GDPR ready', 'Role-based access']
  },
  {
    id: 'intelligent-monitoring',
    icon: BarChart3,
    title: 'Intelligent Monitoring',
    shortDescription: 'Real-time insights and analytics',
    detailedDescription: 'Advanced monitoring and analytics provide deep insights into agent performance, user interactions, and system health with real-time dashboards and alerts.',
    color: 'text-success',
    gradient: 'from-success to-success-light',
    bgGradient: 'from-success-lighter/50 to-success-lighter/20',
    features: ['Real-time dashboards', 'Performance analytics', 'Smart alerts', 'Usage insights']
  },
  {
    id: 'seamless-integration',
    icon: GitBranch,
    title: 'Seamless Integration',
    shortDescription: 'Works with your existing stack',
    detailedDescription: 'GraphBit integrates seamlessly with your existing tools and workflows. Connect to any API, database, or service with our extensive library of connectors.',
    color: 'text-secondary',
    gradient: 'from-secondary to-secondary-light',
    bgGradient: 'from-secondary-lighter/50 to-secondary-lighter/20',
    features: ['100+ connectors', 'REST API support', 'Webhook integration', 'Custom adapters']
  },
  {
    id: 'cost-optimization',
    icon: Cpu,
    title: 'Cost Optimization',
    shortDescription: 'Reduce AI costs by up to 80%',
    detailedDescription: 'Smart resource management and optimization algorithms help you reduce AI infrastructure costs while maintaining or improving performance.',
    color: 'text-warning',
    gradient: 'from-warning to-warning-light',
    bgGradient: 'from-warning-lighter/50 to-warning-lighter/20',
    features: ['80% cost reduction', 'Smart scaling', 'Resource optimization', 'Usage analytics']
  },
  {
    id: 'team-collaboration',
    icon: Users,
    title: 'Team Collaboration',
    shortDescription: 'Built for modern teams',
    detailedDescription: 'Collaborative features enable teams to work together efficiently with shared workspaces, version control, and real-time collaboration tools.',
    color: 'text-accent',
    gradient: 'from-accent to-accent-light',
    bgGradient: 'from-accent-lighter/50 to-accent-lighter/20',
    features: ['Shared workspaces', 'Version control', 'Real-time collaboration', 'Team permissions']
  },
  {
    id: 'reliable-infrastructure',
    icon: Cloud,
    title: 'Reliable Infrastructure',
    shortDescription: '99.9% uptime guarantee',
    detailedDescription: 'Enterprise-grade infrastructure with automatic failover, global CDN, and redundant systems ensure your AI agents are always available.',
    color: 'text-primary',
    gradient: 'from-primary to-primary-light',
    bgGradient: 'from-primary-lighter/50 to-primary-lighter/20',
    features: ['99.9% uptime', 'Global CDN', 'Auto failover', 'Redundant systems']
  },
  {
    id: 'data-intelligence',
    icon: Database,
    title: 'Data Intelligence',
    shortDescription: 'Smart data processing and insights',
    detailedDescription: 'Advanced data processing capabilities with built-in analytics, machine learning pipelines, and intelligent data transformation tools.',
    color: 'text-success',
    gradient: 'from-success to-success-light',
    bgGradient: 'from-success-lighter/50 to-success-lighter/20',
    features: ['ML pipelines', 'Data transformation', 'Intelligent insights', 'Auto-processing']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3
    }
  }
};

const iconVariants = {
  hidden: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
};

const featuresVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4
    }
  }
};

function SolutionBenefitsGrid() {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-gray-50/30 to-white border border-gray-200/50 rounded-2xl p-6 sm:p-8 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-success text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles className="h-4 w-4" />
          Why Choose GraphBit
        </motion.div>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Comprehensive Solution Benefits
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Discover how GraphBit transforms AI development with enterprise-grade features, 
          lightning-fast performance, and seamless integration capabilities.
        </motion.p>
      </div>

      {/* Benefits Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={benefit.id}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.gradient} text-white mb-4`}
                  variants={iconVariants}
                >
                  <IconComponent className="h-6 w-6" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>

                {/* Short Description */}
                <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                  {benefit.shortDescription}
                </p>

                {/* Detailed Description (hidden by default, shown on hover) */}
                <motion.div
                  className="overflow-hidden"
                  initial="hidden"
                  whileHover="visible"
                >
                  <motion.div variants={featuresVariants}>
                    <p className="text-sm text-muted-foreground mb-4">
                      {benefit.detailedDescription}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2">
                      {benefit.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Learn More Button */}
                <motion.div
                  className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          { label: 'Faster Deployment', value: '10x', icon: Clock, color: 'accent' },
          { label: 'Cost Reduction', value: '80%', icon: Cpu, color: 'warning' },
          { label: 'Uptime Guarantee', value: '99.9%', icon: Cloud, color: 'primary' },
          { label: 'Team Members', value: 'Unlimited', icon: Users, color: 'success' }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}-lighter/50 rounded-lg mb-3`}>
                <IconComponent className={`h-6 w-6 text-${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-success/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-2xl" />
    </motion.div>
  );
}

export function SolutionOverviewSection({ className = "" }: SolutionOverviewSectionProps) {
  return (
    <section className={`relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden ${className}`}>
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/20 to-success/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-tl from-accent/20 to-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-success text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4" />
            Solution Overview
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            The Complete AI Development Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GraphBit provides everything you need to build, deploy, and scale AI agents 
            with enterprise-grade reliability and lightning-fast performance.
          </p>
        </motion.div>

        {/* Solution Benefits Grid */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SolutionBenefitsGrid />
        </motion.div>

        {/* Interactive Architecture Diagram */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InteractiveArchitectureDiagram className="max-w-6xl mx-auto" />
        </motion.div>

        {/* Live Code Demo */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <LiveCodeDemo />
        </motion.div>

        {/* Performance Comparison */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <PerformanceComparison />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary to-success rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your AI Development?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building the future with GraphBit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/95 transition-colors flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { metric: "10x", label: "Faster Deployment" },
            { metric: "99.9%", label: "Uptime Guarantee" },
            { metric: "Zero", label: "Security Incidents" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card/80 backdrop-blur-sm border border-border/30 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <div className="text-3xl font-bold text-foreground mb-2">{stat.metric}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Demo Player */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center mb-8">
            <motion.h3
              className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Live Product Demo
            </motion.h3>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Watch a step-by-step demonstration of GraphBit in action, featuring custom controls, chapter navigation, and accessibility features.
            </motion.p>
          </div>
          <VideoDemoPlayer />
        </motion.div>
      </div>
    </section>
  );
}
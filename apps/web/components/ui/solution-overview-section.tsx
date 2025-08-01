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
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-orange-600',
    bgGradient: 'from-yellow-50 to-orange-50',
    features: ['5-minute deployment', 'Zero configuration', 'Auto-scaling', 'Instant updates']
  },
  {
    id: 'enterprise-security',
    icon: Shield,
    title: 'Enterprise Security',
    shortDescription: 'Bank-grade security and compliance',
    detailedDescription: 'Built with enterprise security standards, GraphBit provides end-to-end encryption, role-based access control, and compliance with SOC 2, GDPR, and HIPAA.',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    features: ['End-to-end encryption', 'SOC 2 compliant', 'GDPR ready', 'Role-based access']
  },
  {
    id: 'intelligent-monitoring',
    icon: BarChart3,
    title: 'Intelligent Monitoring',
    shortDescription: 'Real-time insights and analytics',
    detailedDescription: 'Advanced monitoring and analytics provide deep insights into agent performance, user interactions, and system health with real-time dashboards and alerts.',
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    features: ['Real-time dashboards', 'Performance analytics', 'Smart alerts', 'Usage insights']
  },
  {
    id: 'seamless-integration',
    icon: GitBranch,
    title: 'Seamless Integration',
    shortDescription: 'Works with your existing stack',
    detailedDescription: 'GraphBit integrates seamlessly with your existing tools and workflows. Connect to any API, database, or service with our extensive library of connectors.',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50',
    features: ['100+ connectors', 'REST API support', 'Webhook integration', 'Custom adapters']
  },
  {
    id: 'cost-optimization',
    icon: Cpu,
    title: 'Cost Optimization',
    shortDescription: 'Reduce AI costs by up to 80%',
    detailedDescription: 'Smart resource management and optimization algorithms help you reduce AI infrastructure costs while maintaining or improving performance.',
    color: 'text-red-600',
    gradient: 'from-red-500 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50',
    features: ['80% cost reduction', 'Smart scaling', 'Resource optimization', 'Usage analytics']
  },
  {
    id: 'team-collaboration',
    icon: Users,
    title: 'Team Collaboration',
    shortDescription: 'Built for modern teams',
    detailedDescription: 'Collaborative features enable teams to work together efficiently with shared workspaces, version control, and real-time collaboration tools.',
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-blue-600',
    bgGradient: 'from-indigo-50 to-blue-50',
    features: ['Shared workspaces', 'Version control', 'Real-time collaboration', 'Team permissions']
  },
  {
    id: 'reliable-infrastructure',
    icon: Cloud,
    title: 'Reliable Infrastructure',
    shortDescription: '99.9% uptime guarantee',
    detailedDescription: 'Enterprise-grade infrastructure with automatic failover, global CDN, and redundant systems ensure your AI agents are always available.',
    color: 'text-cyan-600',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    features: ['99.9% uptime', 'Global CDN', 'Auto failover', 'Redundant systems']
  },
  {
    id: 'data-intelligence',
    icon: Database,
    title: 'Data Intelligence',
    shortDescription: 'Smart data processing and insights',
    detailedDescription: 'Advanced data processing capabilities with built-in analytics, machine learning pipelines, and intelligent data transformation tools.',
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-50 to-green-50',
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
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles className="h-4 w-4" />
          Why Choose GraphBit
        </motion.div>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Comprehensive Solution Benefits
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
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
              className="group relative bg-white border border-gray-200/50 rounded-xl p-6 hover:border-gray-300/50 transition-all duration-300 overflow-hidden"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {benefit.title}
                </h3>

                {/* Short Description */}
                <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                  {benefit.shortDescription}
                </p>

                {/* Detailed Description (hidden by default, shown on hover) */}
                <motion.div
                  className="overflow-hidden"
                  initial="hidden"
                  whileHover="visible"
                >
                  <motion.div variants={featuresVariants}>
                    <p className="text-sm text-gray-500 mb-4">
                      {benefit.detailedDescription}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2">
                      {benefit.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-gray-600"
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
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
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-${benefit.color.split('-')[1]}-200/30 transition-colors duration-300`} />
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
          { label: 'Faster Deployment', value: '10x', icon: Clock },
          { label: 'Cost Reduction', value: '80%', icon: Cpu },
          { label: 'Uptime Guarantee', value: '99.9%', icon: Cloud },
          { label: 'Team Members', value: 'Unlimited', icon: Users }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                <IconComponent className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-green-500/10 rounded-full blur-2xl" />
    </motion.div>
  );
}

export function SolutionOverviewSection({ className = "" }: SolutionOverviewSectionProps) {
  return (
    <section className={`relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden ${className}`}>
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4" />
            Solution Overview
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            The Complete AI Development Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your AI Development?
            </h3>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building the future with GraphBit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
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
              className="text-center p-6 bg-white/50 backdrop-blur-sm border border-gray-200/30 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.metric}</div>
              <div className="text-gray-600">{stat.label}</div>
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
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Live Product Demo
            </motion.h3>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
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
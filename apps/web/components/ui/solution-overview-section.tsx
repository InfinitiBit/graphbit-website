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
    detailedDescription: 'GraphBit\'s optimized architecture enables rapid deployment of AI agents with zero configuration overhead. Go from concept to production in under 5 minutes with our streamlined CI/CD pipeline.',
    color: 'text-warning',
    gradient: 'from-warning to-warning-light',
    bgGradient: 'from-warning-lighter/50 to-warning-lighter/20',
    features: ['5-minute deployment', 'Zero configuration', 'Auto-scaling', 'Instant updates', 'Hot reloading', 'Docker support', 'Kubernetes ready', 'Multi-cloud deployment']
  },
  {
    id: 'enterprise-security',
    icon: Shield,
    title: 'Enterprise Security',
    shortDescription: 'Bank-grade security and compliance',
    detailedDescription: 'Built with enterprise security standards, GraphBit provides end-to-end encryption, role-based access control, and compliance with SOC 2, GDPR, HIPAA, and PCI DSS requirements.',
    color: 'text-destructive',
    gradient: 'from-destructive to-destructive-light',
    bgGradient: 'from-destructive-lighter/50 to-destructive-lighter/20',
    features: ['End-to-end encryption', 'SOC 2 compliant', 'GDPR ready', 'Role-based access', 'Multi-factor auth', 'Audit logging', 'Threat detection', 'Zero-trust security']
  },
  {
    id: 'intelligent-monitoring',
    icon: BarChart3,
    title: 'Intelligent Monitoring',
    shortDescription: 'Real-time insights and analytics',
    detailedDescription: 'Advanced monitoring and analytics provide deep insights into agent performance, user interactions, and system health with real-time dashboards, predictive alerts, and automated incident response.',
    color: 'text-accent',
    gradient: 'from-accent to-accent-light',
    bgGradient: 'from-accent-lighter/50 to-accent-lighter/20',
    features: ['Real-time dashboards', 'Performance analytics', 'Smart alerts', 'Usage insights', 'Error tracking', 'Custom metrics', 'A/B testing', 'Anomaly detection']
  },
  {
    id: 'seamless-integration',
    icon: GitBranch,
    title: 'Seamless Integration',
    shortDescription: 'Works with your existing stack',
    detailedDescription: 'GraphBit integrates seamlessly with your existing tools and workflows. Connect to any API, database, or service with our extensive library of pre-built connectors and custom integration framework.',
    color: 'text-warning',
    gradient: 'from-warning to-destructive',
    bgGradient: 'from-warning-lighter/50 to-destructive-lighter/20',
    features: ['100+ connectors', 'REST API support', 'Webhook integration', 'Custom adapters', 'GraphQL support', 'Database sync', 'Legacy system support', 'No-code integrations']
  },
  {
    id: 'cost-optimization',
    icon: Cpu,
    title: 'Cost Optimization',
    shortDescription: 'Reduce AI costs by up to 80%',
    detailedDescription: 'Smart resource management and optimization algorithms help you reduce AI infrastructure costs while maintaining or improving performance through intelligent caching, load balancing, and resource allocation.',
    color: 'text-warning',
    gradient: 'from-warning to-warning-light',
    bgGradient: 'from-warning-lighter/50 to-warning-lighter/20',
    features: ['80% cost reduction', 'Smart scaling', 'Resource optimization', 'Usage analytics', 'Predictive scaling', 'Spot instance support', 'Cost alerts', 'ROI tracking']
  },
  {
    id: 'team-collaboration',
    icon: Users,
    title: 'Team Collaboration',
    shortDescription: 'Built for modern teams',
    detailedDescription: 'Collaborative features enable teams to work together efficiently with shared workspaces, version control, real-time collaboration tools, and integrated communication channels for seamless development workflows.',
    color: 'text-destructive',
    gradient: 'from-destructive to-accent',
    bgGradient: 'from-destructive-lighter/50 to-accent-lighter/20',
    features: ['Shared workspaces', 'Version control', 'Real-time collaboration', 'Team permissions', 'Code reviews', 'Branch management', 'Merge conflicts', 'Team analytics']
  },
  {
    id: 'reliable-infrastructure',
    icon: Cloud,
    title: 'Reliable Infrastructure',
    shortDescription: '99.9% uptime guarantee',
    detailedDescription: 'Enterprise-grade infrastructure with automatic failover, global CDN, and redundant systems ensure your AI agents are always available with guaranteed SLA and 24/7 monitoring across multiple regions.',
    color: 'text-accent',
    gradient: 'from-accent to-warning',
    bgGradient: 'from-accent-lighter/50 to-warning-lighter/20',
    features: ['99.9% uptime', 'Global CDN', 'Auto failover', 'Redundant systems', 'Load balancing', 'Health checks', 'Disaster recovery', 'Multi-region support']
  },
  {
    id: 'data-intelligence',
    icon: Database,
    title: 'Data Intelligence',
    shortDescription: 'Smart data processing and insights',
    detailedDescription: 'Advanced data processing capabilities with built-in analytics, machine learning pipelines, intelligent data transformation tools, and automated data quality monitoring for comprehensive data management.',
    color: 'text-warning',
    gradient: 'from-warning to-accent',
    bgGradient: 'from-warning-lighter/50 to-accent-lighter/20',
    features: ['ML pipelines', 'Data transformation', 'Intelligent insights', 'Auto-processing', 'Data validation', 'Schema evolution', 'Real-time streaming', 'Data lineage tracking']
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
    y: -1,
    scale: 1.005,
    transition: {
      duration: 0.3
    }
  }
};

const iconVariants = {
  hidden: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.05,
    rotate: 2,
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
      className="relative bg-gradient-to-br from-card via-card/50 to-card border border-border/30 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <motion.div
          className="inline-flex items-center gap-3 bg-gradient-to-r from-warning to-destructive text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles className="h-5 w-5" />
          Why Choose GraphBit
        </motion.div>
        <motion.h2
          className="text-4xl sm:text-5xl font-black text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Comprehensive Solution Benefits
        </motion.h2>
        <motion.p
          className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Discover how GraphBit transforms AI development with <span className="font-bold text-foreground">enterprise-grade features</span>, 
          lightning-fast performance, and seamless integration capabilities.
        </motion.p>
      </div>

      {/* Enhanced Benefits Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {benefits.map((benefit) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={benefit.id}
              className="group relative bg-gradient-to-br from-background/95 to-warning/5 border border-warning/20 rounded-xl p-3 lg:p-4 hover:border-warning/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Enhanced background effects */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-warning to-destructive opacity-0 blur transition-all duration-300 group-hover:opacity-10" />
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Enhanced Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-gradient-to-r ${benefit.gradient} text-white mb-2 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1`}
                  variants={iconVariants}
                >
                  <IconComponent className="h-4 w-4 lg:h-5 lg:w-5" />
                </motion.div>

                {/* Enhanced Title */}
                <h3 className="text-base lg:text-lg font-bold text-foreground mb-1.5 group-hover:text-warning transition-colors duration-300 leading-tight">
                  {benefit.title}
                </h3>

                {/* Enhanced Description */}
                <p className="text-xs lg:text-sm text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                  {benefit.shortDescription}
                </p>

                {/* Enhanced Features on Hover */}
                <motion.div
                  className="overflow-hidden"
                  initial="hidden"
                  whileHover="visible"
                >
                  <motion.div variants={featuresVariants}>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {benefit.detailedDescription}
                    </p>
                    
                    {/* Enhanced Features List */}
                    <div className="space-y-1.5">
                      {benefit.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-1.5 text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                          <span className="text-xs font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Enhanced Learn More Button */}
                <motion.div
                  className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <button className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold hover:text-accent transition-colors group-hover:translate-x-1">
                    Learn more
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
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
              <div className={`inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-${stat.color}-lighter/50 rounded-lg mb-2`}>
                <IconComponent className={`h-5 w-5 lg:h-6 lg:w-6 text-${stat.color}`} />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs lg:text-sm text-muted-foreground">{stat.label}</div>
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
    <section className={`relative py-24 sm:py-28 lg:py-36 bg-gradient-to-r from-background/95 to-warning/5 overflow-hidden ${className}`}>
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px] opacity-10"></div>
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-gradient-to-br from-warning/10 to-destructive/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-gradient-to-tl from-accent/10 to-warning/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-br from-destructive/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-warning to-destructive text-white px-6 py-3 rounded-2xl text-sm font-bold mb-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="h-5 w-5" />
            Solution Overview
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8">
            The Complete AI Development
            <span className="block mt-2 bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
              Platform That Scales
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            GraphBit provides everything you need to build, deploy, and scale AI agents 
            with <span className="font-bold text-foreground">enterprise-grade reliability</span> and lightning-fast performance.
          </p>
        </motion.div>

        {/* Enhanced Solution Benefits Grid */}
        <motion.div
          className="mb-24"
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
          <div className="bg-gradient-to-r from-warning to-destructive rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your AI Development?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building the future with GraphBit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-warning px-8 py-3 rounded-lg font-semibold hover:bg-white/95 transition-colors flex items-center justify-center gap-2">
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
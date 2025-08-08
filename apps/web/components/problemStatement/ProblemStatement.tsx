'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { BeforeAfterComparison } from '../ui/before-after-comparison';
import { ChaosVisualization } from '../ui/chaos-visualization';
import { CostCalculator } from '../ui/cost-calculator';
import { ScrollSeverityMeters } from '../ui/severity-meter';
import { StatisticsShowcase } from './StatisticsShowcase';
import { problems, severityData } from './problem-statement-data';
import { ProblemCard } from './ProblemCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
  },
};

export function ProblemStatementSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background py-24 sm:py-28 lg:py-36">
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
          <div className="left-1/6 absolute top-1/4 h-4 w-4 animate-pulse rounded-full bg-gradient-to-br from-warning to-warning-light shadow-lg" />
          <div
            className="right-1/5 absolute top-1/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-br from-accent to-accent-light shadow-lg"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 h-3 w-3 animate-pulse rounded-full bg-gradient-to-br from-destructive to-destructive-light shadow-lg"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute right-1/3 top-2/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg"
            style={{ animationDelay: '3s' }}
          />

          {/* Large ambient gradients using CSS variables */}
          <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-warning/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-destructive/5 to-transparent blur-3xl" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          className="mb-20 text-center sm:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Enhanced Problem Alert Badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-4 sm:mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-warning to-destructive shadow-2xl sm:h-18 sm:w-18">
                <AlertCircle className="h-8 w-8 text-white sm:h-9 sm:w-9" />
              </div>
              <div className="absolute inset-0 animate-ping rounded-2xl bg-warning opacity-30"></div>
            </div>
            <div>
              <span className="block text-xl font-bold text-warning sm:text-2xl">
                Problem Statement
              </span>
              <span className="text-sm uppercase tracking-wide text-muted-foreground">
                Current State of AI Development
              </span>
            </div>
          </motion.div>

          {/* Enhanced Main Headline */}
          <motion.h2
            className="mb-8 text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building AI Agents
            <span className="mt-3 block bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
              Shouldn&apos;t Be This Painful
            </span>
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p
            className="mx-auto max-w-4xl text-xl leading-relaxed text-muted-foreground sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Developers waste <span className="font-bold text-warning">months of valuable time</span>{' '}
            struggling with the same painful challenges.
            <span className="mt-2 block font-bold text-foreground">
              {' '}
              There&apos;s a better way to build Agentic AI that&apos;s Concurrent.
            </span>
          </motion.p>
        </motion.div>

        {/* Enhanced Problems Grid */}
        <motion.div
          className="mx-auto grid max-w-7xl gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              problem={problem}
              index={index}
              itemVariants={itemVariants}
              iconVariants={iconVariants}
            />
          ))}
        </motion.div>

        {/* Statistics Showcase Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <StatisticsShowcase className="mx-auto max-w-6xl" />
        </motion.div>

        {/* Chaos Visualization Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ChaosVisualization className="mx-auto max-w-6xl" />
        </motion.div>

        {/* Severity Meters Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Severity Section Header */}
          <div className="mb-12 text-center sm:mb-16">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-warning/10 to-accent/10 px-4 py-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Impact Analysis
              </span>
            </motion.div>

            <motion.h3
              className="mb-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Measuring the Real Cost
              <span className="mt-1 block bg-gradient-to-r from-warning via-accent to-destructive bg-clip-text text-transparent">
                of These Problems
              </span>
            </motion.h3>

            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Each challenge creates measurable business impact. Here&apos;s how severe these
              problems really are.
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
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <CostCalculator className="mx-auto max-w-6xl" />
        </motion.div>

        {/* Before/After Comparison Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <BeforeAfterComparison className="mx-auto max-w-6xl" />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center sm:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="mb-6 text-lg text-muted-foreground sm:text-xl">
            <span className="font-semibold text-foreground">Sound familiar?</span> Let&apos;s solve
            these problems together.
          </p>

          <motion.div
            className="inline-flex cursor-pointer items-center gap-2 font-semibold text-primary transition-colors duration-300 hover:text-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>See how GraphBit solves this</span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              →
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

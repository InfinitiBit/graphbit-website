'use client';

import { AdaptiveBackground } from '@/components/ui/adaptive-background';
import { AnimatedHeroStats } from '@/components/ui/animated-hero-stats';
import { CTAButtonGroup } from '@/components/ui/interactive-cta-buttons';
import { SimpleScrollIndicator } from '@/components/ui/simple-scroll-indicator';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, Users, Zap } from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function HeroSection() {
  const [primaryButtonState, setPrimaryButtonState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  // Handle primary CTA click (Get Started)
  const handleGetStarted = async () => {
    setPrimaryButtonState('loading');

    try {
      // Simulate API call or form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to marketplace or show success
      setPrimaryButtonState('success');

      // Reset after showing success
      setTimeout(() => {
        setPrimaryButtonState('idle');
        // Navigate to marketplace
        window.location.href = '/marketplace';
      }, 1500);
    } catch (error) {
      setPrimaryButtonState('error');

      // Reset after showing error
      setTimeout(() => {
        setPrimaryButtonState('idle');
      }, 2000);
    }
  };

  // Handle secondary CTA click (Watch Demo)
  const handleWatchDemo = () => {
    // Open demo video modal or navigate to demo page
    console.log('Opening demo video...');
    // You can implement modal logic here or navigate to demo page
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Adaptive Background System */}
      <AdaptiveBackground />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-6xl text-center"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Announcement Badge */}
          <motion.div className="mb-4 sm:mb-6" variants={fadeInUp}>
            <span className="hover:shadow-3xl group inline-flex items-center gap-3 rounded-full border border-primary/20 bg-gradient-to-r from-background/95 to-primary-lighter/10 px-6 py-3 text-sm font-semibold text-foreground shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-primary/30 sm:px-8 sm:py-4">
              <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg sm:h-8 sm:w-8">
                <Sparkles className="h-3 w-3 animate-pulse text-white sm:h-4 sm:w-4" />
                <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-br from-primary to-accent opacity-50"></div>
              </div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium">
                🚀 Introducing AI Agent Marketplace & LLM Tracing
              </span>
              <ArrowRight className="h-4 w-4 text-primary transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110 sm:h-5 sm:w-5" />
            </span>
          </motion.div>

          {/* Main Headlines */}
          <motion.h1
            className="mx-auto mb-3 max-w-5xl text-3xl font-extrabold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            variants={fadeInUp}
          >
            <span className="block bg-gradient-to-r from-secondary to-muted-dark bg-clip-text text-transparent drop-shadow-sm">
              Build AI Agents
            </span>
            <span className="mt-1 block bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent sm:mt-2">
              That Actually Work
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mx-auto mb-4 max-w-3xl text-base font-light leading-relaxed text-muted-foreground sm:mb-6 sm:text-lg lg:text-xl"
            variants={fadeInUp}
          >
            Download <span className="font-semibold text-foreground">production-ready AI agents</span>
            , track every LLM interaction, and scale your AI applications with{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-semibold text-transparent">
              confidence
            </span>
            .
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div variants={fadeInUp}>
            <CTAButtonGroup
              primaryText="Get Started"
              secondaryText="Watch Demo"
              onPrimaryClick={handleGetStarted}
              onSecondaryClick={handleWatchDemo}
              primaryState={primaryButtonState}
              className="mb-6 sm:mb-8"
            />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mb-8 flex flex-wrap items-center justify-center gap-4 opacity-70 sm:mb-10 sm:gap-6"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>500+ Ready Agents</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>10k+ Developers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-accent" />
              <span>99.9% Uptime</span>
            </div>
          </motion.div>

          {/* Animated Statistics */}
          <motion.div variants={fadeInUp} className="w-full">
            <AnimatedHeroStats />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <SimpleScrollIndicator targetSectionId="features-section" />
    </section>
  );
}

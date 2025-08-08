'use client';

import { AnimatedHeroStats } from '@/components/ui/animated-hero-stats';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Code, Shield, Star, Zap } from 'lucide-react';

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
  const [githubStars, setGithubStars] = useState<number | null>(null);

  // Fetch GitHub stars
  useEffect(() => {
    const fetchGithubStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/graphbit-org/graphbit');
        const data = await response.json();
        setGithubStars(data.stargazers_count);
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
        // Fallback to a default number
        setGithubStars(1200);
      }
    };

    fetchGithubStars();
  }, []);

  // Handle primary CTA click (Get Started)
  const handleGetStarted = () => {
    // Navigate to marketplace
    window.location.href = '/marketplace';
  };

  // Handle secondary CTA click (Learn Framework)
  const handleLearnFramework = () => {
    // Navigate to GitHub repository
    window.open('https://github.com/graphbit-org/graphbit', '_blank');
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background px-4 pt-24 sm:px-6 lg:px-8 lg:pt-32">
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
            className="absolute right-1/3 top-2/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-br from-warning to-warning-light shadow-lg"
            style={{ animationDelay: '3s' }}
          />

          {/* Large ambient gradients using CSS variables */}
          <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-warning/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-destructive/5 to-transparent blur-3xl" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto py-8 sm:py-12 lg:py-16">
        <motion.div
          className="mx-auto max-w-7xl text-center"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Framework Badge */}
          <motion.div className="mx-auto mb-6 flex items-center justify-center" variants={fadeInUp}>
            <div className="flex items-center gap-3 rounded-full border border-warning/20 bg-gradient-to-r from-warning/10 to-destructive/10 px-6 py-3">
              <Code className="h-5 w-5 text-warning" />
              <span className="text-sm font-semibold text-foreground">GraphBit Framework</span>
              {githubStars && (
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span>{githubStars.toLocaleString()}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Enhanced Main Headlines */}
          <motion.h1
            className="mx-auto mb-4 max-w-6xl text-2xl font-black leading-tight tracking-tight sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight lg:text-5xl xl:text-6xl"
            variants={fadeInUp}
          >
            <span className="block bg-gradient-to-r from-foreground via-foreground to-secondary bg-clip-text text-transparent drop-shadow-sm">
              The Open-Source Framework
            </span>
            <span className="mt-2 block bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent sm:mt-3">
              Powering Enterprise-Grade Agentic AI
            </span>
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p
            className="mx-auto mb-6 max-w-3xl px-4 text-sm font-medium leading-relaxed text-muted-foreground sm:mb-8 sm:px-0 sm:text-base md:text-lg lg:text-xl"
            variants={fadeInUp}
          >
            <span className="font-bold text-foreground">GraphBit Framework</span> simplifies the
            complexity of building AI agents as It&apos;s Build with{' '}
            <span className="font-bold text-warning">Rust &amp; Wrapped with Python</span>. Our
            cloud platform is built on top of this proven foundation, trusted by developers
            worldwide.{' '}
            <span className="mt-2 block font-bold text-foreground">
              Start with the framework, scale with the cloud.
            </span>
          </motion.p>

          {/* Enhanced CTA Section */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex flex-col items-center gap-3 px-4 sm:flex-row sm:justify-center sm:gap-4 sm:px-0 lg:gap-6">
              <motion.button
                onClick={handleGetStarted}
                className="hover:scale-102 touch-target group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-warning to-destructive px-6 py-3 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-base lg:px-10 lg:py-5 lg:text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-destructive to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative flex items-center gap-3">
                  <Zap className="h-6 w-6" />
                  Try Cloud Platform
                </span>
              </motion.button>

              <motion.button
                onClick={handleLearnFramework}
                className="touch-target group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-border/50 bg-background/80 px-4 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-warning/30 hover:bg-background/90 hover:shadow-md sm:w-auto sm:px-6 sm:py-4 sm:text-base lg:px-8 lg:py-5 lg:text-lg"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-warning/10 to-destructive/10">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-warning to-destructive">
                    <Code className="h-3 w-3 text-white" />
                  </div>
                </div>
                Explore Framework
              </motion.button>
            </div>
          </motion.div>

          {/* Framework Success Metrics */}
          <motion.div
            className="mb-8 flex flex-col flex-wrap items-center justify-center gap-3 px-4 sm:mb-10 sm:flex-row sm:gap-4 sm:px-0 lg:gap-6"
            variants={fadeInUp}
          >
            <div className="flex min-w-0 flex-shrink-0 items-center gap-3 rounded-full bg-green-500/20 px-3 py-2 text-green-700 dark:text-green-300 sm:px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold sm:text-base">10x Faster Development</span>
            </div>
            <div className="flex min-w-0 flex-shrink-0 items-center gap-3 rounded-full bg-blue-500/20 px-3 py-2 text-blue-700 dark:text-blue-300 sm:px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold sm:text-base">Enterprise Security</span>
            </div>
            <div className="flex min-w-0 flex-shrink-0 items-center gap-3 rounded-full bg-purple-500/20 px-3 py-2 text-purple-700 dark:text-purple-300 sm:px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                <Star className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold sm:text-base">Production Ready</span>
            </div>
          </motion.div>

          {/* Social Proof Section */}
          <motion.div className="mb-10 text-center" variants={fadeInUp}>
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Trusted by innovative teams worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 opacity-60 sm:gap-8 lg:gap-12">
              {[
                'Startups',
                'Enterprise',
                'Research Labs',
                'AI Companies',
                'Fortune 500',
                'Open Source',
              ].map((segment, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gradient-to-r from-warning/10 to-destructive/10 px-3 py-2 text-sm font-bold text-muted-foreground transition-opacity hover:opacity-100 sm:px-6 sm:py-3 sm:text-base"
                >
                  {segment}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Animated Statistics */}
          <motion.div variants={fadeInUp} className="w-full">
            <AnimatedHeroStats />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

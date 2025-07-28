'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedHeroStats } from '@/components/ui/animated-hero-stats';
import { AdaptiveBackground } from '@/components/ui/adaptive-background';
import { CTAButtonGroup } from '@/components/ui/interactive-cta-buttons';
import { SimpleScrollIndicator } from '@/components/ui/simple-scroll-indicator';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Users,
  Zap,
  Star as Rocket,
  Activity,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function HeroSection() {
  const [primaryButtonState, setPrimaryButtonState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Handle primary CTA click (Get Started)
  const handleGetStarted = async () => {
    setPrimaryButtonState('loading');
    
    try {
      // Simulate API call or form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Adaptive Background System */}
      <AdaptiveBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Announcement Badge */}
          <motion.div 
            className="mb-4 sm:mb-6"
            variants={fadeInUp}
          >
            <span className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/80 to-gray-50/80 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-gray-900 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:shadow-3xl hover:scale-105">
              <div className="relative flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-50 animate-ping"></div>
              </div>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                🚀 Introducing AI Agent Marketplace & LLM Tracing
              </span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </span>
          </motion.div>

          {/* Main Headlines */}
          <motion.h1 
            className="mx-auto mb-3 sm:mb-4 max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight"
            variants={fadeInUp}
          >
            <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
              Build AI Agents
            </span>
            <span className="mt-1 sm:mt-2 block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              That Actually Work
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="mx-auto mb-4 sm:mb-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 font-light"
            variants={fadeInUp}
          >
            Download <span className="font-semibold text-gray-800">production-ready AI agents</span>, track every LLM interaction, 
            and scale your AI applications with <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">confidence</span>.
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
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 opacity-60 mb-8 sm:mb-10"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>500+ Ready Agents</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="h-4 w-4 text-blue-500" />
              <span>10k+ Developers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>99.9% Uptime</span>
            </div>
          </motion.div>

          {/* Animated Statistics */}
          <motion.div
            variants={fadeInUp}
            className="w-full"
          >
            <AnimatedHeroStats />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <SimpleScrollIndicator targetSectionId="features-section" />
    </section>
  );
}
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star as Rocket, ArrowRight as Play, Clock as Loader2, ArrowRight, Star as Sparkles } from 'lucide-react';

// Button state types
type ButtonState = 'idle' | 'loading' | 'success' | 'error';

// Primary CTA Button Component
interface PrimaryCTAProps {
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
  state?: ButtonState;
  disabled?: boolean;
  className?: string;
}

export function PrimaryCTAButton({ 
  onClick, 
  children, 
  state = 'idle', 
  disabled = false,
  className = ''
}: PrimaryCTAProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleCounter = useRef(0);

  // Handle click with ripple effect
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || state === 'loading') return;

    // Create ripple effect
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: rippleCounter.current++, x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    if (onClick) {
      await onClick();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(false);
      if (onClick) onClick();
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`
        group relative overflow-hidden
        px-8 py-4 text-lg font-semibold rounded-2xl
        bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700
        hover:from-blue-700 hover:via-purple-700 hover:to-blue-800
        text-white shadow-2xl
        border-0 cursor-pointer
        focus:outline-none focus:ring-4 focus:ring-blue-500/50
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300 ease-out
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${className}
      `}
      disabled={disabled || state === 'loading'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Get started with GraphBit AI platform"
      aria-describedby="primary-cta-description"
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        <AnimatePresence mode="wait">
          {state === 'loading' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-3"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading...</span>
            </motion.div>
          ) : state === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-3"
            >
              <Sparkles className="h-5 w-5" />
              <span>Success!</span>
            </motion.div>
          ) : state === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-3"
            >
              <span>Try Again</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ 
                  rotate: isHovered ? 12 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <Rocket className="h-5 w-5" />
              </motion.div>
              <span>{children}</span>
              <motion.div
                animate={{ 
                  x: isHovered ? 4 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full pointer-events-none"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0], 
                  y: [-20, -40, -60] 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Hidden description for screen readers */}
      <span id="primary-cta-description" className="sr-only">
        Start your journey with GraphBit&apos;s AI agent marketplace and LLM tracing platform
      </span>
    </motion.button>
  );
}

// Secondary CTA Button Component
interface SecondaryCTAProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function SecondaryCTAButton({ 
  onClick, 
  children, 
  disabled = false,
  className = ''
}: SecondaryCTAProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleCounter = useRef(0);

  // Handle click with ripple effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Create ripple effect
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: rippleCounter.current++, x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    if (onClick) onClick();
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`
        group relative overflow-hidden
        px-8 py-4 text-lg font-semibold rounded-2xl
        border-2 border-gray-300 hover:border-gray-400
        bg-white/80 hover:bg-white backdrop-blur-sm
        text-gray-700 hover:text-gray-900
        shadow-lg hover:shadow-xl
        focus:outline-none focus:ring-4 focus:ring-gray-500/30
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300 ease-out
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${className}
      `}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Watch GraphBit platform demo video"
      aria-describedby="secondary-cta-description"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-blue-400/50"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ 
          opacity: isHovered ? [0, 1, 0] : 0,
          scale: isHovered ? [1, 1.05, 1.1] : 1
        }}
        transition={{ 
          duration: 1.5, 
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut'
        }}
      />

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute bg-gray-400/20 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {/* Play icon with hover animation */}
        <motion.div
          className="relative"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <Play className="h-5 w-5 fill-current" />
          
          {/* Pulsing ring around play icon */}
          <motion.div
            className="absolute inset-0 border-2 border-current rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ 
              scale: isHovered ? [1, 1.5, 2] : 1,
              opacity: isHovered ? [0.5, 0.2, 0] : 0
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isHovered ? Infinity : 0,
              ease: 'easeOut'
            }}
          />
        </motion.div>
        
        <span>{children}</span>
      </div>

      {/* Floating sound waves on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute right-4 top-1/2 w-1 bg-gray-400/30 rounded-full"
                style={{ height: `${8 + i * 4}px` }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0], 
                  scaleY: [0, 1, 0],
                  x: [0, 10, 20]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Hidden description for screen readers */}
      <span id="secondary-cta-description" className="sr-only">
        Watch a demonstration of GraphBit&apos;s AI platform features and capabilities
      </span>
    </motion.button>
  );
}

// CTA Button Group Component
interface CTAButtonGroupProps {
  primaryText?: string;
  secondaryText?: string;
  onPrimaryClick?: () => void | Promise<void>;
  onSecondaryClick?: () => void;
  primaryState?: ButtonState;
  disabled?: boolean;
  className?: string;
}

export function CTAButtonGroup({
  primaryText = "Get Started",
  secondaryText = "Watch Demo",
  onPrimaryClick,
  onSecondaryClick,
  primaryState = 'idle',
  disabled = false,
  className = ''
}: CTAButtonGroupProps) {
  return (
    <motion.div 
      className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <PrimaryCTAButton
        onClick={onPrimaryClick}
        state={primaryState}
        disabled={disabled}
        className="w-full sm:w-auto"
      >
        {primaryText}
      </PrimaryCTAButton>
      
      <SecondaryCTAButton
        onClick={onSecondaryClick}
        disabled={disabled}
        className="w-full sm:w-auto"
      >
        {secondaryText}
      </SecondaryCTAButton>
    </motion.div>
  );
}
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mouse, ArrowDown } from 'lucide-react';

// Types
interface ScrollIndicatorProps {
  targetSectionId?: string;
  className?: string;
  variant?: 'arrow' | 'mouse' | 'chevron';
  position?: 'center' | 'left' | 'right';
}

// Hook for detecting user interaction and scroll
function useScrollVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      
      // Hide immediately when user starts scrolling down
      if (currentScrollY > 20) {
        setHasScrolled(true);
        setIsVisible(false);
      }
      
      // Show again only if user scrolls back to the very top
      if (currentScrollY <= 5) {
        setIsVisible(true);
        // Reset hasScrolled when back at top
        if (currentScrollY === 0) {
          setHasScrolled(false);
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Auto-hide after 4 seconds of no interaction (only when at top)
    const resetTimeout = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Only set timeout if we're at the top of the page
      if (window.scrollY <= 5) {
        scrollTimeoutRef.current = setTimeout(() => {
          if (window.scrollY <= 5) { // Double check we're still at top
            setIsVisible(false);
          }
        }, 4000);
      }
    };

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);
    window.addEventListener('touchstart', resetTimeout);

    // Initial timeout
    resetTimeout();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
      window.removeEventListener('touchstart', resetTimeout);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [hasScrolled]);

  return { isVisible, hasScrolled };
}

// Hook for touch gestures
function useTouchGestures(onSwipeUp: () => void) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Detect swipe up gesture
    const isSwipeUp = deltaY < -50 && Math.abs(deltaX) < 100 && deltaTime < 500;
    
    if (isSwipeUp) {
      onSwipeUp();
    }

    touchStartRef.current = null;
  }, [onSwipeUp]);

  return { handleTouchStart, handleTouchEnd };
}

// Arrow variant component
function ArrowIndicator({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Animated arrows */}
      <div className="relative">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.3, y: 0 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [0, 8, 16],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
            className="absolute"
          >
            <ChevronDown className="w-6 h-6 text-white drop-shadow-lg group-hover:text-blue-200 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Scroll text */}
      <motion.span
        className="text-white/80 text-sm font-medium mt-8 group-hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Scroll to explore
      </motion.span>
    </motion.div>
  );
}

// Mouse variant component
function MouseIndicator({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Mouse container */}
      <div className="relative w-6 h-10 border-2 border-white/60 rounded-full group-hover:border-white transition-colors">
        {/* Scroll wheel animation */}
        <motion.div
          className="absolute top-2 left-1/2 w-1 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"
          style={{ x: '-50%' }}
          animate={{
            y: [0, 12, 0],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 border-2 border-white/30 rounded-full"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </div>

      {/* Scroll text */}
      <motion.span
        className="text-white/80 text-sm font-medium mt-4 group-hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Scroll down
      </motion.span>
    </motion.div>
  );
}

// Chevron variant component
function ChevronIndicator({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Bouncing chevron */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown className="w-8 h-8 text-white drop-shadow-lg group-hover:text-blue-200 transition-colors" />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Pulse indicator */}
      <motion.div
        className="w-2 h-2 bg-white/60 rounded-full mt-2 group-hover:bg-white transition-colors"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

// Main scroll indicator component
export function ScrollIndicator({
  targetSectionId = 'features-section',
  className = '',
  variant = 'arrow',
  position = 'center'
}: ScrollIndicatorProps) {
  const { isVisible } = useScrollVisibility();
  const [isScrolling, setIsScrolling] = useState(false);

  // Smooth scroll function
  const scrollToNextSection = useCallback(() => {
    const targetElement = document.getElementById(targetSectionId) || 
                          document.querySelector('main > section:nth-child(2)') ||
                          document.querySelector('[data-scroll-target]');

    if (targetElement) {
      setIsScrolling(true);
      
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    } else {
      // Fallback: scroll by viewport height
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, [targetSectionId]);

  // Touch gesture handlers
  const { handleTouchStart, handleTouchEnd } = useTouchGestures(scrollToNextSection);

  // Render appropriate variant
  const renderIndicator = () => {
    const props = { onClick: scrollToNextSection, isActive: !isScrolling };
    
    switch (variant) {
      case 'mouse':
        return <MouseIndicator {...props} />;
      case 'chevron':
        return <ChevronIndicator {...props} />;
      case 'arrow':
      default:
        return <ArrowIndicator {...props} />;
    }
  };

  const positionClasses = {
    center: 'left-1/2 transform -translate-x-1/2',
    left: 'left-8',
    right: 'right-8'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`
            fixed bottom-8 z-20 pointer-events-auto
            ${positionClasses[position]}
            ${className}
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={0}
          aria-label="Scroll to next section"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToNextSection();
            }
          }}
        >
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-full -m-4" />
          
          {/* Main indicator */}
          <div className="relative">
            {renderIndicator()}
          </div>

          {/* Mobile swipe hint */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-xs whitespace-nowrap md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 2,
              delay: 2 
            }}
          >
            Swipe up to scroll
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Enhanced scroll indicator with multiple variants
export function EnhancedScrollIndicator({ targetSectionId }: { targetSectionId?: string }) {
  const [currentVariant, setCurrentVariant] = useState<'arrow' | 'mouse' | 'chevron'>('arrow');

  // Cycle through variants every 10 seconds for visual interest
  useEffect(() => {
    const variants: Array<'arrow' | 'mouse' | 'chevron'> = ['arrow', 'mouse', 'chevron'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % variants.length;
      setCurrentVariant(variants[currentIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollIndicator 
      targetSectionId={targetSectionId}
      variant={currentVariant}
      position="center"
    />
  );
}
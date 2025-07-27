'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface SimpleScrollIndicatorProps {
  targetSectionId?: string;
}

export function SimpleScrollIndicator({ targetSectionId = 'features-section' }: SimpleScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Hide as soon as user scrolls even 1px
          if (scrollY > 0) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Auto-hide after 3 seconds
    const autoHideTimer = setTimeout(() => {
      if (window.scrollY === 0) {
        setIsVisible(false);
      }
    }, 3000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(autoHideTimer);
    };
  }, []);

  const scrollToNextSection = () => {
    const targetElement = document.getElementById(targetSectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          onClick={scrollToNextSection}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-full -m-4" />
          
          {/* Animated arrows */}
          <div className="relative flex flex-col items-center">
            <div className="relative">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="absolute"
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
                >
                  <ChevronDown className="w-6 h-6 text-white drop-shadow-lg" />
                </motion.div>
              ))}
            </div>
            
            <motion.span
              className="text-white/80 text-sm font-medium mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Scroll to explore
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
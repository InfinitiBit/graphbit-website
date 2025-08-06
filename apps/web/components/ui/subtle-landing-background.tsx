'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SubtleLandingBackgroundProps {
  className?: string;
}

export function SubtleLandingBackground({ className = '' }: SubtleLandingBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div 
      className={`fixed inset-0 -z-50 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Primary gradient background */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-50/80'
        }`}
      />

      {/* Subtle animated gradient overlay */}
      <div 
        className={`absolute inset-0 opacity-50 ${
          isDark
            ? 'bg-gradient-to-br from-primary/5 via-accent/3 to-transparent'
            : 'bg-gradient-to-br from-primary/8 via-accent/5 to-transparent'
        }`}
        style={{
          backgroundSize: '400% 400%',
          animation: 'subtleGradientShift 20s ease infinite'
        }}
      />

      {/* Radial gradient orbs for ambient lighting */}
      <div className="absolute inset-0">
        {/* Top-left orb */}
        <div 
          className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full ${
            isDark
              ? 'bg-gradient-radial from-primary/8 via-primary/3 to-transparent'
              : 'bg-gradient-radial from-primary/12 via-primary/6 to-transparent'
          }`}
          style={{
            background: `radial-gradient(circle at center, ${
              isDark
                ? 'hsl(var(--primary) / 0.08) 0%, hsl(var(--primary) / 0.03) 30%, transparent 60%'
                : 'hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.06) 30%, transparent 60%'
            })`,
            transform: 'translateZ(0)',
            animation: 'gentleFloat 25s ease-in-out infinite'
          }}
        />

        {/* Bottom-right orb */}
        <div 
          className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full`}
          style={{
            background: `radial-gradient(circle at center, ${
              isDark
                ? 'hsl(var(--accent) / 0.06) 0%, hsl(var(--accent) / 0.02) 30%, transparent 60%'
                : 'hsl(var(--accent) / 0.08) 0%, hsl(var(--accent) / 0.04) 30%, transparent 60%'
            })`,
            transform: 'translateZ(0)',
            animation: 'gentleFloat 30s ease-in-out infinite reverse'
          }}
        />

        {/* Center orb */}
        <div 
          className="absolute top-1/2 left-1/2 w-3/4 h-3/4 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${
              isDark
                ? 'hsl(var(--secondary) / 0.04) 0%, hsl(var(--secondary) / 0.01) 40%, transparent 70%'
                : 'hsl(var(--secondary) / 0.06) 0%, hsl(var(--secondary) / 0.02) 40%, transparent 70%'
            })`,
            transform: 'translate(-50%, -50%) translateZ(0)',
            animation: 'gentleFloat 35s ease-in-out infinite'
          }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className={`absolute inset-0 ${
          isDark ? 'opacity-[0.015]' : 'opacity-[0.025]'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'hsl(var(--foreground) / 0.1)' : 'hsl(var(--muted-foreground) / 0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'hsl(var(--foreground) / 0.1)' : 'hsl(var(--muted-foreground) / 0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
        }}
      />

      {/* Floating particles - reduced on mobile for performance */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-primary/20' : 'bg-primary/25'
            } sm:opacity-100 opacity-50`}
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
              animation: `floatingParticle ${15 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
              willChange: 'transform',
              transform: 'translateZ(0)' // Hardware acceleration
            }}
          />
        ))}
      </div>

      {/* Noise texture for depth */}
      <div 
        className={`absolute inset-0 ${
          isDark ? 'opacity-[0.008]' : 'opacity-[0.012]'
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: isDark ? 'screen' : 'multiply'
        }}
      />

      {/* CSS Animations - with prefers-reduced-motion support */}
      <style>{`
        @keyframes subtleGradientShift {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes gentleFloat {
          0%, 100% { 
            transform: translate(-50%, -50%) translateZ(0) scale(1); 
            opacity: 0.6;
          }
          25% { 
            transform: translate(-48%, -52%) translateZ(0) scale(1.02); 
            opacity: 0.8;
          }
          50% { 
            transform: translate(-52%, -48%) translateZ(0) scale(0.98); 
            opacity: 0.7;
          }
          75% { 
            transform: translate(-49%, -51%) translateZ(0) scale(1.01); 
            opacity: 0.9;
          }
        }

        @keyframes floatingParticle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) translateZ(0);
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) translateZ(0);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-40px) translateX(-5px) translateZ(0);
            opacity: 0.6;
          }
          75% { 
            transform: translateY(-15px) translateX(-8px) translateZ(0);
            opacity: 0.3;
          }
        }

        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .floating-particle {
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
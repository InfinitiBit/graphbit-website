'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// Simple icon components to avoid external dependencies
const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const MonitorIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="h-9 w-9 p-0 rounded-lg border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors">
        <MonitorIcon className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const themes = [
    {
      key: 'light' as const,
      label: 'Light',
      icon: SunIcon,
      description: 'Light theme'
    },
    {
      key: 'dark' as const,
      label: 'Dark',
      icon: MoonIcon,
      description: 'Dark theme'
    },
    {
      key: 'system' as const,
      label: 'System',
      icon: MonitorIcon,
      description: 'Use system preference'
    }
  ];

  const currentTheme = themes.find(t => t.key === theme);
  const CurrentIcon = currentTheme?.icon || MonitorIcon;

  return (
    <div className="relative">
      <button
        className="h-9 px-2 rounded-lg border border-border bg-card hover:bg-muted flex items-center gap-1 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <CurrentIcon className="h-4 w-4 text-foreground" />
        <ChevronDownIcon className="h-3 w-3 text-muted-foreground" />
        <span className="sr-only">Toggle theme menu</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card shadow-enhanced backdrop-blur-sm">
            <div className="p-1">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                const isSelected = theme === themeOption.key;

                return (
                  <button
                    key={themeOption.key}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-foreground"
                    onClick={() => {
                      setTheme(themeOption.key);
                      setIsOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex flex-1 flex-col items-start">
                      <span>{themeOption.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {themeOption.description}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckIcon className="h-4 w-4 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Current resolved theme indicator */}
            <div className="border-t border-border px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {resolvedTheme === 'dark' ? (
                  <MoonIcon className="h-3 w-3" />
                ) : (
                  <SunIcon className="h-3 w-3" />
                )}
                <span>Currently: {resolvedTheme}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 
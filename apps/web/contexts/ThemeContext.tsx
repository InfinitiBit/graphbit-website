'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeToDocument = (resolvedTheme: 'light' | 'dark') => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  return theme === 'system' ? getSystemTheme() : theme;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  const setTheme = (newTheme: Theme) => {
    const resolved = resolveTheme(newTheme);
    setThemeState(newTheme);
    setResolvedTheme(resolved);
    applyThemeToDocument(resolved);
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-store', JSON.stringify({ theme: newTheme }));
    }
  };

  const initializeTheme = () => {
    // Load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('app-store');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.theme) {
            const resolved = resolveTheme(parsed.theme);
            setThemeState(parsed.theme);
            setResolvedTheme(resolved);
            applyThemeToDocument(resolved);
            return;
          }
        }
      } catch (error) {
        console.error('Failed to load theme from localStorage:', error);
      }
    }

    // Default initialization
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
    applyThemeToDocument(resolved);
  };

  useEffect(() => {
    initializeTheme();

    // System theme change listener
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = () => {
        if (theme === 'system') {
          const resolved = resolveTheme('system');
          setResolvedTheme(resolved);
          applyThemeToDocument(resolved);
        }
      };

      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        initializeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Loading context for general app state
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
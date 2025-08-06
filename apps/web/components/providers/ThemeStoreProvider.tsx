'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

interface ThemeStoreProviderProps {
  children: React.ReactNode;
}

export function ThemeStoreProvider({ children }: ThemeStoreProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
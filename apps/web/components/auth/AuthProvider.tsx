'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize authentication when the app loads
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}
'use client';

import { AuthProvider as AuthContextProvider } from '@/contexts/AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
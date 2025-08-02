'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, type User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (newUser: User, newToken: string) => {
    // Set token in API client
    api.setToken(newToken);
    
    setUser(newUser);
    setToken(newToken);
    setIsAuthenticated(true);
    setIsLoading(false);

    // Persist token to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth-storage', JSON.stringify({ token: newToken }));
    }
  };

  const logout = async () => {
    try {
      // Call logout API to log the event
      await api.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    }

    // Clear API client token
    api.setToken(null);
    
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsLoading(false);

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage');
    }
  };

  const updateUser = (userUpdates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userUpdates });
    }
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const initializeAuth = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Set token in API client
      api.setToken(token);
      
      // Verify token and get current user
      const response = await api.getCurrentUser();
      
      if (response.status === 'success' && response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // Token is invalid, clear auth state
        await logout();
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      
      // Try to refresh token
      const refreshed = await refreshToken();
      if (!refreshed) {
        await logout();
      }
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    if (!token) {
      return false;
    }

    try {
      // Set current token for refresh request
      api.setToken(token);
      
      const response = await api.refreshToken();
      
      if (response.status === 'success' && response.data?.token) {
        // Update token
        const newToken = response.data.token;
        setToken(newToken);
        api.setToken(newToken);
        
        // Persist new token
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-storage', JSON.stringify({ token: newToken }));
        }
        
        // Get updated user info
        const userResponse = await api.getCurrentUser();
        if (userResponse.status === 'success' && userResponse.data?.user) {
          setUser(userResponse.data.user);
          setIsAuthenticated(true);
          setIsLoading(false);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  // Load token from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.token) {
            setToken(parsed.token);
          }
        }
      } catch (error) {
        console.error('Failed to load auth from localStorage:', error);
      }
    }
  }, []);

  // Initialize auth when token changes
  useEffect(() => {
    if (token) {
      initializeAuth();
    }
  }, [token]);

  // Auto token refresh setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set up automatic token refresh every 15 minutes
    const interval = setInterval(async () => {
      if (token) {
        try {
          await refreshToken();
        } catch (error) {
          console.error('Automatic token refresh failed:', error);
        }
      }
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        setLoading,
        initializeAuth,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthStore() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthStore must be used within an AuthProvider');
  }
  return context;
}

// Helper hook for authentication checks
export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator' || user?.role === 'admin',
  };
};

// Token refresh utility
let refreshPromise: Promise<boolean> | null = null;

export const ensureValidToken = async (): Promise<boolean> => {
  // This needs to be implemented differently since we can't access context outside of component
  // For now, we'll return false and handle token validation in the context
  console.warn('ensureValidToken called outside of component context - token validation should be handled within components');
  return false;
};
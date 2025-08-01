'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireModerator?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  requireModerator = false,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isAdmin, isModerator } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return; // Wait for auth to initialize
    }

    // Check authentication requirement
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check admin requirement
    if (requireAdmin && !isAdmin) {
      router.push('/unauthorized');
      return;
    }

    // Check moderator requirement
    if (requireModerator && !isModerator) {
      router.push('/unauthorized');
      return;
    }
  }, [
    isLoading,
    isAuthenticated,
    isAdmin,
    isModerator,
    requireAuth,
    requireAdmin,
    requireModerator,
    redirectTo,
    router,
  ]);

  // Show loading while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if requirements not met (redirect will happen)
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  if (requireModerator && !isModerator) {
    return null;
  }

  return <>{children}</>;
}

// HOC for protected pages
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
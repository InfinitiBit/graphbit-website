import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api, type User } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        // Set token in API client
        api.setToken(token);
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: async () => {
        try {
          // Call logout API to log the event
          await api.logout();
        } catch (error) {
          console.error('Logout API call failed:', error);
        }

        // Clear API client token
        api.setToken(null);
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (userUpdates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userUpdates },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      initializeAuth: async () => {
        const { token } = get();
        
        if (!token) {
          set({ isLoading: false });
          return;
        }

        set({ isLoading: true });

        try {
          // Set token in API client
          api.setToken(token);
          
          // Verify token and get current user
          const response = await api.getCurrentUser();
          
          if (response.status === 'success' && response.data?.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            // Token is invalid, clear auth state
            get().logout();
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
          
          // Try to refresh token
          const refreshed = await get().refreshToken();
          if (!refreshed) {
            get().logout();
          }
        }
      },

      refreshToken: async (): Promise<boolean> => {
        const { token } = get();
        
        if (!token) {
          return false;
        }

        try {
          // Set current token for refresh request
          api.setToken(token);
          
          const response = await api.refreshToken();
          
          if (response.status === 'success' && response.data?.token) {
            // Update token
            set({ token: response.data.token });
            api.setToken(response.data.token);
            
            // Get updated user info
            const userResponse = await api.getCurrentUser();
            if (userResponse.status === 'success' && userResponse.data?.user) {
              set({
                user: userResponse.data.user,
                isAuthenticated: true,
                isLoading: false,
              });
              return true;
            }
          }
          
          return false;
        } catch (error) {
          console.error('Token refresh failed:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        // Don't persist user data, it will be fetched on initialization
      }),
    }
  )
);

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
  const { token, refreshToken } = useAuthStore.getState();
  
  if (!token) {
    return false;
  }

  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    return refreshPromise;
  }

  try {
    // Check if token is still valid by making a test request
    const response = await api.getCurrentUser();
    
    if (response.status === 'success') {
      return true;
    }
    
    // Token is invalid, try to refresh
    refreshPromise = refreshToken();
    const refreshed = await refreshPromise;
    refreshPromise = null;
    
    return refreshed;
  } catch (error) {
    // Try to refresh token
    refreshPromise = refreshToken();
    const refreshed = await refreshPromise;
    refreshPromise = null;
    
    return refreshed;
  }
};

// Auto token refresh setup
if (typeof window !== 'undefined') {
  // Set up automatic token refresh every 15 minutes
  setInterval(async () => {
    const { token, refreshToken } = useAuthStore.getState();
    if (token) {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Automatic token refresh failed:', error);
      }
    }
  }, 15 * 60 * 1000); // 15 minutes
}
import { IAgent } from './models/agent';
import { ITrace } from './models/trace';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: string[];
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  subscription: {
    tier: 'free' | 'premium' | 'enterprise';
    status: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    newsletter: boolean;
  };
  usage: {
    agentsCreated: number;
    tracesGenerated: number;
    apiCallsThisMonth: number;
    monthlyTokenLimit: number;
  };
  canCreateAgent: boolean;
  canMakeApiCall: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
      // Add authorization header if token exists
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Set token if login successful
    if (response.status === 'success' && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Set token if registration successful
    if (response.status === 'success' && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/me-jwt');
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });

    // Update token if refresh successful
    if (response.status === 'success' && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.request('/auth/logout-jwt', {
      method: 'POST',
    });

    // Clear token on logout
    this.setToken(null);

    return response;
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // User endpoints
  async getUserProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/users/profile');
  }

  async updateUserProfile(updates: Partial<User>): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async getUserStats(): Promise<ApiResponse> {
    return this.request('/users/stats');
  }

  // Agent endpoints
  async getAgents(params: Record<string, string | number | boolean> = {}): Promise<ApiResponse<IAgent[]>> {
    const stringParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    const searchParams = new URLSearchParams(stringParams);
    return this.request(`/agents?${searchParams}`);
  }

  async getAgent(id: string): Promise<ApiResponse> {
    return this.request(`/agents/${id}`);
  }

  async createAgent(agentData: Partial<IAgent>): Promise<ApiResponse<IAgent>> {
    return this.request('/agents', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  }

  async updateAgent(id: string, updates: Partial<IAgent>): Promise<ApiResponse<IAgent>> {
    return this.request(`/agents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteAgent(id: string): Promise<ApiResponse> {
    return this.request(`/agents/${id}`, {
      method: 'DELETE',
    });
  }

  // Trace endpoints
  async getTraces(params: Record<string, string | number | boolean> = {}): Promise<ApiResponse<ITrace[]>> {
    const stringParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    const searchParams = new URLSearchParams(stringParams);
    return this.request(`/traces?${searchParams}`);
  }

  async createTrace(traceData: Partial<ITrace>): Promise<ApiResponse<ITrace>> {
    return this.request('/traces', {
      method: 'POST',
      body: JSON.stringify(traceData),
    });
  }

  async getTrace(id: string): Promise<ApiResponse> {
    return this.request(`/traces/${id}`);
  }

  async addTraceFeedback(id: string, feedback: { rating?: number; comment?: string; helpful?: boolean }): Promise<ApiResponse> {
    return this.request(`/traces/${id}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  async getTraceAnalytics(params: Record<string, string | number | boolean> = {}): Promise<ApiResponse> {
    const stringParams: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      stringParams[key] = String(value);
    });
    const searchParams = new URLSearchParams(stringParams);
    return this.request(`/traces/analytics?${searchParams}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export API utilities
export const api = {
  // Auth
  login: (credentials: LoginCredentials) => apiClient.login(credentials),
  register: (userData: RegisterData) => apiClient.register(userData),
  getCurrentUser: () => apiClient.getCurrentUser(),
  refreshToken: () => apiClient.refreshToken(),
  logout: () => apiClient.logout(),
  forgotPassword: (email: string) => apiClient.forgotPassword(email),
  resetPassword: (token: string, newPassword: string) => 
    apiClient.resetPassword(token, newPassword),
  changePassword: (currentPassword: string, newPassword: string) => 
    apiClient.changePassword(currentPassword, newPassword),
  
  // Users
  getUserProfile: () => apiClient.getUserProfile(),
  updateUserProfile: (updates: Partial<User>) => apiClient.updateUserProfile(updates),
  getUserStats: () => apiClient.getUserStats(),
  
  // Agents
  getAgents: (params?: Record<string, string | number | boolean>) => apiClient.getAgents(params),
  getAgent: (id: string) => apiClient.getAgent(id),
  createAgent: (agentData: Partial<IAgent>) => apiClient.createAgent(agentData),
  updateAgent: (id: string, updates: Partial<IAgent>) => apiClient.updateAgent(id, updates),
  deleteAgent: (id: string) => apiClient.deleteAgent(id),
  
  // Traces
  getTraces: (params?: Record<string, string | number | boolean>) => apiClient.getTraces(params),
  createTrace: (traceData: Partial<ITrace>) => apiClient.createTrace(traceData),
  getTrace: (id: string) => apiClient.getTrace(id),
  addTraceFeedback: (id: string, feedback: { rating?: number; comment?: string; helpful?: boolean }) => 
    apiClient.addTraceFeedback(id, feedback),
  getTraceAnalytics: (params?: Record<string, string | number | boolean>) => 
    apiClient.getTraceAnalytics(params),
  
  // Utils
  setToken: (token: string | null) => apiClient.setToken(token),
  getToken: () => apiClient.getToken(),
  healthCheck: () => apiClient.healthCheck(),
};

export default api;
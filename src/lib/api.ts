import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { APP_CONFIG } from "@/lib/constants";

// Extend the axios request config to include metadata
declare module "axios" {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}

// Base API configuration
const API_CONFIG = {
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Response interfaces
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: Array<{ field?: string; message: string }>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  errors?: Array<{ field?: string; message: string }>;
}

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create(API_CONFIG);

  // Request interceptor - add auth token and common headers
  client.interceptors.request.use(
    (config) => {
      // Get token from localStorage
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add request timestamp for debugging
      config.metadata = { startTime: new Date() };

      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error("[API] Request error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle responses and errors
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log successful responses
      const endTime = new Date();
      const startTime = response.config.metadata?.startTime;
      const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

      console.log(
        `[API] ✅ ${response.config.method?.toUpperCase()} ${
          response.config.url
        } - ${response.status} (${duration}ms)`
      );

      return response;
    },
    (error: AxiosError) => {
      // Log error responses
      const config = error.config;
      const endTime = new Date();
      const startTime = config?.metadata?.startTime;
      const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

      console.error(
        `[API] ❌ ${config?.method?.toUpperCase()} ${config?.url} - ${
          error.response?.status || "Network Error"
        } (${duration}ms)`,
        error.response?.data || error.message
      );

      // Handle specific error cases
      if (error.response?.status === 401) {
        // Unauthorized - clear auth data and redirect to login
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");

        // Only redirect if not already on login page
        if (window.location.pathname !== "/signin") {
          window.location.href = "/signin";
        }
      } else if (error.response?.status === 403) {
        // Forbidden - show error message
        console.error(
          "Access denied. You do not have permission to perform this action."
        );
      } else if (error.response?.status >= 500) {
        // Server error
        console.error("Server error. Please try again later.");
      }

      // Transform error to standardized format
      const errorData = error.response?.data as any;
      const apiError: ApiError = {
        message:
          errorData?.message || error.message || "An unexpected error occurred",
        status: error.response?.status || 0,
        code: errorData?.code,
        errors: errorData?.errors,
      };

      return Promise.reject(apiError);
    }
  );

  return client;
};

// Create the API client instance
const apiClient = createApiClient();

// Generic API methods
export const api = {
  // GET request
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.get(url, config).then((response) => response.data),

  // POST request
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.post(url, data, config).then((response) => response.data),

  // PUT request
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.put(url, data, config).then((response) => response.data),

  // PATCH request
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.patch(url, data, config).then((response) => response.data),

  // DELETE request
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.delete(url, config).then((response) => response.data),

  // File upload
  upload: <T = any>(
    url: string,
    file: File,
    onUploadProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(progress);
          }
        },
      })
      .then((response) => response.data);
  },

  // Raw axios instance for advanced usage
  client: apiClient,
};

// Specialized API endpoints
export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  register: (email: string, password: string, name: string) =>
    api.post("/auth/register", { email, password, name }),

  logout: () => api.post("/auth/logout"),

  refreshToken: () => api.post("/auth/refresh"),

  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    api.post("/auth/reset-password", { token, password }),

  verifyEmail: (token: string) => api.post("/auth/verify-email", { token }),

  profile: () => api.get("/auth/profile"),

  updateProfile: (data: { name?: string; email?: string }) =>
    api.patch("/auth/profile", data),
};

export const usersApi = {
  list: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) => api.get("/users", { params }),

  get: (id: string) => api.get(`/users/${id}`),

  create: (data: { name: string; email: string; role?: string }) =>
    api.post("/users", data),

  update: (
    id: string,
    data: { name?: string; email?: string; role?: string; active?: boolean }
  ) => api.patch(`/users/${id}`, data),

  delete: (id: string) => api.delete(`/users/${id}`),

  bulkDelete: (ids: string[]) => api.post("/users/bulk-delete", { ids }),

  export: (format: "csv" | "xlsx" = "csv") =>
    api.get(`/users/export?format=${format}`),
};

export const dashboardApi = {
  overview: (period?: "24h" | "7d" | "30d" | "90d") =>
    api.get("/dashboard/overview", { params: { period } }),

  analytics: (period?: "24h" | "7d" | "30d" | "90d") =>
    api.get("/dashboard/analytics", { params: { period } }),

  activity: (params?: { page?: number; limit?: number; type?: string }) =>
    api.get("/dashboard/activity", { params }),

  stats: () => api.get("/dashboard/stats"),
};

export const settingsApi = {
  get: () => api.get("/settings"),

  update: (data: Record<string, any>) => api.patch("/settings", data),

  uploadLogo: (file: File) => api.upload("/settings/logo", file),
};

// Utility functions for common operations
export const apiUtils = {
  // Build query string from object
  buildQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  },

  // Handle pagination
  getPaginationInfo: (response: ApiResponse) => ({
    currentPage: response.pagination?.page || 1,
    totalPages: response.pagination?.totalPages || 1,
    totalItems: response.pagination?.total || 0,
    itemsPerPage: response.pagination?.limit || 10,
    hasNextPage:
      (response.pagination?.page || 1) < (response.pagination?.totalPages || 1),
    hasPrevPage: (response.pagination?.page || 1) > 1,
  }),

  // Check if error is network error
  isNetworkError: (error: any): boolean => {
    return !error.status || error.status === 0;
  },

  // Check if error is client error (4xx)
  isClientError: (error: any): boolean => {
    return error.status >= 400 && error.status < 500;
  },

  // Check if error is server error (5xx)
  isServerError: (error: any): boolean => {
    return error.status >= 500;
  },
};

export default api;

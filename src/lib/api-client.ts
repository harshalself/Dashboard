/**
 * Enhanced API client with better error handling, retries, and caching
 */

interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTimeout?: number;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
  timestamp: string;
}

class ApiClient {
  private config: Required<ApiConfig>;
  private cache = new Map<string, { data: any; timestamp: number }>();

  constructor(config: ApiConfig) {
    this.config = {
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      cache: true,
      cacheTimeout: 5 * 60 * 1000, // 5 minutes
      ...config,
    };
  }

  /**
   * Make an API request with retry logic and caching
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      method = "GET",
      headers = {},
      body,
      timeout = this.config.timeout,
      retries = this.config.retries,
      cache = this.config.cache && method === "GET",
    } = options;

    const url = `${this.config.baseUrl}${endpoint}`;
    const cacheKey = `${method}:${url}:${JSON.stringify(body)}`;

    // Check cache for GET requests
    if (cache && method === "GET") {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.config.cacheTimeout) {
        return cached.data;
      }
    }

    let lastError: ApiError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const data = await response.json();

        // Cache successful GET requests
        if (cache && method === "GET") {
          this.cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
          });
        }

        return data;
      } catch (error) {
        lastError = {
          message: error instanceof Error ? error.message : "Unknown error",
          status:
            error instanceof Error && "status" in error
              ? (error as any).status
              : undefined,
          timestamp: new Date().toISOString(),
        };

        // Don't retry on client errors (4xx)
        if (
          lastError.status &&
          lastError.status >= 400 &&
          lastError.status < 500
        ) {
          break;
        }

        // Wait before retry
        if (attempt < retries) {
          await new Promise((resolve) =>
            setTimeout(resolve, this.config.retryDelay * Math.pow(2, attempt))
          );
        }
      }
    }

    throw lastError;
  }

  /**
   * GET request helper
   */
  async get<T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  /**
   * POST request helper
   */
  async post<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "POST", body });
  }

  /**
   * PUT request helper
   */
  async put<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body });
  }

  /**
   * DELETE request helper
   */
  async delete<T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear specific cache entry
   */
  clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }
}

// Export a default instance
export const apiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_API_URL || "/api",
});

export { ApiClient, type ApiConfig, type RequestOptions, type ApiError };

import { toast } from "@/hooks/use-toast";
import { logger } from "./utils";

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      details?: string[];
    };
    status?: number;
  };
  message?: string;
  status?: number;
  code?: string;
  timestamp?: string;
  context?: string;
}

// Enhanced error severity levels
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  reportError?: boolean;
  fallback?: () => void;
}

/**
 * Centralized error handler for API errors with enhanced features
 * Provides consistent error messaging across the application
 */
export class ErrorHandler {
  /**
   * Handle API errors and show appropriate toast messages
   */
  static handleApiError(
    error: ApiError,
    defaultMessage?: string,
    options: ErrorHandlerOptions = {}
  ) {
    const {
      showToast = true,
      logError = true,
      reportError = false,
      fallback,
    } = options;

    const errorMessage = this.extractErrorMessage(error, defaultMessage);
    const severity = this.getSeverity(error);

    // Log the error
    if (logError) {
      const logMessage = `[${severity.toUpperCase()}] ${
        error.context ? `${error.context}: ` : ""
      }${errorMessage}`;

      switch (severity) {
        case ErrorSeverity.CRITICAL:
        case ErrorSeverity.HIGH:
          logger.error(logMessage, error);
          break;
        case ErrorSeverity.MEDIUM:
          logger.warn(logMessage, error);
          break;
        default:
          logger.debug(logMessage, error);
      }
    }

    // Show toast notification
    if (showToast) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }

    // Report error for monitoring
    if (reportError && !this.isClientError(error)) {
      this.reportError(error).catch((reportError) => {
        logger.error("Failed to report error:", reportError);
      });
    }

    // Execute fallback
    if (fallback) {
      try {
        fallback();
      } catch (fallbackError) {
        logger.error("Fallback execution failed:", fallbackError);
      }
    }
  }

  /**
   * Extract user-friendly error message from API error
   */
  static extractErrorMessage(
    error: ApiError,
    defaultMessage = "An unexpected error occurred"
  ): string {
    // Check for response data message (most common)
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }

    // Check for direct message property
    if (error?.message) {
      return error.message;
    }

    // Check for response data details array
    if (
      error?.response?.data?.details &&
      Array.isArray(error.response.data.details)
    ) {
      return error.response.data.details.join(", ");
    }

    // Handle specific HTTP status codes
    if (error?.response?.status || error?.status) {
      const status = error.response?.status || error.status;
      switch (status) {
        case 400:
          return "Invalid request. Please check your input.";
        case 401:
          return "Unauthorized. Please sign in again.";
        case 403:
          return "You don't have permission to perform this action.";
        case 404:
          return "The requested resource was not found.";
        case 409:
          return "A conflict occurred. The resource may already exist.";
        case 422:
          return "Invalid data provided. Please check your input.";
        case 429:
          return "Too many requests. Please try again later.";
        case 500:
          return "Server error. Please try again later.";
        case 503:
          return "Service temporarily unavailable. Please try again later.";
        default:
          return defaultMessage;
      }
    }

    return defaultMessage;
  }

  /**
   * Determine error severity
   */
  static getSeverity(error: ApiError): ErrorSeverity {
    const status = error?.response?.status || error?.status;

    if (status) {
      if (status >= 500) return ErrorSeverity.CRITICAL;
      if (status >= 400) return ErrorSeverity.MEDIUM;
    }

    if (error.code) {
      const criticalCodes = ["NETWORK_ERROR", "AUTH_FAILED", "DATA_CORRUPTION"];
      if (criticalCodes.includes(error.code)) return ErrorSeverity.HIGH;
    }

    return ErrorSeverity.LOW;
  }

  /**
   * Check if error is client-side (4xx)
   */
  static isClientError(error: ApiError): boolean {
    const status = error?.response?.status || error?.status;
    return status ? status >= 400 && status < 500 : false;
  }

  /**
   * Report error to monitoring service
   */
  static async reportError(error: ApiError): Promise<void> {
    const errorReport = {
      message: error.message,
      code: error.code,
      status: error.response?.status || error.status,
      timestamp: error.timestamp || new Date().toISOString(),
      context: error.context,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    logger.debug("Error report prepared:", errorReport);
    // TODO: Integrate with error reporting service (Sentry, LogRocket, etc.)
  }

  /**
   * Handle success responses and show toast messages
   */
  static handleSuccess(message: string, title = "Success") {
    toast({
      title,
      description: message,
    });
  }

  /**
   * Handle network errors specifically
   */
  static handleNetworkError() {
    toast({
      title: "Connection Error",
      description: "Please check your internet connection and try again.",
      variant: "destructive",
    });
  }

  /**
   * Async error boundary helper
   */
  static wrapAsync<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    context?: string,
    options?: ErrorHandlerOptions
  ): T {
    return ((...args: Parameters<T>) => {
      return fn(...args).catch((error: ApiError) => {
        error.context = context || error.context;
        this.handleApiError(error, undefined, options);
        throw error; // Re-throw to allow upstream handling
      });
    }) as T;
  }
}

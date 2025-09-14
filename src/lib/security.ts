/**
 * Security utilities for input validation, sanitization, and protection
 */

import { logger } from "./utils";

export const securityUtils = {
  /**
   * XSS Protection - Sanitize HTML content
   */
  sanitizeHtml: (input: string): string => {
    const htmlEscapeMap: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };

    return input.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
  },

  /**
   * Input validation patterns
   */
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-()]{10,}$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    noSpecialChars: /^[a-zA-Z0-9\s\-_]+$/,
    strongPassword:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    url: /^https?:\/\/.+$/,
    ipAddress: /^(\d{1,3}\.){3}\d{1,3}$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  },

  /**
   * Validate input against patterns
   */
  validateInput: (
    input: string,
    pattern: RegExp,
    fieldName?: string
  ): boolean => {
    const isValid = pattern.test(input);

    if (!isValid && fieldName) {
      logger.warn(`Validation failed for ${fieldName}:`, input);
    }

    return isValid;
  },

  /**
   * Rate limiting helper (client-side)
   */
  rateLimiter: {
    requests: new Map<string, number[]>(),

    canMakeRequest: (
      key: string,
      maxRequests = 10,
      windowMs = 60000
    ): boolean => {
      const now = Date.now();
      const requests = securityUtils.rateLimiter.requests.get(key) || [];

      // Remove old requests outside the window
      const validRequests = requests.filter((time) => now - time < windowMs);

      if (validRequests.length >= maxRequests) {
        logger.warn(`Rate limit exceeded for ${key}`);
        return false;
      }

      validRequests.push(now);
      securityUtils.rateLimiter.requests.set(key, validRequests);
      return true;
    },

    reset: (key: string): void => {
      securityUtils.rateLimiter.requests.delete(key);
    },
  },

  /**
   * Content Security Policy helpers
   */
  csp: {
    /**
     * Validate external URLs before loading
     */
    isAllowedOrigin: (url: string, allowedOrigins: string[]): boolean => {
      try {
        const urlObj = new URL(url);
        return allowedOrigins.some(
          (origin) =>
            urlObj.origin === origin || urlObj.hostname.endsWith(origin)
        );
      } catch {
        return false;
      }
    },

    /**
     * Generate secure nonce for inline scripts
     */
    generateNonce: (): string => {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return btoa(String.fromCharCode(...array));
    },
  },

  /**
   * Safe data parsing with validation
   */
  safeJsonParse: <T>(
    jsonString: string,
    validator?: (data: any) => data is T
  ): T | null => {
    try {
      const parsed = JSON.parse(jsonString);

      if (validator && !validator(parsed)) {
        logger.warn("JSON validation failed:", parsed);
        return null;
      }

      return parsed;
    } catch (error) {
      logger.error("JSON parsing failed:", error);
      return null;
    }
  },

  /**
   * Secure local storage operations
   */
  secureStorage: {
    set: (key: string, value: any, encrypt = false): void => {
      try {
        const stringValue = JSON.stringify(value);
        const finalValue = encrypt ? btoa(stringValue) : stringValue;
        localStorage.setItem(key, finalValue);
      } catch (error) {
        logger.error("Storage set failed:", error);
      }
    },

    get: <T>(key: string, decrypt = false): T | null => {
      try {
        const value = localStorage.getItem(key);
        if (!value) return null;

        const finalValue = decrypt ? atob(value) : value;
        return JSON.parse(finalValue);
      } catch (error) {
        logger.error("Storage get failed:", error);
        return null;
      }
    },

    remove: (key: string): void => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        logger.error("Storage remove failed:", error);
      }
    },

    clear: (): void => {
      try {
        localStorage.clear();
      } catch (error) {
        logger.error("Storage clear failed:", error);
      }
    },
  },

  /**
   * Permission validation helpers
   */
  permissions: {
    hasPermission: (
      userPermissions: string[],
      requiredPermission: string | string[]
    ): boolean => {
      if (Array.isArray(requiredPermission)) {
        return requiredPermission.every((perm) =>
          userPermissions.includes(perm)
        );
      }
      return userPermissions.includes(requiredPermission);
    },

    hasAnyPermission: (
      userPermissions: string[],
      permissions: string[]
    ): boolean => {
      return permissions.some((perm) => userPermissions.includes(perm));
    },

    hasRole: (userRoles: string[], requiredRole: string): boolean => {
      return userRoles.includes(requiredRole);
    },
  },

  /**
   * Audit logging for security events
   */
  auditLog: {
    logSecurityEvent: (
      event: string,
      details: Record<string, any> = {},
      severity: "info" | "warning" | "error" = "info"
    ): void => {
      const auditEntry = {
        timestamp: new Date().toISOString(),
        event,
        details: {
          ...details,
          userAgent: navigator.userAgent,
          url: window.location.href,
          sessionId: securityUtils.secureStorage.get<string>("sessionId"),
        },
      };

      switch (severity) {
        case "error":
          logger.error(`[SECURITY] ${event}`, auditEntry);
          break;
        case "warning":
          logger.warn(`[SECURITY] ${event}`, auditEntry);
          break;
        default:
          logger.info(`[SECURITY] ${event}`, auditEntry);
      }
    },

    logLogin: (userId: string, success: boolean): void => {
      securityUtils.auditLog.logSecurityEvent(
        success ? "LOGIN_SUCCESS" : "LOGIN_FAILED",
        { userId },
        success ? "info" : "warning"
      );
    },

    logPermissionCheck: (permission: string, granted: boolean): void => {
      securityUtils.auditLog.logSecurityEvent(
        "PERMISSION_CHECK",
        { permission, granted },
        granted ? "info" : "warning"
      );
    },
  },
} as const;

/**
 * Security middleware for API calls
 */
export const securityMiddleware = {
  /**
   * Add security headers to requests
   */
  addSecurityHeaders: (
    headers: Record<string, string> = {}
  ): Record<string, string> => {
    return {
      ...headers,
      "X-Requested-With": "XMLHttpRequest",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    };
  },

  /**
   * Validate and sanitize request data
   */
  sanitizeRequestData: (data: any): any => {
    if (typeof data === "string") {
      return securityUtils.sanitizeHtml(data);
    }

    if (Array.isArray(data)) {
      return data.map((item) => securityMiddleware.sanitizeRequestData(item));
    }

    if (data && typeof data === "object") {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = securityMiddleware.sanitizeRequestData(value);
      }
      return sanitized;
    }

    return data;
  },
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_CONFIG, UI_CONSTANTS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Environment utilities
export const env = {
  isDevelopment: APP_CONFIG.environment === "development",
  isStaging: APP_CONFIG.environment === "staging",
  isProduction: APP_CONFIG.environment === "production",
  isDebugMode: APP_CONFIG.debugMode,
} as const;

// Logging utility that respects environment
export const logger = {
  debug: (...args: any[]) => {
    if (env.isDevelopment || env.isDebugMode) {
      console.debug("[Admin Panel Debug]", ...args);
    }
  },
  info: (...args: any[]) => {
    if (!env.isProduction || env.isDebugMode) {
      console.info("[Admin Panel Info]", ...args);
    }
  },
  warn: (...args: any[]) => {
    console.warn("[Admin Panel Warning]", ...args);
  },
  error: (...args: any[]) => {
    console.error("[Admin Panel Error]", ...args);
  },
} as const;

// Debounce utility
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = UI_CONSTANTS.DEBOUNCE_DELAY
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

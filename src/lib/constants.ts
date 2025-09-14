// App Configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "Admin Panel",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  environment: import.meta.env.VITE_ENVIRONMENT || "development",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  debugMode: import.meta.env.VITE_DEBUG_MODE === "true",
} as const;

// Route Constants
export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  SETTINGS: "/dashboard/settings",
  PROFILE: "/dashboard/profile",
} as const;

// React Query Keys (simplified for current usage)
export const QUERY_KEYS = {
  USER: ["user"],
  AUTH: ["auth"],
} as const;

// UI Constants (simplified for current usage)
export const UI_CONSTANTS = {
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
} as const;

// Error Messages (commonly used ones)
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error - please check your connection",
  UNAUTHORIZED: "You are not authorized to perform this action",
  LOGIN_FAILED: "Invalid email or password",
  REGISTRATION_FAILED: "Registration failed - please try again",
  SESSION_EXPIRED: "Your session has expired - please sign in again",
} as const;

// Success Messages (commonly used ones)
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Signed in successfully",
  LOGOUT_SUCCESS: "Signed out successfully",
  REGISTRATION_SUCCESS: "Account created successfully",
  PROFILE_UPDATED: "Profile updated successfully",
} as const;

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
  PROFILE: "/profile",
  SETTINGS: "/settings",
  USERS: "/users",
  ANALYTICS: "/analytics",
} as const;

// React Query Keys
export const QUERY_KEYS = {
  // Auth
  USER: ["user"],
  AUTH: ["auth"],

  // Users
  USERS: {
    LIST: ["users"],
    GET: (id: string) => ["users", id],
    UPDATE: (id: string) => ["users", id, "update"],
    DELETE: (id: string) => ["users", id, "delete"],
  },

  // Dashboard
  DASHBOARD: ["dashboard"],
  ANALYTICS: ["analytics"],
  ACTIVITY: ["activity"],
  SETTINGS: ["settings"],

  // Generic data entities
  DATA: {
    LIST: (entity: string) => [entity, "list"],
    GET: (entity: string, id: string) => [entity, id],
    UPDATE: (entity: string, id: string) => [entity, id, "update"],
    DELETE: (entity: string, id: string) => [entity, id, "delete"],
  },
} as const;

// API Endpoints - Generic Admin Panel Template
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Users Management
  USERS: {
    LIST: "/users",
    GET: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Dashboard
  DASHBOARD: {
    OVERVIEW: "/dashboard/overview",
    ANALYTICS: "/dashboard/analytics",
    ACTIVITY: "/dashboard/activity",
    STATS: "/dashboard/stats",
  },

  // Settings
  SETTINGS: {
    GENERAL: "/settings/general",
    PROFILE: "/settings/profile",
    NOTIFICATIONS: "/settings/notifications",
    SECURITY: "/settings/security",
  },

  // Generic CRUD operations for any entity
  ENTITY: {
    LIST: (entity: string) => `/${entity}`,
    GET: (entity: string, id: string) => `/${entity}/${id}`,
    CREATE: (entity: string) => `/${entity}`,
    UPDATE: (entity: string, id: string) => `/${entity}/${id}`,
    DELETE: (entity: string, id: string) => `/${entity}/${id}`,
  },
} as const;

// UI Constants
export const UI_CONSTANTS = {
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
  PAGINATION_SIZE: 10,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_UPLOAD: 10,
  SUPPORTED_FILE_TYPES: [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".jpg",
    ".png",
    ".jpeg",
  ],
  SUPPORTED_MIME_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ],
  TABLE_PAGE_SIZES: [10, 25, 50, 100],
  ANIMATION_DURATION: 200,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error - please check your connection",
  UNAUTHORIZED: "You are not authorized to perform this action",
  NOT_FOUND: "The requested resource was not found",
  SERVER_ERROR: "Internal server error - please try again later",
  VALIDATION_ERROR: "Please check your input and try again",
  FILE_TOO_LARGE: `File size must be less than ${
    UI_CONSTANTS.MAX_FILE_SIZE / (1024 * 1024)
  }MB`,
  UNSUPPORTED_FILE_TYPE: `Supported file types: ${UI_CONSTANTS.SUPPORTED_FILE_TYPES.join(
    ", "
  )}`,
  LOGIN_FAILED: "Invalid email or password",
  REGISTRATION_FAILED: "Registration failed - please try again",
  SESSION_EXPIRED: "Your session has expired - please sign in again",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  SETTINGS_SAVED: "Settings saved successfully",
  FILE_UPLOADED: "File uploaded successfully",
  DATA_SAVED: "Data saved successfully",
  DATA_DELETED: "Data deleted successfully",
  LOGIN_SUCCESS: "Signed in successfully",
  LOGOUT_SUCCESS: "Signed out successfully",
  REGISTRATION_SUCCESS: "Account created successfully",
  PASSWORD_CHANGED: "Password changed successfully",
} as const;

// Context providers
export {
  LoadingProvider,
  useLoading,
  useGlobalLoading,
  useApiLoading,
  usePageLoading,
} from "./LoadingContext";
export { ErrorProvider, useError, useErrorHandler } from "./ErrorContext";
export {
  ThemeProvider,
  useTheme,
  usePreferences,
  useDarkMode,
  useAccessibility,
  useWorkspacePreferences,
} from "./ThemeContext";
export { AuthProvider, useAuth } from "./AuthContext";
// Types
export type { Theme, UserPreferences } from "./ThemeContext";
export type { User, AuthContextType } from "./AuthContext";

// Context instances (for advanced usage)
export { LoadingContext } from "./LoadingContext";
export { ErrorContext } from "./ErrorContext";
export { ThemeContext } from "./ThemeContext";

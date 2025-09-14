// Context providers
export { ThemeProvider } from "./ThemeContext";
export { AuthProvider } from "./AuthContext";
export { ColorThemeProvider } from "./ColorThemeContext";

// Hooks (moved to separate files for better organization)
export { useTheme, useDarkMode } from "../hooks/use-theme";
export { useAuth } from "../hooks/use-auth";
export { useColorTheme } from "../hooks/use-color-theme";

// Types
export type { Theme } from "./ThemeContext";
export type { User, AuthContextType } from "./AuthContext";

// Context instances (for advanced usage)
export { ThemeContext } from "./ThemeContext";

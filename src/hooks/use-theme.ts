import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Convenience hook for dark mode
export function useDarkMode() {
  const { isDarkMode, toggleTheme, setTheme } = useTheme();
  return { isDarkMode, toggleTheme, setTheme };
}

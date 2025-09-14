import { createContext, useEffect, useState, ReactNode } from "react";

interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
  };
  preview: string;
}

interface ColorThemeContextType {
  currentColorTheme: string;
  setColorTheme: (themeId: string) => void;
  colorThemes: ColorTheme[];
}

const colorThemes: ColorTheme[] = [
  {
    id: "default",
    name: "Default",
    description: "Classic blue theme",
    colors: {
      primary: "217 91% 59%",
      accent: "220 14% 96%",
    },
    preview: "bg-blue-500",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep blue ocean theme",
    colors: {
      primary: "199 89% 48%",
      accent: "199 20% 92%",
    },
    preview: "bg-cyan-500",
  },
  {
    id: "forest",
    name: "Forest",
    description: "Natural green theme",
    colors: {
      primary: "142 76% 36%",
      accent: "142 20% 92%",
    },
    preview: "bg-green-500",
  },
  {
    id: "lava",
    name: "Lava",
    description: "Fiery orange theme",
    colors: {
      primary: "38 92% 50%",
      accent: "38 20% 92%",
    },
    preview: "bg-orange-500",
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm purple sunset theme",
    colors: {
      primary: "280 65% 60%",
      accent: "280 20% 92%",
    },
    preview: "bg-purple-500",
  },
  {
    id: "rose",
    name: "Rose",
    description: "Elegant pink theme",
    colors: {
      primary: "340 75% 55%",
      accent: "340 20% 92%",
    },
    preview: "bg-pink-500",
  },
];

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(
  undefined
);

export { ColorThemeContext };

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [currentColorTheme, setCurrentColorTheme] = useState("default");

  const applyColorTheme = (themeId: string) => {
    const theme = colorThemes.find((t) => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--primary", theme.colors.primary);
    root.style.setProperty("--accent", theme.colors.accent);

    // Save to localStorage
    localStorage.setItem("selectedColorTheme", themeId);
    setCurrentColorTheme(themeId);
  };

  // Initialize theme on app startup
  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedColorTheme") || "default";
    applyColorTheme(savedTheme);
  }, []);

  const setColorTheme = (themeId: string) => {
    applyColorTheme(themeId);
  };

  return (
    <ColorThemeContext.Provider
      value={{ currentColorTheme, setColorTheme, colorThemes }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

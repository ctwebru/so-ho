import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeId = "forest" | "sand" | "charcoal" | "sage";

export const THEMES: { id: ThemeId; label: string; swatches: string[]; description: string }[] = [
  {
    id: "forest",
    label: "Forest & Moss",
    description: "Глубокий лес, мох",
    swatches: ["#1a3c2a", "#2d5a3d", "#5a8a5c", "#a0c49d"],
  },
  {
    id: "sand",
    label: "Warm Sand",
    description: "Тёплый песок",
    swatches: ["#faf8f5", "#f0ebe3", "#c9b99a", "#8b7355"],
  },
  {
    id: "charcoal",
    label: "Charcoal & Ember",
    description: "Уголь и огонь",
    swatches: ["#1a1a1a", "#2d2d2d", "#4a4a4a", "#e85d3a"],
  },
  {
    id: "sage",
    label: "Sage & Cream",
    description: "Шалфей и крем",
    swatches: ["#f5f0e8", "#dce5d4", "#a8c0a0", "#7d9b76"],
  },
];

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

const STORAGE_KEY = "soho-theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "forest";
    return (localStorage.getItem(STORAGE_KEY) as ThemeId) || "forest";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

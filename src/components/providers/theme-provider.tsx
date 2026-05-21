"use client";

import * as React from "react";

type Theme = string | undefined;
type SetTheme = React.Dispatch<React.SetStateAction<string>>;

interface ThemeContextValue {
  themes: string[];
  forcedTheme?: string;
  theme?: string;
  resolvedTheme?: string;
  systemTheme?: "dark" | "light";
  setTheme: SetTheme;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  themes: ["light", "dark"],
  theme: undefined,
  resolvedTheme: undefined,
  systemTheme: undefined,
  setTheme: () => {},
});

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getThemeFromStorage(storageKey: string): string | null {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string | string[];
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
  forcedTheme?: string;
  themes?: string[];
  enableColorScheme?: boolean;
  nonce?: string;
}

export function ThemeProvider({
  children,
  attribute = "data-theme",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "theme",
  disableTransitionOnChange = false,
  forcedTheme,
  themes = ["light", "dark"],
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setThemeState] = React.useState<string>(
    defaultTheme === "system" && enableSystem ? "system" : defaultTheme
  );
  const [systemTheme, setSystemTheme] = React.useState<"dark" | "light">("light");

  // System theme listener
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    setSystemTheme(mq.matches ? "dark" : "light");
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Read stored theme on mount (client-side only to prevent hydration mismatch)
  React.useEffect(() => {
    const stored = getThemeFromStorage(storageKey);
    if (stored) {
      setThemeState(stored);
    }
    setMounted(true);
  }, [storageKey]);

  // Sync theme across tabs
  React.useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [storageKey]);

  // Update <html> attribute when theme changes
  React.useEffect(() => {
    const resolved =
      forcedTheme || (theme === "system" ? systemTheme : theme) || defaultTheme;

    const attrs = Array.isArray(attribute) ? attribute : [attribute];
    const root = document.documentElement;

    if (disableTransitionOnChange) {
      const css = document.createElement("style");
      css.appendChild(
        document.createTextNode(
          "*,*::before,*::after{transition:none!important}"
        )
      );
      document.head.appendChild(css);
      root.classList.add("theme-transitioning");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.head.removeChild(css);
          root.classList.remove("theme-transitioning");
        });
      });
    }

    for (const attr of attrs) {
      if (attr === "class") {
        for (const t of themes) {
          root.classList.remove(t);
        }
        if (resolved !== "system") {
          root.classList.add(resolved);
        }
      } else {
        root.setAttribute(attr, resolved);
      }
    }
  }, [theme, systemTheme, forcedTheme, attribute, defaultTheme, disableTransitionOnChange, themes]);

  const setTheme: SetTheme = React.useCallback(
    (newTheme) => {
      const value = typeof newTheme === "function" ? newTheme(theme) : newTheme;
      setThemeState(value);
      try {
        localStorage.setItem(storageKey, value);
      } catch {}
    },
    [theme, storageKey]
  );

  const resolvedTheme = forcedTheme || (theme === "system" ? systemTheme : theme);
  const currentSystemTheme = getSystemTheme();

  const contextValue: ThemeContextValue = {
    themes: enableSystem ? [...themes, "system"] : themes,
    forcedTheme,
    theme: mounted ? theme : undefined,
    resolvedTheme: mounted ? resolvedTheme : undefined,
    systemTheme: currentSystemTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}

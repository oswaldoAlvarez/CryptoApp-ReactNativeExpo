import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";

export type ThemeName = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
}

const STORAGE_KEY = "APP_THEME_OVERRIDE";

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = (Appearance.getColorScheme() || "light") as ThemeName;
  const [theme, setTheme] = useState<ThemeName>(systemScheme);
  const [hasOverride, setHasOverride] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
          setTheme(stored);
          setHasOverride(true);
        } else {
          setTheme(systemScheme);
        }
      } catch {
        setTheme(systemScheme);
      }
    })();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (!hasOverride) {
        setTheme((colorScheme || "light") as ThemeName);
      }
    });
    return () => listener.remove();
  }, [hasOverride, systemScheme]);

  const toggleTheme = async () => {
    const next = theme === "dark" ? "light" : "dark";
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
      setHasOverride(true);
    } catch {
      /* ignorar error */
    }
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeToggle() {
  return useContext(ThemeContext);
}

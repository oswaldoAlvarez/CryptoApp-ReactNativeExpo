import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export const useThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  return { theme, isDark, toggleTheme };
};

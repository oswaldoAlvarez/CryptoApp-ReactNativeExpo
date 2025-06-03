// components/ThemeToggleSwitch.tsx
import { useThemeToggle } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Switch, View } from "react-native";
import { TextView } from "../textView/TextView.component";
import { styles } from "./ThemeToggleSwitch.styles";

export const ThemeToggleSwitch = () => {
  const { colors } = useTheme();
  const { theme, toggleTheme } = useThemeToggle();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Ionicons
        name={isDark ? "moon" : "sunny"}
        size={30}
        color={colors.text}
        style={styles.icon}
      />
      <TextView textStyles={[styles.label, { color: colors.text }]}>
        {t("dark_mode")}
      </TextView>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: colors.border, true: "white" }}
        thumbColor={isDark ? colors.card : colors.text}
        style={styles.switch}
      />
    </View>
  );
};

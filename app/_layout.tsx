import "@/i18n";
import "../ReactotronConfig";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider as AppThemeProvider,
  useThemeToggle,
} from "../theme/ThemeContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>
  );
}

function AppContent() {
  const { theme } = useThemeToggle();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const navTheme =
    theme === "dark" ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationThemeProvider value={navTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="cryptodetail"
                options={{
                  headerShown: true,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen name="settings" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationThemeProvider>
    </QueryClientProvider>
  );
}

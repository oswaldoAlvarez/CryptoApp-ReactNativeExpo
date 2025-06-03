import { styles } from "@/styles/(tabs)/_layout.styles";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

const ICON_SIZE = 24;

export default function TabLayout() {
  const router = useRouter();
  const { colors } = useTheme();

  const screenOptions = {
    tabBarButton: (props: BottomTabBarButtonProps) => {
      const { ref, ...rest } = props;

      return <Pressable {...rest} android_ripple={styles.androidRipple} />;
    },
    headerRight: () => (
      <Pressable onPress={() => router.push("/settings")} style={styles.burger}>
        <Ionicons name="menu" size={ICON_SIZE} color={colors.text} />
      </Pressable>
    ),
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orderbook"
        options={{
          title: "Orderbook",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Define a custom orange color scheme
const orangeTheme = {
  light: {
    tint: "#FFA500", // Orange color for light mode
    background: "#FFF5E1", // Light background
  },
  dark: {
    tint: "#FF8C00", // Darker orange for dark mode
    background: "#333", // Dark background for contrast
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Use custom orange theme
  const theme = orangeTheme[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint, // Set the active tab color to orange
        tabBarInactiveTintColor: "#A9A9A9", // Light gray color for inactive tabs
        tabBarStyle: {
          backgroundColor: theme.background, // Set the background color to a light orange
          borderTopWidth: 0, // Remove border
          height: 60, // Increase height for modern look
          paddingBottom: 10,
        },
        tabBarButton: HapticTab, // Keep the haptic feedback on tab press
        tabBarBackground: TabBarBackground,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: "Checkout",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

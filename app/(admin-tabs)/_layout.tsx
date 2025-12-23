import { useColorScheme } from "@/hooks/use-color-scheme";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function AdminTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "관리자 홈",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              name='home'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='dashboard'
        options={{
          title: "대시보드",
          tabBarIcon: ({ color }) => (
            <EvilIcons
              size={28}
              name='chart'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "설정",
          tabBarIcon: ({ color }) => (
            <EvilIcons
              size={28}
              name='gear'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

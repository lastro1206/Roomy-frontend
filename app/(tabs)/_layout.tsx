import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome, FontAwesome6, Ionicons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
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
          title: "홈",
          tabBarIcon: ({ color }) => (
            <Octicons
              size={24}
              name='home-fill'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='matching'
        options={{
          title: "매칭",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={24}
              name='extension-puzzle-sharp'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='lifeManagement'
        options={{
          title: "생활관리",
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              size={24}
              name='building-circle-check'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='mypage'
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={24}
              name='user'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

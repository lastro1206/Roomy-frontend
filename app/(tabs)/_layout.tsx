import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome } from "@expo/vector-icons";
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
            <FontAwesome
              size={28}
              name='home'
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
            <FontAwesome
              size={28}
              name='search'
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
            <FontAwesome
              size={28}
              name='building'
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
              size={28}
              name='user'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

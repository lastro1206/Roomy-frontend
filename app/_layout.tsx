// app/_layout.tsx
import { AuthProvider } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

// SplashScreen을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: "userLogin",
};

// 전역 스타일 설정
const defaultTextStyle = StyleSheet.create({
  default: {
    fontFamily: "Pretendard-Regular",
  },
});

const defaultTextInputStyle = StyleSheet.create({
  default: {
    fontFamily: "Pretendard-Regular",
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  // 폰트 로드
  const [fontsLoaded, fontError] = useFonts({
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // 전역 폰트 설정 - 더 안전한 방법
  useEffect(() => {
    if (fontsLoaded) {
      // Text 컴포넌트의 defaultProps 설정
      const TextComponent = Text as any;
      const originalDefaultProps = TextComponent.defaultProps;
      TextComponent.defaultProps = {
        ...originalDefaultProps,
        style: [defaultTextStyle.default, originalDefaultProps?.style],
      };

      // TextInput 컴포넌트의 defaultProps 설정
      const TextInputComponent = TextInput as any;
      const originalTextInputDefaultProps = TextInputComponent.defaultProps;
      TextInputComponent.defaultProps = {
        ...originalTextInputDefaultProps,
        style: [
          defaultTextInputStyle.default,
          originalTextInputDefaultProps?.style,
        ],
      };
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={navigationTheme}>
          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen
                name='userLogin'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='adminLogin'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='(tabs)'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='(admin-tabs)'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/nickName'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/gender'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/age'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/smoking'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/wakeUpTime'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/sleepTime'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/snoring'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/cleaningCycle'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/drinking'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/absentDay'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/bugCatching'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/mbti'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/hobby'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/rules'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='onboarding/kakaoId'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='matching'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='mypage'
                options={{ headerShown: false }}
              />
            </Stack>
            <StatusBar style='auto' />
          </QueryClientProvider>
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

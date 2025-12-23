import { onboardingStyles } from "@/styles/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WheelPickerExpo from "react-native-wheel-picker-expo";

export default function AgeScreen() {
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 40 }, (_, i) => currentYear - i),
    [currentYear]
  );
  const { setBirthYear } = useOnboardingStore();

  // 초기값 2000년
  const defaultIndex = years.indexOf(2000);
  const [selectedIndex, setSelectedIndex] = useState(
    defaultIndex !== -1 ? defaultIndex : 0
  );
  const [selectedYear, setSelectedYear] = useState(years[selectedIndex]);

  useEffect(() => {
    const year = years[selectedIndex];
    setSelectedYear(year);
    setBirthYear(year);
  }, [selectedIndex, years, setBirthYear]);

  const handleNext = () => {
    if (!selectedYear) {
      return;
    }
    router.push("/onboarding/secondWelcomeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        출생년도를 선택해주세요
      </Text>

      <View style={onboardingStyles.wheelContainer}>
        <WheelPickerExpo
          initialSelectedIndex={years.indexOf(2000)}
          items={years.map((year) => ({
            label: String(year) + "년",
            value: year,
          }))}
          onChange={(result: { index: number }) => {
            if (result) {
              setSelectedIndex(result.index);
            }
          }}
          selectedStyle={{
            borderColor: "#E0E0E0",
            borderWidth: 1,
          }}
        />
      </View>

      <Button
        mode='contained'
        onPress={handleNext}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

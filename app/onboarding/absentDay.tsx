import { onboardingStyles } from "@/styles/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AbsentDayScreen() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const { setAbsentDays } = useOnboardingStore();

  const days = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];

  const handleDayToggle = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newDays);
    setAbsentDays(newDays);
  };

  const handleNext = () => {
    router.push("/onboarding/thirdWelcomeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        기숙사에 없는 고정 요일을 선택해주세요.
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 20, color: "#666" }}>
        여러 개 선택 가능합니다
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        {days.map((day) => (
          <Button
            key={day}
            mode={selectedDays.includes(day) ? "contained" : "outlined"}
            onPress={() => handleDayToggle(day)}
            style={onboardingStyles.button}>
            {day}
          </Button>
        ))}
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

import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertAbsentDaysToEnglish } from "@/hooks/absentDay";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
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
    setAbsentDays(convertAbsentDaysToEnglish(newDays));
  };

  const handleNext = () => {
    // 선택 사항이므로 검증 없이 바로 다음으로
    router.push("/onboarding/thirdWelcomeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.65} />

      <Text style={onboardingStyles.title}>
        기숙사에 없는 고정 요일을{'\n'}선택해주세요
      </Text>
      <Text
        style={{
          textAlign: "left",
          marginBottom: 20,
          color: "#666",
        }}>
        선택 사항이며, 여러 개 선택 가능합니다
      </Text>

      <View
        style={[
          onboardingStyles.buttonContainer,
          {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 14,
          },
        ]}>
        {days.map((day) => {
          const selected = selectedDays.includes(day);
          return (
            <Pressable
              key={day}
              style={[
                onboardingStyles.optionButton,
                selected && onboardingStyles.optionButtonSelected,
                {
                  width: "48%", // 2열 그리드를 위해 약 48% 너비
                },
              ]}
              onPress={() => handleDayToggle(day)}>
              <Text
                style={[
                  onboardingStyles.optionText,
                  selected && onboardingStyles.optionTextSelected,
                ]}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
      
      <View style={onboardingStyles.footer}>
        <Pressable
          style={onboardingStyles.nextButton}
          onPress={handleNext}>
          <Text style={onboardingStyles.nextLabel}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertSleepTimeToNumber } from "@/hooks/sleepTime";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SleepTimeScreen() {
  const [sleepTime, setSleepTime] = useState<string>("");
  const [sleepTimeNumber, setSleepTimeNumber] = useState<number | null>(null);
  const { setSleepTime: setStoreSleepTime } = useOnboardingStore();

  const timeOptions = [
    "오후 9시 이전",
    "오후 9시~10시",
    "오후 10시~11시",
    "오후 11시~12시",
    "오전 12시 이후"
  ];

  const handleTimeSelect = (time: string) => {
    setSleepTime(time);
    const number = convertSleepTimeToNumber(time);
    setSleepTimeNumber(number);
    if (number !== null) {
      setStoreSleepTime(number);
    }
  };

  const handleNext = () => {
    if (!sleepTime || sleepTimeNumber === null) return;
    router.push("/onboarding/wakeUpTime");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.35} />

      <Text style={onboardingStyles.title}>평소 취침 시간을 선택해주세요</Text>

      <View style={onboardingStyles.buttonContainer}>
        {timeOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              onboardingStyles.optionButton,
              sleepTime === option && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleTimeSelect(option)}>
            <Text
              style={[
                onboardingStyles.optionText,
                sleepTime === option && onboardingStyles.optionTextSelected,
              ]}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={onboardingStyles.footer}>
        <Pressable
          style={[
            onboardingStyles.nextButton,
            (!sleepTime || sleepTimeNumber === null) &&
              onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!sleepTime || sleepTimeNumber === null}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              (!sleepTime || sleepTimeNumber === null) &&
                onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
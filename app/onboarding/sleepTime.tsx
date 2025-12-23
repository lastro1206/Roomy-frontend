import { convertSleepTimeToNumber } from "@/hooks/sleepTime";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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
    "오전 12시~1시",
    "오전 1시~2시",
    "오전 2시 이후",
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
    if (!sleepTime || sleepTimeNumber === null) {
      return;
    }

    router.push("/onboarding/wakeUpTime");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        평소 취침 시간을 선택해주세요.
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        {timeOptions.map((option) => (
          <Button
            key={option}
            mode={sleepTime === option ? "contained" : "outlined"}
            onPress={() => handleTimeSelect(option)}
            style={onboardingStyles.button}>
            {option}
          </Button>
        ))}
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!sleepTime || sleepTimeNumber === null}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

import { convertWakeUpTimeToNumber } from "@/hooks/wakeUpTime";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WakeUpTimeScreen() {
  const [wakeUpTime, setWakeUpTime] = useState<string>("");
  const [wakeUpTimeNumber, setWakeUpTimeNumber] = useState<number | null>(null);
  const [wakeByAlarm, setWakeByAlarm] = useState<boolean | null>(null);
  const [showAlarmQuestion, setShowAlarmQuestion] = useState(false);
  const { setWakeTime } = useOnboardingStore();

  const timeOptions = [
    "오전 6시 이전",
    "오전 6시~7시",
    "오전 7시~8시",
    "오전 8시~9시",
    "오전 9시~10시",
    "오전 10시~11시",
    "오전 11시 이후",
  ];

  const handleNext = () => {
    if (!wakeUpTime || wakeUpTimeNumber === null) {
      return;
    }
    if (showAlarmQuestion) {
      if (wakeByAlarm === null) {
        return;
      }
    }
    router.push("/onboarding/snoring");
  };

  const handleTimeSelect = (time: string) => {
    setWakeUpTime(time);
    const number = convertWakeUpTimeToNumber(time);
    setWakeUpTimeNumber(number);
    if (number !== null) {
      setWakeTime(number);
    }
    setShowAlarmQuestion(true);
  };

  const handleAlarmSelect = (byAlarm: boolean) => {
    setWakeByAlarm(byAlarm);
  };

  if (showAlarmQuestion) {
    return (
      <SafeAreaView style={onboardingStyles.container}>
        <Text
          variant='headlineMedium'
          style={onboardingStyles.title}>
          알림 소리에 의해 일어나시나요?
        </Text>
        <View style={onboardingStyles.buttonContainer}>
          <Button
            mode={wakeByAlarm === true ? "contained" : "outlined"}
            onPress={() => handleAlarmSelect(true)}
            style={onboardingStyles.button}>
            네
          </Button>
          <Button
            mode={wakeByAlarm === false ? "contained" : "outlined"}
            onPress={() => handleAlarmSelect(false)}
            style={onboardingStyles.button}>
            아니오
          </Button>
        </View>
        <Button
          mode='contained'
          onPress={handleNext}
          disabled={wakeByAlarm === null}
          style={onboardingStyles.nextButton}>
          다음
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        평소 기상 시간을 선택해주세요.
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        {timeOptions.map((option) => (
          <Button
            key={option}
            mode={wakeUpTime === option ? "contained" : "outlined"}
            onPress={() => handleTimeSelect(option)}
            style={onboardingStyles.button}>
            {option}
          </Button>
        ))}
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={wakeUpTime === null || wakeUpTimeNumber === null}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

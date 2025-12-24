import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertWakeUpTimeToNumber } from "@/hooks/wakeUpTime";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
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
    "오전 9시 이후"
  ];

  const handleNext = () => {
    if (!wakeUpTime || wakeUpTimeNumber === null) return;
    if (showAlarmQuestion && wakeByAlarm === null) return;
    router.push("/onboarding/snoring");
  };

  const handleTimeSelect = (time: string) => {
    setWakeUpTime(time);
    const number = convertWakeUpTimeToNumber(time);
    setWakeUpTimeNumber(number);
    if (number !== null) setWakeTime(number);
    setShowAlarmQuestion(true);
  };

  const handleAlarmSelect = (byAlarm: boolean) => {
    setWakeByAlarm(byAlarm);
  };

  // 2단계: 알람 관련 질문
  if (showAlarmQuestion) {
    return (
      <SafeAreaView style={onboardingStyles.container}>
        <OnboardingHeader progress={0.45} />

        <Text style={onboardingStyles.title}>알림 소리에 의해 일어나시나요?</Text>

        <View style={onboardingStyles.buttonContainer}>
          {[
            { key: "YES", label: "네" },
            { key: "NO", label: "아니오" },
          ].map((item) => (
            <Pressable
              key={item.key}
              style={[
                onboardingStyles.optionButton,
                wakeByAlarm === (item.key === "YES") &&
                  onboardingStyles.optionButtonSelected,
              ]}
              onPress={() => handleAlarmSelect(item.key === "YES")}>
              <Text
                style={[
                  onboardingStyles.optionText,
                  wakeByAlarm === (item.key === "YES") &&
                    onboardingStyles.optionTextSelected,
                ]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={onboardingStyles.footer}>
          <Pressable
            style={[
              onboardingStyles.nextButton,
              wakeByAlarm === null && onboardingStyles.nextButtonDisabled,
            ]}
            disabled={wakeByAlarm === null}
            onPress={handleNext}>
            <Text
              style={[
                onboardingStyles.nextLabel,
                wakeByAlarm === null && onboardingStyles.nextLabelDisabled,
              ]}>
              다음
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // 1단계: 기상 시간 선택
  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.4} />

      <Text style={onboardingStyles.title}>평소 기상 시간을 선택해주세요</Text>

      <View style={onboardingStyles.buttonContainer}>
        {timeOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              onboardingStyles.optionButton,
              wakeUpTime === option && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleTimeSelect(option)}>
            <Text
              style={[
                onboardingStyles.optionText,
                wakeUpTime === option && onboardingStyles.optionTextSelected,
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
            (!wakeUpTime || wakeUpTimeNumber === null) &&
              onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!wakeUpTime || wakeUpTimeNumber === null}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              (!wakeUpTime || wakeUpTimeNumber === null) &&
                onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
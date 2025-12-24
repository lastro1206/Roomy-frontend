import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertCleaningCycleToEnum } from "@/hooks/cleaningCycle";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CleaningCycleScreen() {
  const [cleaningCycle, setCleaningCycle] = useState<string>("");
  const { setCleaningCycle: setStoreCleaningCycle } = useOnboardingStore();

  const cycleOptions = [
    "매일/수시로 한다",
    "주 1~2회 한다",
    "거의 하지 않는다",
  ];

  const handleCycleSelect = (cycle: string) => {
    setCleaningCycle(cycle);
    const enumValue = convertCleaningCycleToEnum(cycle);
    if (enumValue) {
      setStoreCleaningCycle(enumValue);
    }
  };

  const handleNext = () => {
    if (!cleaningCycle) return;
    router.push("/onboarding/drinking");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.55} />

      <Text style={onboardingStyles.title}>청소 주기를 선택해주세요</Text>

      <View style={onboardingStyles.buttonContainer}>
        {cycleOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              onboardingStyles.optionButton,
              cleaningCycle === option && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleCycleSelect(option)}>
            <Text
              style={[
                onboardingStyles.optionText,
                cleaningCycle === option && onboardingStyles.optionTextSelected,
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
            !cleaningCycle && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!cleaningCycle}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              !cleaningCycle && onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
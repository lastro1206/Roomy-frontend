import { onboardingStyles } from "@/styles/onboarding";
import { convertCleaningCycleToEnum } from "@/hooks/cleaningCycle";
import { useOnboardingStore } from "@/store/onboardingStore";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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
    if (!cleaningCycle) {
      return;
    }
    router.push("/onboarding/drinking");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        청소 주기를 선택해주세요.
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        {cycleOptions.map((option) => (
          <Button
            key={option}
            mode={cleaningCycle === option ? "contained" : "outlined"}
            onPress={() => handleCycleSelect(option)}
            style={onboardingStyles.button}>
            {option}
          </Button>
        ))}
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!cleaningCycle}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

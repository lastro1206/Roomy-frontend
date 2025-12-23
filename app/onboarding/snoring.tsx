import { onboardingStyles } from "@/styles/onboarding";
import { convertSnoringToBoolean } from "@/hooks/booleanConverters";
import { useOnboardingStore } from "@/store/onboardingStore";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SnoringScreen() {
  const [snoring, setSnoring] = useState<string>("");
  const { setSnoring: setStoreSnoring } = useOnboardingStore();

  const handleSnoringSelect = (value: string) => {
    setSnoring(value);
    const isSnoring = convertSnoringToBoolean(value);
    setStoreSnoring(isSnoring);
  };

  const handleNext = () => {
    if (!snoring) {
      return;
    }
    router.push("/onboarding/cleaningCycle");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        코를 고시나요?
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        <Button
          mode={snoring === "네" ? "contained" : "outlined"}
          onPress={() => handleSnoringSelect("네")}
          style={onboardingStyles.button}>
          네
        </Button>
        <Button
          mode={snoring === "아니오" ? "contained" : "outlined"}
          onPress={() => handleSnoringSelect("아니오")}
          style={onboardingStyles.button}>
          아니오
        </Button>
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!snoring}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

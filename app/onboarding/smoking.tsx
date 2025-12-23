// app/onboarding/smoking.tsx
import { convertSmokingToBoolean } from "@/hooks/booleanConverters";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SmokingScreen() {
  const [smoking, setSmoking] = useState<string>("");
  const { setSmoker } = useOnboardingStore();

  const handleSmokingSelect = (value: string) => {
    setSmoking(value);
    const isSmoker = convertSmokingToBoolean(value);
    setSmoker(isSmoker);
  };

  const handleNext = () => {
    if (!smoking) {
      return;
    }
    router.push("/onboarding/sleepTime");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        흡연 여부를 선택해주세요.
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        <Button
          mode={smoking === "한다" ? "contained" : "outlined"}
          onPress={() => handleSmokingSelect("한다")}
          style={onboardingStyles.button}>
          한다
        </Button>
        <Button
          mode={smoking === "하지 않는다" ? "contained" : "outlined"}
          onPress={() => handleSmokingSelect("하지 않는다")}
          style={onboardingStyles.button}>
          하지 않는다
        </Button>
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!smoking}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

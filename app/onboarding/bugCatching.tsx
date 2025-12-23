import { convertBugCatchingToBoolean } from "@/hooks/booleanConverters";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BugCatchingScreen() {
  const [bugCatching, setBugCatching] = useState<string>("");
  const { setBugKiller } = useOnboardingStore();

  const handleBugCatchingSelect = (value: string) => {
    setBugCatching(value);
    const isBugKiller = convertBugCatchingToBoolean(value);
    setBugKiller(isBugKiller);
  };

  const handleNext = () => {
    if (!bugCatching) {
      return;
    }
    router.push("/onboarding/mbti");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        벌레를 잘 잡으시나요?
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        <Button
          mode={bugCatching === "잡는다" ? "contained" : "outlined"}
          onPress={() => handleBugCatchingSelect("잡는다")}
          style={onboardingStyles.button}>
          잡는다
        </Button>

        <Button
          mode={bugCatching === "못잡는다" ? "contained" : "outlined"}
          onPress={() => handleBugCatchingSelect("못잡는다")}
          style={onboardingStyles.button}>
          못잡는다
        </Button>
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!bugCatching}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

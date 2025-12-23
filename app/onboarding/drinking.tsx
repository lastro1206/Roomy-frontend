import { onboardingStyles } from "@/styles/onboarding";
import { convertDrinkingToEnum } from "@/hooks/drinking";
import { useOnboardingStore } from "@/store/onboardingStore";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrinkingScreen() {
  const [drinking, setDrinking] = useState<string>("");
  const { setDrinkingStyle } = useOnboardingStore();

  const drinkingOptions = ["거의 하지 않는다", "주 1~2회 한다", "그 이상 한다"];

  const handleDrinkingSelect = (value: string) => {
    setDrinking(value);
    const enumValue = convertDrinkingToEnum(value);
    if (enumValue) {
      setDrinkingStyle(enumValue);
    }
  };

  const handleNext = () => {
    if (!drinking) {
      return;
    }
    router.push("/onboarding/absentDay");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        술자리 빈도를 선택해주세요.
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        {drinkingOptions.map((option) => (
          <Button
            key={option}
            mode={drinking === option ? "contained" : "outlined"}
            onPress={() => handleDrinkingSelect(option)}
            style={onboardingStyles.button}>
            {option}
          </Button>
        ))}
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!drinking}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

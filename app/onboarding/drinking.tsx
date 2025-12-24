import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertDrinkingToEnum } from "@/hooks/drinking";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrinkingScreen() {
  const [drinking, setDrinking] = useState<string>("");
  const { setDrinkingStyle } = useOnboardingStore();

  const drinkingOptions = ["거의 하지 않는다", "주 1~2회 한다", "그 이상 한다"];

  const handleDrinkingSelect = (value: string) => {
    setDrinking(value);
    const enumValue = convertDrinkingToEnum(value);
    if (enumValue) {
      setDrinkingStyle(enumValue as any);
    }
  };

  const handleNext = () => {
    if (!drinking) return;
    router.push("/onboarding/absentDay");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.6} />

      <Text style={onboardingStyles.title}>술자리 빈도를 선택해주세요</Text>

      <View style={onboardingStyles.buttonContainer}>
        {drinkingOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              onboardingStyles.optionButton,
              drinking === option && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleDrinkingSelect(option)}>
            <Text
              style={[
                onboardingStyles.optionText,
                drinking === option && onboardingStyles.optionTextSelected,
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
            !drinking && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!drinking}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              !drinking && onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
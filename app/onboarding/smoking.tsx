// app/onboarding/smoking.tsx
import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertSmokingToBoolean } from "@/hooks/booleanConverters";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
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
    if (!smoking) return;
    router.push("/onboarding/sleepTime");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.3} />

      <Text style={onboardingStyles.title}>흡연 여부를 선택해주세요</Text>

      <View style={onboardingStyles.buttonContainer}>
        {[
          { key: "한다", label: "한다" },
          { key: "하지 않는다", label: "하지 않는다" },
        ].map((item) => (
          <Pressable
            key={item.key}
            style={[
              onboardingStyles.optionButton,
              smoking === item.key && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleSmokingSelect(item.key)}>
            <Text
              style={[
                onboardingStyles.optionText,
                smoking === item.key && onboardingStyles.optionTextSelected,
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
            !smoking && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!smoking}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              !smoking && onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
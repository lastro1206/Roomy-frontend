import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertSnoringToBoolean } from "@/hooks/booleanConverters";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
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
    if (!snoring) return;
    router.push("/onboarding/cleaningCycle");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.5} />

      <Text style={onboardingStyles.title}>코를 고시나요?</Text>

      <View style={onboardingStyles.buttonContainer}>
        {[
          { key: "네", label: "네" },
          { key: "아니오", label: "아니오" },
        ].map((item) => (
          <Pressable
            key={item.key}
            style={[
              onboardingStyles.optionButton,
              snoring === item.key && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleSnoringSelect(item.key)}>
            <Text
              style={[
                onboardingStyles.optionText,
                snoring === item.key && onboardingStyles.optionTextSelected,
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
            !snoring && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!snoring}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              !snoring && onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
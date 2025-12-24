import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertBugCatchingToBoolean } from "@/hooks/booleanConverters";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
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
    if (!bugCatching) return;
    router.push("/onboarding/mbti");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.75} />

      <Text style={onboardingStyles.title}>벌레를 잘 잡으시나요?</Text>

      <View style={onboardingStyles.buttonContainer}>
        {[
          { key: "잡는다", label: "잡는다" },
          { key: "못잡는다", label: "못 잡는다" },
        ].map((item) => (
          <Pressable
            key={item.key}
            style={[
              onboardingStyles.optionButton,
              bugCatching === item.key && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleBugCatchingSelect(item.key)}>
            <Text
              style={[
                onboardingStyles.optionText,
                bugCatching === item.key && onboardingStyles.optionTextSelected,
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
            !bugCatching && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!bugCatching}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              !bugCatching && onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
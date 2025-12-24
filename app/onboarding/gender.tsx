import { OnboardingHeader } from "@/components/OnboardingHeader";
import { convertGenderToBackend } from "@/hooks/gender";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GenderScreen() {
  const [gender, setGender] = useState<string>("");
  const [army, setArmy] = useState<string>("");
  const [showArmyQuestion, setShowArmyQuestion] = useState(false);
  const { setGender: setStoreGender } = useOnboardingStore();

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    const backendGender = convertGenderToBackend(selectedGender);
    setStoreGender(backendGender);
    setShowArmyQuestion(selectedGender === "남");
  };

  const handleArmySelect = (armyStatus: string) => {
    setArmy(armyStatus);
  };

  const handleNext = () => {
    if (!gender) return;
    if (gender === "남" && !army) return;
    router.push("/onboarding/age");
  };

  // 군필 여부 화면
  if (showArmyQuestion) {
    return (
      <SafeAreaView style={onboardingStyles.container}>
        <OnboardingHeader progress={0.1} />
        <Text style={onboardingStyles.title}>군필 여부를 선택해주세요</Text>

        <View style={onboardingStyles.buttonContainer}>
          {["군필", "미필", "해당없음"].map((item) => (
            <Pressable
              key={item}
              style={[
                onboardingStyles.optionButton,
                army === item && onboardingStyles.optionButtonSelected,
              ]}
              onPress={() => handleArmySelect(item)}>
              <Text style={[onboardingStyles.optionText, army === item && onboardingStyles.optionTextSelected]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <View style={onboardingStyles.footer}>
  <Pressable
    style={[
      onboardingStyles.nextButton,
      !army && onboardingStyles.nextButtonDisabled,
    ]}
    disabled={!army}
    onPress={handleNext}>
    <Text
      style={[
        onboardingStyles.nextLabel,
        !army && onboardingStyles.nextLabelDisabled,
      ]}>
      다음
    </Text>
  </Pressable>
</View>
      </SafeAreaView>
    );
  }

  // 기본 성별 화면
  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.1} />
      <Text style={onboardingStyles.title}>성별을 선택해주세요</Text>

      <View style={onboardingStyles.buttonContainer}>
        {["남", "여"].map((item) => (
          <Pressable
            key={item}
            style={[
              onboardingStyles.optionButton,
              gender === item && onboardingStyles.optionButtonSelected,
            ]}
            onPress={() => handleGenderSelect(item)}>
            <Text style={[onboardingStyles.optionText, gender === item && onboardingStyles.optionTextSelected]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={onboardingStyles.footer}>
        <Pressable
          style={[
            onboardingStyles.nextButton,
            !gender && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!gender}
          onPress={handleNext}>
          <Text style={onboardingStyles.nextLabel}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
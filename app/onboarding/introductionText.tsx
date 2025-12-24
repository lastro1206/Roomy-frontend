import { OnboardingHeader } from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntroductionTextScreen() {
  const [rules, setRules] = useState<string>("");
  const { setSelfDescription } = useOnboardingStore();

  const handleNext = () => {
    if (!rules.trim()) return; // 필수
    setSelfDescription(rules.trim());
    router.push("/onboarding/wannaRoomateText");
  };

  const disabled = !rules.trim();

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.9} />

      <Text style={onboardingStyles.title}>간단한 자기소개를 입력해주세요</Text>

      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 8,
            padding: 15,
            height: 150,
            textAlignVertical: "top",
            fontSize: 16,
            color: "#000",
            width: "100%",
          }}
          placeholder="예: 조용한 환경을 선호합니다, 깔끔한 공간을 좋아합니다 등"
          placeholderTextColor="#B3B3B3"
          value={rules}
          onChangeText={setRules}
          multiline
        />
      </View>

      <View style={onboardingStyles.footer}>
        <Pressable
          style={[
            onboardingStyles.nextButton,
            disabled && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={disabled}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              disabled && onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
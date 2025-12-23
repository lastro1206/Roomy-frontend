import { onboardingStyles } from "@/styles/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntroductionTextScreen() {
  const [rules, setRules] = useState<string>("");
  const { setSelfDescription } = useOnboardingStore();

  const handleNext = () => {
    setSelfDescription(rules || "");
    router.push("/onboarding/wannaRoomateText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        간단한 자기소개를 입력해주세요.
      </Text>
      <View style={{ marginVertical: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 8,
            padding: 15,
            minHeight: 150,
            textAlignVertical: "top",
            fontSize: 16,
          }}
          placeholder='예: 조용한 환경을 선호합니다, 깔끔한 공간을 좋아합니다 등'
          value={rules}
          onChangeText={setRules}
          multiline
        />
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

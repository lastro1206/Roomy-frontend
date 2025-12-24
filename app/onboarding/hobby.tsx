import { OnboardingHeader } from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HobbyScreen() {
  const [hobby, setHobby] = useState<string>("");
  const { setHobby: setStoreHobby } = useOnboardingStore();

  const handleNext = () => {
    // 선택 사항이므로 빈 문자열도 허용
    setStoreHobby(hobby || "");
    router.push("/onboarding/fourthWelcomeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.85} />

      <Text style={onboardingStyles.title}>취미를 입력해주세요</Text>

      <View style={{ marginVertical: 20}}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#C2C4C8",
            borderRadius: 8,
            padding: 15,
            color: "#000",
            minHeight: 100,
            textAlignVertical: "top",
            fontSize: 16,
          }}
          placeholder="예: 독서, 영화 감상, 게임, 운동 등"
          value={hobby}
          onChangeText={setHobby}
          multiline
        />
      </View>

      <View style={onboardingStyles.footer}>
        <Pressable
          style={onboardingStyles.nextButton}
          onPress={handleNext}>
          <Text style={onboardingStyles.nextLabel}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
import { OnboardingHeader } from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WannaRoomateTextScreen() {
  const [wannaRoomateText, setWannaRoomateText] = useState<string>("");
  const { setRoommateDescription } = useOnboardingStore();

  const handleNext = () => {
    // 선택 사항: 비워도 빈 문자열로 저장
    setRoommateDescription(wannaRoomateText || "");
    router.push("/onboarding/kakaoId");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.95} />

      <Text style={onboardingStyles.title}>
        룸메이트에게 바라는 점을 입력해주세요
      </Text>

      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#C2C4C8",
            borderRadius: 8,
            padding: 15,
            height: 150,              // 포커스 시 줄어들지 않도록 고정 높이
            textAlignVertical: "top",
            fontSize: 16,
            color: "#000",
            width: "100%",
          }}
          placeholder="예: 방 청소 잘 해주세요, 조용한 환경을 선호합니다, 깔끔한 공간을 좋아합니다 등"
          placeholderTextColor="#B3B3B3"
          value={wannaRoomateText}
          onChangeText={setWannaRoomateText}
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
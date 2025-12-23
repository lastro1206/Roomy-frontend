import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WannaRoomateTextScreen() {
  const [wannaRoomateText, setWannaRoomateText] = useState<string>("");
  const { setRoommateDescription } = useOnboardingStore();

  const handleNext = () => {
    setRoommateDescription(wannaRoomateText || "");
    router.push("/onboarding/kakaoId");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        룸메이트에게 바라는 점을 입력해주세요.
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
          placeholder='예: 방 청소 잘 해주세요, 조용한 환경을 선호합니다, 깔끔한 공간을 좋아합니다 등'
          value={wannaRoomateText}
          onChangeText={setWannaRoomateText}
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

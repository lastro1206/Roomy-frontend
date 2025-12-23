import { generateRandomNickname } from "@/hooks/randonNickName";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NickNameScreen() {
  const [nickname, setNickname] = useState<string>("");
  const { setName } = useOnboardingStore();

  useEffect(() => {
    // 컴포넌트 마운트 시 랜덤 닉네임 생성
    const randomNick = generateRandomNickname();
    setNickname(randomNick);
    setName(randomNick);
  }, [setName]);

  const handleRegenerate = () => {
    const randomNick = generateRandomNickname();
    setNickname(randomNick);
    setName(randomNick);
  };

  const handleNext = () => {
    if (!nickname) {
      return;
    }
    router.push("/onboarding/gender");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        랜덤 닉네임이 생성되었습니다
      </Text>
      <View style={{ alignItems: "center", marginVertical: 40 }}>
        <Text
          variant='headlineSmall'
          style={{ color: "#007AFF", fontWeight: "bold" }}>
          {nickname}
        </Text>
      </View>
      <Button
        mode='outlined'
        onPress={handleRegenerate}
        style={onboardingStyles.button}>
        다른 닉네임 생성
      </Button>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!nickname}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

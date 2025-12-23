import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HobbyScreen() {
  const [hobby, setHobby] = useState<string>("");
  const { setHobby: setStoreHobby } = useOnboardingStore();

  const handleNext = () => {
    setStoreHobby(hobby || "");
    router.push("/onboarding/fourthWelcomeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        취미를 입력해주세요.
      </Text>
      <View style={{ marginVertical: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 8,
            padding: 15,
            minHeight: 100,
            textAlignVertical: "top",
            fontSize: 16,
          }}
          placeholder='예: 독서, 영화 감상, 게임, 운동 등'
          value={hobby}
          onChangeText={setHobby}
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

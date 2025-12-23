import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MBTIScreen() {
  const [mbti, setMbti] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setMbti: setStoreMbti } = useOnboardingStore();

  const validateMBTI = (value: string): boolean => {
    const mbtiRegex = /^[IE][SN][TF][JP]$/;
    return mbtiRegex.test(value);
  };

  const handleMBTIChange = (text: string) => {
    // 입력을 대문자로 변환하고 최대 4글자로 제한
    const upperText = text.toUpperCase().slice(0, 4);
    setMbti(upperText);

    // 4글자가 입력되었을 때만 검증
    if (upperText.length === 4) {
      if (!validateMBTI(upperText)) {
        setErrorMessage("올바른 MBTI 형식이 아닙니다. (예: ISTJ, ENFP)");
      } else {
        setErrorMessage("");
        setStoreMbti(upperText);
      }
    } else {
      setErrorMessage("");
    }
  };

  const handleNext = () => {
    if (!mbti) {
      setErrorMessage("MBTI를 입력해주세요.");
      return;
    }

    if (!validateMBTI(mbti)) {
      setErrorMessage("올바른 MBTI 형식이 아닙니다. (예: ISTJ, ENFP)");
      return;
    }

    setStoreMbti(mbti);
    router.push("/onboarding/hobby");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        MBTI를 입력해주세요.
      </Text>
      <View style={{ marginVertical: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errorMessage ? "#FF0000" : "#E0E0E0",
            borderRadius: 8,
            padding: 15,
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
          placeholder='예: ISTJ, ENFP'
          value={mbti}
          onChangeText={handleMBTIChange}
          autoCapitalize='characters'
          maxLength={4}
        />
        {errorMessage && (
          <Text
            style={{
              color: "#FF0000",
              fontSize: 14,
              marginTop: 8,
              textAlign: "center",
            }}>
            {errorMessage}
          </Text>
        )}
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!mbti || !!errorMessage}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

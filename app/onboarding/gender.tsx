import { convertGenderToBackend } from "@/hooks/gender";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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
    if (selectedGender === "남") {
      setShowArmyQuestion(true);
    } else {
      // 여성인 경우 군필 질문 화면은 표시하지 않음
      setShowArmyQuestion(false);
    }
  };

  const handleArmySelect = (armyStatus: string) => {
    setArmy(armyStatus);
  };

  const handleNext = () => {
    if (!gender) {
      return;
    }
    if (gender === "남" && !army) {
      return;
    }
    router.push("/onboarding/age");
  };

  if (showArmyQuestion) {
    return (
      <SafeAreaView style={onboardingStyles.container}>
        <Text
          variant='headlineMedium'
          style={onboardingStyles.title}>
          군필 여부를 선택해주세요.
        </Text>
        <View style={onboardingStyles.buttonContainer}>
          <Button
            mode={army === "군필" ? "contained" : "outlined"}
            onPress={() => handleArmySelect("군필")}
            style={onboardingStyles.button}>
            군필
          </Button>
          <Button
            mode={army === "미필" ? "contained" : "outlined"}
            onPress={() => handleArmySelect("미필")}
            style={onboardingStyles.button}>
            미필
          </Button>
          <Button
            mode={army === "해당없음" ? "contained" : "outlined"}
            onPress={() => handleArmySelect("해당없음")}
            style={onboardingStyles.button}>
            해당없음
          </Button>
        </View>
        <Button
          mode='contained'
          onPress={handleNext}
          disabled={!army}
          style={onboardingStyles.nextButton}>
          다음
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text
        variant='headlineMedium'
        style={onboardingStyles.title}>
        성별을 선택해주세요.
      </Text>
      <View style={onboardingStyles.buttonContainer}>
        <Button
          mode={gender === "남" ? "contained" : "outlined"}
          onPress={() => handleGenderSelect("남")}
          style={onboardingStyles.button}>
          남
        </Button>
        <Button
          mode={gender === "여" ? "contained" : "outlined"}
          onPress={() => handleGenderSelect("여")}
          style={onboardingStyles.button}>
          여
        </Button>
      </View>
      <Button
        mode='contained'
        onPress={handleNext}
        disabled={!gender}
        style={onboardingStyles.nextButton}>
        다음
      </Button>
    </SafeAreaView>
  );
}

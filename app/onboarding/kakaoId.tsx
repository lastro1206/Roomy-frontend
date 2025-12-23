import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KakaoIdScreen() {
  const [kakaoId, setKakaoId] = useState<string>("");
  const { setKakaoId: setStoreKakaoId } = useOnboardingStore();

  const handleComplete = () => {
    const trimmedKakaoId = kakaoId.trim();
    if (!trimmedKakaoId) {
      alert("카카오톡 아이디를 입력해주세요.");
      return;
    }
    
    console.log("=== 카카오톡 ID 저장 시작 ===");
    console.log("입력된 값:", trimmedKakaoId);
    
    // store에 저장
    setStoreKakaoId(trimmedKakaoId);
    
    // store에 저장되었는지 확인
    const store = useOnboardingStore.getState();
    console.log("저장 후 store 확인:", store.kakaoId);
    console.log("저장 성공 여부:", store.kakaoId === trimmedKakaoId);
    
    if (store.kakaoId !== trimmedKakaoId) {
      console.error("카카오톡 ID 저장 실패!");
      alert("카카오톡 ID 저장에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    
    console.log("=== 카카오톡 ID 저장 완료 ===");
    
    // 완료 화면으로 이동
    router.push("/onboarding/completeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text variant='headlineMedium' style={onboardingStyles.title}>
        카카오톡 아이디를 입력해주세요.
      </Text>
      <View style={{ marginVertical: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 8,
            padding: 15,
            fontSize: 16,
          }}
          placeholder='카카오톡 아이디'
          value={kakaoId}
          onChangeText={setKakaoId}
          autoCapitalize='none'
        />
      </View>
      <Button
        mode='contained'
        onPress={handleComplete}
        disabled={!kakaoId.trim()}
        style={onboardingStyles.nextButton}>
        완료
      </Button>
    </SafeAreaView>
  );
}


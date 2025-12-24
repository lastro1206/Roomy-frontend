import { OnboardingHeader } from "@/components/OnboardingHeader";
import { apiService } from "@/service/macthing/macthingService";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KakaoIdScreen() {
  const [kakaoId, setKakaoId] = useState<string>("");
  const { setKakaoId: setStoreKakaoId, setCreatedUserId } = useOnboardingStore();
  const onboarding = useOnboardingStore();

  const handleComplete = async () => {
    const trimmedKakaoId = kakaoId.trim();
    if (!trimmedKakaoId) {
      alert("카카오톡 아이디를 입력해주세요.");
      return;
    }

    // 1) 카카오 ID를 store에 먼저 반영
    setStoreKakaoId(trimmedKakaoId);
    const store = useOnboardingStore.getState();

    // 2) 지금까지 받은 온보딩 전체 데이터를 한 번에 묶어서 UserPayload 생성
    const requiredFields = {
      name: store.name,
      gender: store.gender,
      birthYear: store.birthYear,
      mbti: store.mbti,
      smoker: store.smoker,
      snoring: store.snoring,
      bugKiller: store.bugKiller,
      sleepTime: store.sleepTime,
      wakeTime: store.wakeTime,
      cleaningCycle: store.cleaningCycle,
      drinkingStyle: store.drinkingStyle,
    };

    const missing = Object.entries(requiredFields)
      .filter(([, v]) => v === null || v === undefined || v === "")
      .map(([k]) => k);

    if (missing.length > 0) {
      alert(
        `다음 정보가 누락되었습니다: ${missing.join(
          ", "
        )}\n\n온보딩을 처음부터 다시 진행해주세요.`
      );
      return;
    }

    // id는 제외하고 생성 요청 (첫 생성이므로)
    const userPayload: any = {
      name: store.name!,
      gender: store.gender!,
      birthYear: store.birthYear!,
      kakaoId: trimmedKakaoId,
      smoker: store.smoker ?? false,
      snoring: store.snoring ?? false,
      bugKiller: store.bugKiller ?? false,
      sleepTime: store.sleepTime!,
      wakeTime: store.wakeTime!,
      cleaningCycle: store.cleaningCycle!,
      drinkingStyle: store.drinkingStyle!,
    };

    // 선택적 필드: 빈 문자열이 아닐 때만 포함
    if (store.mbti && store.mbti.trim()) {
      userPayload.mbti = store.mbti;
    }
    if (store.absentDays && store.absentDays.length > 0) {
      userPayload.absentDays = store.absentDays;
    }
    if (store.hobby && store.hobby.trim()) {
      userPayload.hobby = store.hobby;
    }
    if (store.selfDescription && store.selfDescription.trim()) {
      userPayload.selfDescription = store.selfDescription;
    }
    if (store.roommateDescription && store.roommateDescription.trim()) {
      userPayload.roommateDescription = store.roommateDescription;
    }

    try {
      console.log("=== 최종 UserPayload 전송 ===");
      console.log(JSON.stringify(userPayload, null, 2));

      const res = await apiService.postUser(userPayload);
      console.log("postUser 응답:", res);

      const newId = res?.id ?? res?.userId ?? res?.data?.id ?? null;
      if (!newId) {
        alert("생성된 사용자 ID를 찾을 수 없습니다. 서버 응답을 확인해주세요.");
        return;
      }
      setCreatedUserId(newId);
    } catch (err: any) {
      console.error("postUser 실패:", err);
      
      // 서버 에러 응답 상세 로깅
      if (err.response) {
        console.error("응답 상태:", err.response.status);
        console.error("응답 데이터:", JSON.stringify(err.response.data, null, 2));
        console.error("요청 본문:", JSON.stringify(userPayload, null, 2));
        
        const errorMessage = err.response.data?.message || err.response.data?.error || "서버 오류가 발생했습니다.";
        alert(`사용자 생성 실패 (${err.response.status}):\n${errorMessage}\n\n콘솔을 확인해주세요.`);
      } else if (err.request) {
        console.error("요청은 전송되었으나 응답을 받지 못했습니다.");
        alert("네트워크 오류가 발생했습니다. 연결을 확인해주세요.");
      } else {
        console.error("요청 설정 오류:", err.message);
        alert(`요청 오류: ${err.message}`);
      }
      return;
    }

    router.push("/onboarding/completeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={1} />

      <Text style={onboardingStyles.title}>카카오톡 아이디를 입력해주세요</Text>

      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#C2C4C8",
            borderRadius: 8,
            padding: 15,
            fontSize: 16,
            color: "#000",
            width: "100%",
          }}
          placeholder="카카오톡 아이디"
          placeholderTextColor="#B3B3B3"
          value={kakaoId}
          onChangeText={setKakaoId}
          autoCapitalize="none"
        />
      </View>

      <View style={onboardingStyles.footer}>
        <Pressable
          style={[
            onboardingStyles.nextButton,
            !kakaoId.trim() && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!kakaoId.trim()}
          onPress={handleComplete}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              !kakaoId.trim() && onboardingStyles.nextLabelDisabled,
            ]}>
            완료
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
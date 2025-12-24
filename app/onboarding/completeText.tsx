import { OnboardingHeader } from "@/components/OnboardingHeader";
import { apiService } from "@/service/macthing/macthingService";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompleteTextScreen() {
  const scale = useSharedValue(0.8);
  const pulseScale = useSharedValue(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onboardingData = useOnboardingStore();

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    pulseScale.value = withRepeat(withTiming(1.1, { duration: 1000 }), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleComplete = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      console.log("=== 온보딩 데이터 확인 ===");
      console.log("저장된 온보딩 데이터:", JSON.stringify(onboardingData, null, 2));

      // 필수 필드 검증
      const requiredFields = {
        name: onboardingData.name,
        gender: onboardingData.gender,
        birthYear: onboardingData.birthYear,
        kakaoId: onboardingData.kakaoId,
        mbti: onboardingData.mbti,
        sleepTime: onboardingData.sleepTime,
        wakeTime: onboardingData.wakeTime,
        cleaningCycle: onboardingData.cleaningCycle,
        drinkingStyle: onboardingData.drinkingStyle,
      };

      Object.entries(requiredFields).forEach(([key, value]) => {
        console.log(`${key}:`, value, `(타입: ${typeof value})`);
      });

      const missingFields = Object.entries(requiredFields)
        .filter(([, value]) => value === null || value === undefined || value === "")
        .map(([key]) => key);

      if (missingFields.length > 0) {
        alert(
          `다음 필드가 누락되었습니다: ${missingFields.join(
            ", "
          )}\n\n온보딩을 다시 진행해주세요.`
        );
        setIsSubmitting(false);
        return;
      }

      const userId = onboardingData.createdUserId ?? 0;
      if (!userId) {
        alert("사용자 ID를 찾을 수 없습니다. 카카오 ID 입력부터 다시 진행해주세요.");
        setIsSubmitting(false);
        return;
      }

      // 사용자 프로필 업데이트(업서트): id 포함 전체 정보 전송
      await apiService.postUser({
        id: userId,
        name: onboardingData.name!,
        gender: onboardingData.gender!,
        birthYear: onboardingData.birthYear!,
        kakaoId: onboardingData.kakaoId!,
        mbti: onboardingData.mbti || "",
        smoker: onboardingData.smoker ?? false,
        snoring: onboardingData.snoring ?? false,
        bugKiller: onboardingData.bugKiller ?? false,
        sleepTime: onboardingData.sleepTime!,
        wakeTime: onboardingData.wakeTime!,
        cleaningCycle: onboardingData.cleaningCycle!,
        drinkingStyle: onboardingData.drinkingStyle!,
        absentDays: onboardingData.absentDays || [],
        hobby: onboardingData.hobby || "",
        selfDescription: onboardingData.selfDescription || "",
        roommateDescription: onboardingData.roommateDescription || "",
      });

      // 매칭 API 요청: preferences를 body로, userId를 query parameter로
      const requestBody = {
        preferNonSmoker: onboardingData.preferNonSmoker ?? false,
        preferGoodAtBugs: onboardingData.preferGoodAtBugs ?? false,
        preferQuietSleeper: onboardingData.preferQuietSleeper ?? false,
      };

      console.log("=== 매칭 API 요청 전송 ===");
      console.log("보내는 userId:", userId);
      console.log("보내는 body:", JSON.stringify(requestBody, null, 2));

      const response = await apiService.postMatching(requestBody, userId);

      console.log("=== 매칭 API 응답 수신 ===");
      console.log("응답:", response);

      router.replace("/(tabs)");
    } catch (error) {
      console.error("=== 매칭 요청 실패 ===");
      console.error("에러 객체:", error);
      const anyErr = error as any;
      if (anyErr?.response) {
        console.error("응답 상태:", anyErr.response.status);
        console.error("응답 데이터:", JSON.stringify(anyErr.response.data, null, 2));
      } else if (anyErr?.request) {
        console.error("요청은 갔으나 응답을 받지 못했습니다.");
      }
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`매칭 요청 실패:\n${errorMessage}\n\n콘솔을 확인해주세요.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={1} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={{ alignItems: "center", marginBottom: 40 }}>
          <Animated.View style={pulseStyle}>
            <Animated.Text style={[emojiStyle, { fontSize: 100 }]}>🎉</Animated.Text>
          </Animated.View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <Text
            variant="headlineLarge"
            style={{
              textAlign: "center",
              marginBottom: 30,
              fontWeight: "bold",
              color: "#1a1a1a",
            }}>
            입력이 완료됐어요 🎉
          </Text>

          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              lineHeight: 28,
              color: "#666",
              marginBottom: 20,
            }}>
            이제 AI가
          </Text>

          <View
            style={{
              backgroundColor: "#F0F8FF",
              borderRadius: 16,
              padding: 20,
              marginVertical: 20,
              borderWidth: 2,
              borderColor: "#007AFF",
            }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                lineHeight: 28,
                fontWeight: "bold",
                color: "#007AFF",
              }}>
              생활 패턴과 성향을 분석해서{"\n"}잘 맞는 룸메이트를 추천해 드릴게요.
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              lineHeight: 28,
              color: "#666",
            }}>
            조금만 기다려 주세요 🙂
          </Text>
        </Animated.View>
      </View>

      {/* 통합된 다음 버튼 디자인 */}
      <View style={onboardingStyles.footer}>
        <Pressable
          style={[
            onboardingStyles.nextButton,
            isSubmitting && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={isSubmitting}
          onPress={handleComplete}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              isSubmitting && onboardingStyles.nextLabelDisabled,
            ]}>
            {isSubmitting ? "전송 중..." : "시작하기"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
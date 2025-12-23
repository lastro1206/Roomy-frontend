import { matchingService } from "@/service/matchingService";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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
    pulseScale.value = withRepeat(
      withTiming(1.1, { duration: 1000 }),
      -1,
      true
    );
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
      console.log(
        "저장된 온보딩 데이터:",
        JSON.stringify(onboardingData, null, 2)
      );

      // 필수 필드 검증 (더 상세한 로깅)
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

      console.log("=== 필수 필드 값 확인 ===");
      Object.entries(requiredFields).forEach(([key, value]) => {
        console.log(`${key}:`, value, `(타입: ${typeof value})`);
      });

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => {
          // null, undefined, 빈 문자열 체크
          const isEmpty = value === null || value === undefined || value === "";
          if (isEmpty) {
            console.warn(`필수 필드 ${key}가 비어있습니다:`, value);
          }
          return isEmpty;
        })
        .map(([key]) => key);

      if (missingFields.length > 0) {
        console.error("필수 필드 누락:", missingFields);
        console.error("누락된 필드 상세 정보:");
        missingFields.forEach((field) => {
          console.error(
            `  ${field}:`,
            requiredFields[field as keyof typeof requiredFields]
          );
        });
        alert(
          `다음 필드가 누락되었습니다: ${missingFields.join(
            ", "
          )}\n\n온보딩을 다시 진행해주세요.`
        );
        setIsSubmitting(false);
        return;
      }

      // 온보딩 데이터를 백엔드 형식에 맞게 변환
      const myProfile = {
        id: 0, // TODO: 실제 사용자 ID로 교체
        gender: onboardingData.gender!,
        name: onboardingData.name!,
        birthYear: onboardingData.birthYear!,
        kakaoId: onboardingData.kakaoId!,
        mbti: onboardingData.mbti!,
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
        selfIntroductionEmbedding: [], // TODO: 실제 임베딩 값으로 교체
        roommateCriteriaEmbedding: [], // TODO: 실제 임베딩 값으로 교체
      };

      const preferences = {
        targetGender: "", // TODO: 사용자 선호도 설정
        targetAgeRange: [null, null] as [number | null, number | null],
        preferNonSmoker: false,
        preferGoodAtBugs: false,
        preferQuietSleeper: false,
        preferNonDrinker: false,
      };

      const requestBody = {
        myProfile,
        preferences,
        candidates: [], // TODO: 후보자 목록 가져오기
      };

      console.log("=== API 요청 전송 ===");
      const response = await matchingService.postMatching(requestBody);
      console.log("=== API 응답 수신 ===");
      console.log("응답:", response);

      router.replace("/(tabs)");
    } catch (error) {
      console.error("=== 매칭 요청 실패 ===");
      console.error("에러 객체:", error);

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={{ alignItems: "center", marginBottom: 40 }}>
          <Animated.View style={pulseStyle}>
            <Animated.Text style={[emojiStyle, { fontSize: 100 }]}>
              🎉
            </Animated.Text>
          </Animated.View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <Text
            variant='headlineLarge'
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
              생활 패턴과 성향을 분석해서{"\n"}잘 맞는 룸메이트를 추천해
              드릴게요.
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

        <Animated.View
          entering={FadeInUp.delay(800).duration(600)}
          style={{ marginTop: 50, width: "100%", paddingHorizontal: 20 }}>
          <Button
            mode='contained'
            onPress={handleComplete}
            style={{
              paddingVertical: 12,
              borderRadius: 12,
              backgroundColor: "#007AFF",
            }}
            labelStyle={{ fontSize: 18, fontWeight: "bold" }}
            disabled={isSubmitting}
            loading={isSubmitting}>
            {isSubmitting ? "전송 중..." : "시작하기"}
          </Button>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

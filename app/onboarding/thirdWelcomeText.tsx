import { OnboardingHeader } from "@/components/OnboardingHeader";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThirdWelcomeTextScreen() {
  const scale = useSharedValue(0.95);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleNext = () => {
    router.push("/onboarding/bugCatching");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.7} />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 40,
        }}>
        {/* 제목 */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: "#111",
            marginBottom: 16,
          }}>
          여기까지 잘 오셨어요
        </Text>

        {/* 서브텍스트 */}
        <Text
          style={{
            fontSize: 16,
            color: "#7A7A7A",
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 40,
          }}>
          이제부터는 성향에 대한 질문이에요{"\n"}매칭 정확도가 더 높아져요!
        </Text>

        {/* 이미지 자리 – 회색 박스로 대체 */}
        <Animated.View style={[cardStyle, onboardingStyles.placeholderBox]}>
          <Image
            source={require("@/assets/images/welcome3.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </Animated.View>
      </View>

      {/* 통합된 다음 버튼 */}
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

import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FourthWelcomeTextScreen() {
  const scale = useSharedValue(0.8);
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleNext = () => {
    router.push("/onboarding/introductionText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <Text
            variant="headlineMedium"
            style={{
              ...onboardingStyles.title,
              textAlign: "center",
              top: '0%'
            }}>
            거의 다 왔어요
          </Text>

          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              lineHeight: 28,
              color: "#666",
            }}>
            마지막으로 간단한 자기소개와{"\n"}
            룸메에게 바라는 점을 입력해주세요
          </Text>
          <Animated.View style={[cardStyle, onboardingStyles.placeholderBox]}>
          <Image
            source={require("@/assets/images/welcome4.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              backgroundColor: "#ffffff",
            }}
          />
          </Animated.View>
        </Animated.View>
      </View>

      {/* 하단 공통 다음 버튼 디자인 */}
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
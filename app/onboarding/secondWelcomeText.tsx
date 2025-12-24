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

export default function SecondWelcomeTextScreen() {
  const scale = useSharedValue(0.95);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleNext = () => {
    router.push("/onboarding/smoking");
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
              top: "0%",
            }}>
            좋아요
          </Text>

          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              lineHeight: 28,
              color: "#666",
            }}>
            이제부터는{" "}생활 스타일을{"\n"}알려주시면 돼요.
          </Text>

          {/* 이미지가 들어갈 자리 */}
          <Animated.View style={[cardStyle, onboardingStyles.placeholderBox]}>
            <Image
              source={require("@/assets/images/welcome2.png")}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                resizeMode: "contain",
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
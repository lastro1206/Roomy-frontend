import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SecondWelcomeTextScreen() {
  const scale = useSharedValue(0.8);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleNext = () => {
    router.push("/onboarding/smoking");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={{ alignItems: "center", marginBottom: 40 }}>
          <Animated.Text style={[emojiStyle, { fontSize: 80 }]}>
            👍
          </Animated.Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <Text
            variant='headlineMedium'
            style={{
              textAlign: "center",
              marginBottom: 20,
              fontWeight: "bold",
              color: "#1a1a1a",
            }}>
            좋아요 👍
          </Text>

          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              lineHeight: 28,
              color: "#666",
            }}>
            이제부터는{" "}
            <Text style={{ fontWeight: "bold", color: "#007AFF" }}>
              생활 스타일
            </Text>
            을 알려주시면 돼요.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(800).duration(600)}
          style={{ marginTop: 50, width: "100%", paddingHorizontal: 20 }}>
          <Button
            mode='contained'
            onPress={handleNext}
            style={{
              paddingVertical: 8,
              borderRadius: 12,
              backgroundColor: "#007AFF",
            }}
            labelStyle={{ fontSize: 16, fontWeight: "bold" }}>
            다음
          </Button>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

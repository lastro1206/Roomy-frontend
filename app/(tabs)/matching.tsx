import { apiService } from "@/service/macthing/macthingService";
import { useOnboardingStore } from "@/store/onboardingStore";
import { matchingStyles } from "@/styles/matchingStyles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Switch, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MatchingScreen() {
  const {
    preferGoodAtBugs,
    preferQuietSleeper,
    preferNonSmoker,
    setPreferGoodAtBugs,
    setPreferQuietSleeper,
    setPreferNonSmoker,
    createdUserId,
  } = useOnboardingStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!createdUserId) {
      Alert.alert("오류", "사용자 ID를 찾을 수 없습니다. 온보딩을 먼저 완료해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      const preferences = {
        preferGoodAtBugs,
        preferQuietSleeper,
        preferNonSmoker,
      };

      console.log("=== 매칭 API 요청 ===");
      console.log("userId:", createdUserId);
      console.log("preferences:", preferences);

      const response = await apiService.postMatching(preferences, createdUserId);

      console.log("=== 매칭 API 응답 ===");
      console.log("response:", response);

      // 매칭 결과 페이지로 이동
      const results = response?.data || [];
      router.push({
        pathname: "/matchingResult",
        params: { results: JSON.stringify(results) },
      });
    } catch (error: any) {
      console.error("=== 매칭 요청 실패 ===");
      console.error("에러:", error);
      
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error?.response) {
        errorMessage = error.response.data?.message || `서버 오류 (${error.response.status})`;
      } else if (error?.request) {
        errorMessage = "네트워크 오류가 발생했습니다.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      Alert.alert("오류", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={matchingStyles.container}>
      {/* Header with Close Button */}
      <View style={matchingStyles.header}>
        <View style={{ width: 40 }} />
        <Pressable
          style={matchingStyles.closeButton}
          onPress={() => router.back()}>
          <Ionicons name="close-outline" size={24} color="#666" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={matchingStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={matchingStyles.illustrationContainer}>
          <View style={matchingStyles.illustrationBox}>
            <Image
              source={require("@/assets/images/matching1.png")}
              style={matchingStyles.illustrationImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={matchingStyles.textContainer}>
          <Text style={matchingStyles.mainText}>매칭 전에,</Text>
          <Text style={matchingStyles.subText}>원하는 조건을 선택해주세요</Text>
        </Animated.View>

        {/* Preference Options */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(600)}
          style={matchingStyles.preferencesContainer}>
          {/* 벌레를 잘 잡으면 좋겠어요 */}
          <View style={matchingStyles.preferenceItem}>
            <Text style={matchingStyles.preferenceText}>벌레를 잘 잡으면 좋겠어요</Text>
            <Switch
              value={preferGoodAtBugs}
              onValueChange={setPreferGoodAtBugs}
              trackColor={{ false: "#E5E5E5", true: "#5A81FA" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5E5"
            />
          </View>

          <View style={matchingStyles.divider} />

          {/* 코를 안 골면 좋겠어요 */}
          <View style={matchingStyles.preferenceItem}>
            <Text style={matchingStyles.preferenceText}>코를 안 골면 좋겠어요</Text>
            <Switch
              value={preferQuietSleeper}
              onValueChange={setPreferQuietSleeper}
              trackColor={{ false: "#E5E5E5", true: "#5A81FA" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5E5"
            />
          </View>

          <View style={matchingStyles.divider} />

          {/* 담배를 안피면 좋겠어요 */}
          <View style={matchingStyles.preferenceItem}>
            <Text style={matchingStyles.preferenceText}>담배를 안피면 좋겠어요</Text>
            <Switch
              value={preferNonSmoker}
              onValueChange={setPreferNonSmoker}
              trackColor={{ false: "#E5E5E5", true: "#5A81FA" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5E5"
            />
          </View>
        </Animated.View>

        
      </ScrollView>

      {/* Submit Button */}
      <View style={matchingStyles.footer}>
        <Pressable
          style={[
            matchingStyles.submitButton,
            isSubmitting && matchingStyles.submitButtonDisabled,
          ]}
          disabled={isSubmitting}
          onPress={handleSubmit}>
          <Text
            style={[
              matchingStyles.submitButtonText,
              isSubmitting && matchingStyles.submitButtonTextDisabled,
            ]}>
            {isSubmitting ? "매칭 중..." : "진행하기"}
          </Text>
        </Pressable>
        {/* Warning Text */}
        <Animated.View entering={FadeInUp.delay(800).duration(600)} style={matchingStyles.warningContainer}>
          <Feather name="info" size={18} color="#70737C" />
          <Text style={matchingStyles.warningText}>
            과도한 조건 선택은 매칭 품질이 낮아질 수 있어요!
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

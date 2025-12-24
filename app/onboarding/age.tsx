import { OnboardingHeader } from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WheelPickerExpo from "react-native-wheel-picker-expo";

export default function AgeScreen() {
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 40 }, (_, i) => currentYear - i),
    [currentYear]
  );
  const { setBirthYear } = useOnboardingStore();

  // 초기값 2000년
  const defaultIndex = years.indexOf(2000);
  const [selectedIndex, setSelectedIndex] = useState(
    defaultIndex !== -1 ? defaultIndex : 0
  );
  const [selectedYear, setSelectedYear] = useState(years[selectedIndex]);

  useEffect(() => {
    const year = years[selectedIndex];
    setSelectedYear(year);
    setBirthYear(year);
  }, [selectedIndex, years, setBirthYear]);

  const handleNext = () => {
    if (!selectedYear) return;
    router.push("/onboarding/secondWelcomeText");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.2} />
  
      {/* 제목은 상단 고정 */}
      <Text style={onboardingStyles.title}>출생년도를 선택해주세요</Text>
  
      {/* 제목 아래 남은 공간 전체에서 휠을 정중앙에 배치 */}
      <View style={{ flex: 1 }}>
        {/* 가로 폭은 화면 전체 사용 */}
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
        <WheelPickerExpo
          height={320} // 휠 전체의 높이
          width={200}  // 휠의 너비 (기호에 따라 조정)
          initialSelectedIndex={defaultIndex !== -1 ? defaultIndex : 0}
          items={years.map((year) => ({
            label: String(year) + "년",
            value: year,
          }))}
          onChange={(result: { index: number }) => {
            if (result) {
              setSelectedIndex(result.index);
            }
          }}
          
          />
        </View>
      </View>
  
      {/* 하단 공통 다음 버튼 */}
      <View style={onboardingStyles.footer}>
        <Pressable style={onboardingStyles.nextButton} onPress={handleNext}>
          <Text style={onboardingStyles.nextLabel}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
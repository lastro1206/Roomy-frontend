import { OnboardingHeader } from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboardingStore";
import { onboardingStyles } from "@/styles/onboarding";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NICKNAMES = ["빛나는 물개", "부지런한 너구리", "다정한 공작", "활기찬 미어캣", "든든한 곰"];

export default function NickNameScreen() {
  const { name, setName } = useOnboardingStore();
  const [localName, setLocalName] = useState(name || NICKNAMES[0]);

  const randomName = useMemo(
    () => () => {
      const pick = NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)];
      setLocalName(pick);
      setName(pick);
    },
    [setName]
  );

  const handleNext = () => {
    if (!localName) return;
    setName(localName);
    router.push("/onboarding/gender");
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <OnboardingHeader progress={0.05} />

      <View style={styles.content}>
        <View style={styles.card}>
          {/* 물개 이미지가 들어갈 자리 */}
          <Image
            source={require("@/assets/images/nickName.png")}
            style={styles.sealImage}
            resizeMode="contain"
          />
          
          {/* 닉네임이 들어갈 작은 박스 */}
          <View style={styles.nameBox}>
            <Text style={styles.name}>{localName}</Text>
          </View>
        </View>

        <Text style={styles.title}>뭐라고 부르면 될까요?</Text>
        <Text style={styles.subtitle}>랜덤 닉네임을{"\n"}생성해드릴게요</Text>
      </View>

      <View style={onboardingStyles.footer}>
        {/* 랜덤 닉네임 버튼 - 온보딩 버튼 스타일 사용 */}
        <Pressable style={styles.subButton} onPress={randomName}>
          <Text style={styles.subButtonText}>다른 닉네임 생성</Text>
        </Pressable>

        {/* 공통 다음 버튼 디자인 사용 */}
        <Pressable
          style={[
            onboardingStyles.nextButton,
            !localName && onboardingStyles.nextButtonDisabled,
          ]}
          disabled={!localName}
          onPress={handleNext}>
          <Text
            style={[
              onboardingStyles.nextLabel,
              !localName && onboardingStyles.nextLabelDisabled,
            ]}>
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 28,
    paddingHorizontal: 20,
  },
  card: {
    width: 260,
    height: 280,
    borderRadius: 20,
    backgroundColor: "#CDDEFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    paddingVertical: 12,
  },
  sealImage: {
    width: 180,
    height: 180,
    marginBottom: 12,
  },
  nameBox: {
    backgroundColor: "#CDDEFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5A81FA",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000",
    marginTop: 42,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#7A7A7A",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 4,
  },
  // 랜덤 닉네임 버튼 - 온보딩 버튼과 유사한 스타일
  subButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5F6672",
  },
  subButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
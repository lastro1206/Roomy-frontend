import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { OnboardingProgress } from "./OnboardingProgress";

interface OnboardingHeaderProps {
  progress: number; // 0~1
  showBack?: boolean;
}

export function OnboardingHeader({ progress, showBack = true }: OnboardingHeaderProps) {
  return (
    <View style={styles.headerRow}>
      {showBack ? (
        <Ionicons
          name='chevron-back-outline'
          size={26}
          color='#000'
          onPress={() => router.back()}
        />
      ) : (
        <View style={{ width: 26 }} />
      )}
      <View style={styles.progressWrap}>
        <OnboardingProgress progress={progress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  progressWrap: {
    flex: 1,
  },
});


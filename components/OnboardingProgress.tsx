import { StyleSheet, View } from "react-native";

interface OnboardingProgressProps {
  /** 0 ~ 1 사이 값 */
  progress?: number;
}

export function OnboardingProgress({ progress = 0.1 }: OnboardingProgressProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E5E5",
    marginVertical: 0,
    marginHorizontal: 0,
  },
  fill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#2C3D8F",
  },
});


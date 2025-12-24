import { StyleSheet } from "react-native";

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
  },

  // 상단 제목
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000",
    marginTop: 42,
    marginBottom: 42,
  },

  // 옵션 버튼들 묶음
  buttonContainer: {
    gap: 20,
  },

  // 옵션 버튼 (성별, 흡연, 수면시간 등 공통)
  optionButton: {
    height: 64,
    borderRadius: 10,
    backgroundColor: "#CDDEFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "transparent",
  },
  optionButtonSelected: {
    backgroundColor: "#5A81FA",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5A81FA",
  },
  optionTextSelected: {
    backgroundColor: "#5A81FA",
    color: "#fff",
  },

  // 하단 공통 다음 버튼
  footer: {
    marginTop: "auto",
  },
  nextButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#2C3D8F",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#E1E2E4",
  },
  nextLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  nextLabelDisabled: {
    color: "#B3B3B3",
  },
  placeholderBox: {
    width: "80%",          // 화면 너비의 80%
    aspectRatio: 1,        // 정사각형
    borderRadius: 24,
    backgroundColor: "#F4F4F5",
    alignSelf: "center",
    marginTop: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C2C4C8",
    color: "#B3B3B3",
    width: "100%",
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  }
});
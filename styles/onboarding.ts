// styles/onboarding.tsx
import { StyleSheet } from "react-native";

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginBottom: 40,
    textAlign: "center",
    color: "#000",
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 8,
  },
  nextButton: {
    marginTop: 20,
  },
  scrollContainer: {
    height: 300,
    marginVertical: 20,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  yearItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  yearText: {
    fontSize: 18,
  },
  selectedYearText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  selectedIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    marginTop: -25,
    height: 50,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 8,
    pointerEvents: "none",
  },
  wheelContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
    height: 300,
    backgroundColor: "#FFFFFF",
  },
  wheelPickerContainer: {
    width: "100%",
  },
  wheelItem: {
    color: "#666",
    fontSize: 18,
  },
  wheelSelectedItem: {
    color: "#007AFF",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 8,
  },
  selectedText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
});

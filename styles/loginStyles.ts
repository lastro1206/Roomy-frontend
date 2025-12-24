import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  topSpacer: {
    flex: 1.2,
  },
  logoContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  content: {
    flex: 2,
    width: "100%",
    paddingTop: 20,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 13,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#000",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#5A81FA",
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
  bottomSpacer: {
    flex: 0.5,
  },
});

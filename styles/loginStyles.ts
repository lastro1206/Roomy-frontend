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
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  bottomSpacer: {
    flex: 0.5,
  },
});

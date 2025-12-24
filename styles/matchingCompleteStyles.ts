import { StyleSheet } from "react-native";

export const matchingCompleteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5FA",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
  },
  charactersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginBottom: 48,
  },
  characterBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  character: {
    width: 120,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },

  characterImage: {
    width: 290,
    height: 290,
    borderRadius: 50,
    marginTop: 100,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
  },
  mainButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#5A81FA",
    alignItems: "center",
    justifyContent: "center",
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});


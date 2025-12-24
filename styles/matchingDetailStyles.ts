import { StyleSheet } from "react-native";

export const matchingDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginRight: 12,
  },
  mbtiTag: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mbtiText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    minWidth: 120,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    lineHeight: 24,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  requestButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#5A81FA",
    alignItems: "center",
    justifyContent: "center",
  },
  requestButtonDisabled: {
    backgroundColor: "#E1E2E4",
  },
  requestButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  requestButtonTextDisabled: {
    color: "#B3B3B3",
  },
});


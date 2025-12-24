import { StyleSheet } from "react-native";

export const matchingResultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#F6F5FA",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F1F1F",
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#F6F5FA",
  },
  subHeaderTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    flex: 1,
  },
  moreLink: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5A81FA",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  topCard: {
    backgroundColor: "#5A81FA",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  topCardHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  topBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  topBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  topCardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  topCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    overflow: "hidden",
  },
  profilePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  topCardInfo: {
    flex: 1,
  },
  topCardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  scoreBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  tagContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  filterButtonSelected: {
    backgroundColor: "#5A81FA",
    borderColor: "#5A81FA",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  filterTextSelected: {
    color: "#FFFFFF",
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  listItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listNameScoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  listScoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5A81FA",
  },
  listTagContainer: {
    backgroundColor: "#CDDEFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  listTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#5A81FA",
  },
});


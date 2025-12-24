import { StyleSheet } from "react-native";

export const matchingListStyles = StyleSheet.create({
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
    paddingBottom: 16,
    backgroundColor: "#F6F5FA",
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
    paddingBottom: 32,
  },
  matchCard: {
    backgroundColor: "#CDDEFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  percentBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5A81FA",
  },
  styleTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  criteriaTag: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  criteriaText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#5A81FA",
  },
});


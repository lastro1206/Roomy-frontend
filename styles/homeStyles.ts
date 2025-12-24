import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5FA",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingBlock: {
    marginTop: 16,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: "#9B9B9B",
    paddingTop: 10,
  },
  mainHeadline: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    lineHeight: 34,
    marginBottom: 4,
  },
  noticeCard: {
    height: 170,
    borderRadius: 18,
    overflow: "hidden",
    alignSelf: "center",
  },
  noticeGradient: {
    flex: 1,
  },
  noticeFooter: {
    position: "absolute",
    right: 12,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  noticePagerText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },
  dotsRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D2D6DC",
  },
  dotActive: {
    backgroundColor: "#6B7280",
  },
  quickRow: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 4
  },
  quickItem: {
    alignItems: "center",
    gap: 10,
  },
  quickIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#F1F3F6",
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
  cardRow: {
    marginTop: 28,
    flexDirection: "row",
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    height: 140,
    padding: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "100%",
  },
  cardLeftContent: {
    flex: 1,
  },
  ddayImageContainer: {
    height: 56,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingRight: 52,
    marginBottom: 16,
  },
  ddayImage: {
    width: "100%",
    height: 22,
  },
  cardTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#161616",
  },
  menuIconBox: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
    paddingRight: 22,
  },
  menuImage: {
    width: 44,
    height: 36.54,
    marginBottom: -6
  },
  badge: {
    backgroundColor: "#CDDEFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#5A81FA",
    fontWeight: "600",
  },
  cardArrowTop: {
    alignSelf: "flex-start",
  },
});

import { StyleSheet } from "react-native";

export const repairReportStyles = StyleSheet.create({
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
  closeButton: {
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
  imageSection: {
    marginBottom: 32,
  },
  imageUploadButton: {
    width: 100,
    height: 100,
    backgroundColor: "#CDDEFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  imageCountText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5A81FA",
    marginTop: 8,
  },
  imageList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  imageItem: {
    position: "relative",
    width: 100,
    height: 100,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginBottom: 12,
  },
  severityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#000",
    minHeight: 56,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  severityButtons: {
    flexDirection: "row",
    gap: 12,
  },
  severityButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  severityButtonSelected: {
    backgroundColor: "#5A81FA",
  },
  severityButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  severityButtonTextSelected: {
    color: "#FFFFFF",
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
  submitButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#5A81FA",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#E1E2E4",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  submitButtonTextDisabled: {
    color: "#B3B3B3",
  },
});



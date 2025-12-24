import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReplaceMealScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="#000"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>대체식</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>12월 24일 대체식</Text>
          <Text style={styles.mealName}>케이준 샐러드, 미트볼 파스타</Text>
          <View style={styles.exchangeBox}>
            <Text style={styles.exchangeText}>*식권 한장으로 교환 가능</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>현재 남은 수량</Text>
          <Text style={styles.quantityText}>16/40 개</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.eventTitle}>기간 한정 특별 이벤트!</Text>
          <View style={styles.eventCard}>
            <Text style={styles.eventCardTitle}>12월 기숙사 식권 안내</Text>
            <Text style={styles.eventCardSubtitle}>행복 기숙사·구내식당</Text>
            <Text style={styles.eventCardDate}>12월 1일 (월)</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#F5F5F5",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
  },
  mealName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5A81FA",
    marginBottom: 12,
  },
  exchangeBox: {
    borderWidth: 1,
    borderColor: "#5A81FA",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F0F4FF",
  },
  exchangeText: {
    fontSize: 14,
    color: "#5A81FA",
    fontWeight: "500",
  },
  quantityText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5A81FA",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  eventCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  eventCardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 4,
  },
  eventCardDate: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
});
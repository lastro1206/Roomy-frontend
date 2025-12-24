import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const menuItems = [
  "숙주나물",
  "쌀밥",
  "소고기 배추국",
  "깍두기",
  "순대볶음",
  "무말랭이무침",
];

export default function MenuScreen() {
  const [selectedItem, setSelectedItem] = useState<string>("숙주나물");

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
        <Text style={styles.headerTitle}>오늘의 메뉴</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.dateText}>12월 24일 석식</Text>

        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.menuCard,
                selectedItem === item && styles.menuCardSelected,
              ]}
              onPress={() => setSelectedItem(item)}>
              <Text style={styles.menuItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#F5F5F7",
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
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5A81FA",
    marginBottom: 20,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 12,
  },
  menuCardSelected: {
    borderColor: "#5A81FA",
    borderWidth: 2,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
});
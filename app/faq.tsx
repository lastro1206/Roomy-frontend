import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "출입통제 관련",
    items: [
      {
        question: "기숙사 출입통제 시간은 언제인가요?",
        answer: "기숙사 출입통제 시간은 매일 01:00~05:00입니다.",
      },
      {
        question: "시험기간에는 출입통제 시간이 달라지나요?",
        answer: "네. 시험기간(약 2주)에는 출입통제 시간이 02:00 ~ 05:00로 조정됩니다.",
      },
    ],
  },
  {
    title: "정기점검 및 생활점검",
    items: [
      {
        question: "기숙사 정기점검은 언제 진행되나요?",
        answer: "정기점검은 매월 넷째 주 목요일 오후 6시부터 실시되며, 모든 기숙사생은 필참해야 합니다.",
      },
      {
        question: "정기점검 일정은 언제 공지되나요?",
        answer: "점검일 약 1주일 전에 사전 공지됩니다.",
      },
      {
        question: "상시점검은 무엇인가요?",
        answer: "정기점검 이후, 불량 사항이 확인된 기숙사실을 대상으로 사전 공지 없이 추가 점검이 진행될 수 있습니다.",
      },
    ],
  },
  {
    title: "기숙사 반입 금지 물품",
    items: [],
  },
  {
    title: "기숙사 반입 금지 음식물",
    items: [],
  },
  {
    title: "기숙사 내 금지행위",
    items: [],
  },
  {
    title: "외박 신청",
    items: [],
  },
];

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>자주 묻는 질문</Text>

        <View style={styles.faqList}>
          {faqCategories.map((category, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <View key={index} style={styles.faqCardContainer}>
                <TouchableOpacity
                  style={[
                    styles.faqCard,
                    isExpanded && styles.faqCardExpanded,
                  ]}
                  onPress={() => handleToggle(index)}>
                  <Text
                    style={[
                      styles.faqTitle,
                      isExpanded && styles.faqTitleExpanded,
                    ]}>
                    {category.title}
                  </Text>
                  <MaterialCommunityIcons
                    name={isExpanded ? "chevron-down" : "chevron-right"}
                    size={24}
                    color={isExpanded ? "#000" : "#666"}
                  />
                </TouchableOpacity>
                
                {isExpanded && category.items.length > 0 && (
                  <View style={styles.faqContent}>
                    {category.items.map((item, itemIndex) => (
                      <View key={itemIndex} style={styles.qaItem}>
                        <Text style={styles.questionText}>Q. {item.question}</Text>
                        <Text style={styles.answerText}>A. {item.answer}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.additionalSection}>
          <Text style={styles.additionalTitle}>추가 안내</Text>
          <Text style={styles.additionalText}>
            기숙사 생활 규칙은 안전과 공동 생활을 위해 운영되며, 위반 시 벌점 또는 불이익이 발생할 수 있습니다. 공지사항 및 FAQ를 수시로 확인해 주세요.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    letterSpacing: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    marginBottom: 20,
  },
  faqList: {
    marginBottom: 32,
  },
  faqCardContainer: {
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
  },
  faqCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    padding: 18,
  },
  faqCardExpanded: {
    backgroundColor: "#FFFFFF",
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    flex: 1,
  },
  faqTitleExpanded: {
    color: "#5A81FA",
  },
  faqContent: {
    padding: 18,
    paddingTop: 12,
  },
  qaItem: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    lineHeight: 22,
  },
  answerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    lineHeight: 20,
  },
  additionalSection: {
    marginTop: 8,
  },
  additionalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginBottom: 12,
  },
  additionalText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    lineHeight: 22,
  },
});


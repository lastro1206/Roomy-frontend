import { useOnboardingStore } from "@/store/onboardingStore";
import { matchingListStyles } from "@/styles/matchingListStyles";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MatchItem {
  userId: number;
  name: string;
  rank: number;
  totalScore: number;
  matchDetails?: any;
}

export default function MatchingListScreen() {
  const params = useLocalSearchParams();
  const [results, setResults] = useState<MatchItem[]>([]);

  useEffect(() => {
    if (params.results) {
      try {
        const parsedResults = JSON.parse(params.results as string);
        setResults(parsedResults);
      } catch (error) {
        console.error("Failed to parse results:", error);
      }
    }
  }, [params.results]);

  // 예시 데이터 (results가 없을 때 사용)
  const mockResults: MatchItem[] = [
    { userId: 11, name: "행복한 두더지", rank: 1, totalScore: 53.6 },
    { userId: 17, name: "슬픈 호랑이", rank: 2, totalScore: 50 },
    { userId: 1, name: "기쁜 참치", rank: 3, totalScore: 47.8 },
    { userId: 4, name: "귀여운 카피바라", rank: 4, totalScore: 43.9 },
  ];

  const displayResults = results.length > 0 ? results : mockResults;

  const getTopPercent = (rank: number, total: number) => {
    const percent = Math.round((rank / total) * 100);
    if (percent <= 1) return "상위 1%";
    if (percent <= 3) return "상위 3%";
    if (percent <= 5) return "상위 5%";
    if (percent <= 8) return "상위 8%";
    if (percent <= 10) return "상위 10%";
    if (percent <= 12) return "상위 12%";
    return `상위 ${percent}%`;
  };

  const getStyleTitle = (rank: number) => {
    const styles = [
      "함께 살기 편한 스타일",
      "생활 패턴이 잘 맞는 스타일",
      "편안하게 지낼 수 있는 스타일",
      "생활 습관이 잘 맞는 스타일",
      "잘 어울리는 스타일",
    ];
    return styles[(rank - 1) % styles.length];
  };

  const getMatchCriteria = (rank: number) => {
    const criteria = [
      "수면 패턴·흡연 여부 일치",
      "청소 주기·코골이 일치",
      "흡연 여부·벌레 대응 방식 일치",
      "MBTI 성향 유사",
      "생활 패턴 일치",
    ];
    return criteria[(rank - 1) % criteria.length];
  };

  const renderMatchCard = (item: MatchItem, index: number) => (
    <TouchableOpacity
      key={item.userId}
      style={matchingListStyles.matchCard}
      onPress={() => {
        router.push({
          pathname: "/matchingDetail",
          params: {
            userId: item.userId.toString(),
            name: item.name,
          },
        });
      }}>
      <View style={matchingListStyles.cardHeader}>
        <View style={matchingListStyles.percentBadge}>
          <Text style={matchingListStyles.percentText}>
            {getTopPercent(item.rank, displayResults.length)}
          </Text>
        </View>
      </View>
      <Text style={matchingListStyles.styleTitle}>{getStyleTitle(item.rank)}</Text>
      <View style={matchingListStyles.cardContent}>
        <View style={matchingListStyles.profileImageContainer}>
          <View style={matchingListStyles.profilePlaceholder}>
            <Ionicons name="person" size={40} color="#999" />
          </View>
        </View>
        <View style={matchingListStyles.cardInfo}>
          <Text style={matchingListStyles.cardName}>{item.name}</Text>
          <View style={matchingListStyles.criteriaTag}>
            <Text style={matchingListStyles.criteriaText}>
              {getMatchCriteria(item.rank)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={matchingListStyles.container}>
      {/* Header */}
      <View style={matchingListStyles.header}>
        <Pressable onPress={() => router.back()} style={matchingListStyles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </Pressable>
        <Text style={matchingListStyles.headerTitle}>매칭</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={matchingListStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {displayResults.map((item, index) => renderMatchCard(item, index))}
      </ScrollView>
    </SafeAreaView>
  );
}


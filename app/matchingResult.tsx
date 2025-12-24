import { useOnboardingStore } from "@/store/onboardingStore";
import { matchingResultStyles } from "@/styles/matchingResultStyles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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

export default function MatchingResultScreen() {
  const { name } = useOnboardingStore();
  const params = useLocalSearchParams();
  const [selectedFilter, setSelectedFilter] = useState("추천");
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
    { userId: 11, name: "홍길동", rank: 1, totalScore: 53.6 },
    { userId: 17, name: "빛나는 물개", rank: 2, totalScore: 50 },
    { userId: 1, name: "이지우", rank: 3, totalScore: 47.8 },
    { userId: 4, name: "후보자3", rank: 4, totalScore: 43.9 },
    { userId: 2, name: "후보자1", rank: 5, totalScore: 40.3 },
  ];

  const topMatch = results.length > 0 ? results[0] : mockResults[0];
  const displayResults = results.length > 0 ? results : mockResults;

  const filters = ["추천", "성별", "아침형", "비흡연"];

  const getTopPercent = (rank: number, total: number) => {
    const percent = Math.round((rank / total) * 100);
    if (percent <= 1) return "상위 1%";
    if (percent <= 5) return "상위 5%";
    if (percent <= 10) return "상위 10%";
    return "";
  };

  const renderTopCard = () => (
    <View style={matchingResultStyles.topCard}>
      <View style={matchingResultStyles.topCardHeader}>
        <View style={matchingResultStyles.topBadge}>
          <Text style={matchingResultStyles.topBadgeText}>
            {getTopPercent(topMatch.rank, displayResults.length) || "상위 추천"}
          </Text>
        </View>
      </View>
      <Text style={matchingResultStyles.topCardTitle}>함께 살기 편한 스타일</Text>
      <View style={matchingResultStyles.topCardContent}>
        <View style={matchingResultStyles.profileImageContainer}>
          {/* 프로필 이미지 placeholder */}
          <View style={matchingResultStyles.profilePlaceholder}>
            <Ionicons name="person" size={30} color="#999" />
          </View>
        </View>
        <View style={matchingResultStyles.topCardInfo}>
          <Text style={matchingResultStyles.topCardName}>{topMatch.name}</Text>
          <View style={matchingResultStyles.tagContainer}>
            <Text style={matchingResultStyles.tagText}>수면 패턴·흡연 여부 일치</Text>
          </View>
          <View style={matchingResultStyles.scoreBadge}>
            <Text style={matchingResultStyles.scoreText}>{topMatch.totalScore.toFixed(1)}점</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderListItem = ({ item }: { item: MatchItem }) => (
    <TouchableOpacity style={matchingResultStyles.listItem}>
      <View style={matchingResultStyles.profileImageContainer}>
        {/* 프로필 이미지 placeholder */}
        <View style={matchingResultStyles.profilePlaceholder}>
          <Ionicons name="person" size={24} color="#999" />
        </View>
      </View>
      <View style={matchingResultStyles.listItemInfo}>
        <View style={matchingResultStyles.listNameScoreRow}>
          <Text style={matchingResultStyles.listItemName}>{item.name}</Text>
          <Text style={matchingResultStyles.listScoreText}>{item.totalScore.toFixed(1)}점</Text>
        </View>
        <View style={matchingResultStyles.listTagContainer}>
          <Text style={matchingResultStyles.listTagText}>수면 패턴·흡연 여부 일치</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={matchingResultStyles.container}>
      {/* Header */}
      <View style={matchingResultStyles.header}>
        <Text style={matchingResultStyles.headerTitle}>매칭</Text>
      </View>

      {/* Sub Header */}
      <View style={matchingResultStyles.subHeader}>
        <Text style={matchingResultStyles.subHeaderTitle}>
          {name || "카피바라"}님과{'\n'}잘 맞는 룸메이트예요
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/matchingList",
              params: { results: JSON.stringify(displayResults) },
            });
          }}>
          <Text style={matchingResultStyles.moreLink}>더보기 &gt;</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={matchingResultStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Top Recommendation Card */}
        {renderTopCard()}

        {/* Filter Buttons */}
        <View style={matchingResultStyles.filterContainer}>
          {filters.map((filter) => (
            <Pressable
              key={filter}
              style={[
                matchingResultStyles.filterButton,
                selectedFilter === filter && matchingResultStyles.filterButtonSelected,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  matchingResultStyles.filterText,
                  selectedFilter === filter && matchingResultStyles.filterTextSelected,
                ]}>
                {filter}
              </Text>
              {(selectedFilter === filter || filter === "비흡연") && (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={16}
                  color={selectedFilter === filter ? "#FFFFFF" : "#999"}
                />
              )}
            </Pressable>
          ))}
        </View>

        {/* Results List */}
        <View style={matchingResultStyles.listContainer}>
          {displayResults.map((item) => (
            <View key={item.userId}>{renderListItem({ item })}</View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


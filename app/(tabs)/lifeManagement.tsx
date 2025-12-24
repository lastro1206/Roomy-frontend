import { RepairReport } from "@/service/macthing/macthingService";
import { useRepairReportStore } from "@/store/repairReportStore";
import { lifeManagementStyles } from "@/styles/lifeManagement";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LifeManagementScreen() {
  const storeReports = useRepairReportStore((state) => state.reports);
  const [sortBy, setSortBy] = useState<"최신순" | "인기순">("최신순");
  const [filter, setFilter] = useState<"전체" | "PENDING" | "COMPLETED">("전체");

  // 필터링된 신고 목록
  const filteredReports = storeReports.filter((report) => {
    if (filter === "전체") return true;
    return report.status === filter;
  });

  const getSeverityTag = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return { text: "긴급", color: "#FFFFFF", bgColor: "#5A81FA" };
      case "HIGH":
        return { text: "긴급", color: "#FFFFFF", bgColor: "#5A81FA" };
      case "MEDIUM":
        return { text: "보통", color: "#5A81FA", bgColor: "#CDDEFF" };
      case "LOW":
        return { text: "여유", color: "#5A81FA", bgColor: "#CDDEFF" };
      default:
        return { text: "보통", color: "#5A81FA", bgColor: "#CDDEFF" };
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}일 전`;
    } else if (diffHours > 0) {
      return `${diffHours}시간 전`;
    } else {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return diffMins > 0 ? `${diffMins}분 전` : "방금 전";
    }
  };

  const getTitle = (report: RepairReport) => {
    if (report.roomNumber) {
      return `${report.roomNumber}`;
    }
    return report.floor || report.item || "시설";
  };

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "최신순") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // 인기순: priorityScore + views (임시로 priorityScore 사용)
      return b.priorityScore - a.priorityScore;
    }
  });

  return (
    <SafeAreaView style={lifeManagementStyles.container}>
      {/* Header */}
      <View style={lifeManagementStyles.header}>
        <Text style={lifeManagementStyles.headerTitle}>생활관리</Text>
      </View>

      <ScrollView
        contentContainerStyle={lifeManagementStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Top Info Cards */}
        <View style={lifeManagementStyles.infoCardsRow}>
          <TouchableOpacity
            style={lifeManagementStyles.infoCard}
            onPress={() => router.push("/faq" as any)}>
            <Text style={lifeManagementStyles.infoCardTitle}>신고 가이드</Text>
            <Text style={lifeManagementStyles.infoCardSubtitle}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={lifeManagementStyles.infoCard}>
            <Text style={lifeManagementStyles.infoCardTitle}>긴급연락처</Text>
            <Text style={lifeManagementStyles.infoCardSubtitle}>행복기숙사</Text>
          </TouchableOpacity>
        </View>

        {/* Sort and Filter */}
        <View style={lifeManagementStyles.filterRow}>
          <Pressable
            style={[
              lifeManagementStyles.filterButton,
              sortBy === "최신순" && lifeManagementStyles.filterButtonSelected,
            ]}
            onPress={() => setSortBy("최신순")}>
            <Text
              style={[
                lifeManagementStyles.filterText,
                sortBy === "최신순" && lifeManagementStyles.filterTextSelected,
              ]}>
              최신순
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={16}
              color={sortBy === "최신순" ? "#FFFFFF" : "#999"}
            />
          </Pressable>
          <Pressable
            style={[
              lifeManagementStyles.filterButton,
              filter === "PENDING" && lifeManagementStyles.filterButtonSelected,
            ]}
            onPress={() => setFilter("PENDING")}>
            <Text
              style={[
                lifeManagementStyles.filterText,
                filter === "PENDING" && lifeManagementStyles.filterTextSelected,
              ]}>
              처리중
            </Text>
          </Pressable>
          <Pressable
            style={[
              lifeManagementStyles.filterButton,
              filter === "COMPLETED" && lifeManagementStyles.filterButtonSelected,
            ]}
            onPress={() => setFilter("COMPLETED")}>
            <Text
              style={[
                lifeManagementStyles.filterText,
                filter === "COMPLETED" && lifeManagementStyles.filterTextSelected,
              ]}>
              완료
            </Text>
          </Pressable>
          <Pressable
            style={[
              lifeManagementStyles.filterButton,
              filter === "전체" && lifeManagementStyles.filterButtonSelected,
            ]}
            onPress={() => setFilter("전체")}>
            <Text
              style={[
                lifeManagementStyles.filterText,
                filter === "전체" && lifeManagementStyles.filterTextSelected,
              ]}>
              전체
            </Text>
          </Pressable>
        </View>

        {/* Reports List */}
        <View style={lifeManagementStyles.reportsList}>
          {sortedReports.length === 0 ? (
            <View style={lifeManagementStyles.emptyContainer}>
              <Text style={lifeManagementStyles.emptyText}>
                신고 내역이 없습니다.
              </Text>
            </View>
          ) : (
              sortedReports.map((report) => {
                const tag = getSeverityTag(report.severity);
                return (
                  <TouchableOpacity
                    key={report.id}
                    style={lifeManagementStyles.reportCard}
                    onPress={() => {
                      router.push({
                        pathname: "/repairDetail",
                        params: { id: report.id.toString() },
                      } as any);
                    }}>
                    <View style={lifeManagementStyles.reportImageContainer}>
                      {report.imagePath ? (
                        <Image
                          source={{ uri: report.imagePath }}
                          style={lifeManagementStyles.reportImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={lifeManagementStyles.reportImagePlaceholder}>
                          <Ionicons name="image-outline" size={24} color="#999" />
                        </View>
                      )}
                    </View>
                    <View style={lifeManagementStyles.reportContent}>
                      <View style={lifeManagementStyles.reportHeader}>
                        <View
                          style={[
                            lifeManagementStyles.severityTag,
                            { backgroundColor: tag.bgColor },
                          ]}>
                          <Text
                            style={[
                              lifeManagementStyles.severityText,
                              { color: tag.color },
                            ]}>
                            {tag.text}
                          </Text>
                        </View>
                      </View>
                      <Text style={lifeManagementStyles.reportTitle}>
                        {getTitle(report)}
                      </Text>
                      <Text style={lifeManagementStyles.reportDescription} numberOfLines={2}>
                        {report.description}
                      </Text>
                      <View style={lifeManagementStyles.reportFooter}>
                        <Text style={lifeManagementStyles.reportMeta}>
                          조회수 {report.priorityScore || 0}·{formatTimeAgo(report.createdAt)}
                        </Text>
                        <View style={lifeManagementStyles.likeContainer}>
                          <Ionicons name="thumbs-up-outline" size={16} color="#999" />
                          <Text style={lifeManagementStyles.likeCount}>
                            {Math.floor((report.priorityScore || 0) / 2)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={lifeManagementStyles.fab}
        onPress={() => router.push("/repairReport" as any)}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={lifeManagementStyles.fabText}>신고하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

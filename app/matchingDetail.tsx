import { matchingDetailStyles } from "@/styles/matchingDetailStyles";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MatchDetailData {
  userId: number;
  name: string;
  gender: string;
  age: number;
  smoker: boolean;
  sleepTime: string;
  wakeTime: string;
  snoring: boolean;
  cleaningCycle: string;
  drinkingFrequency: string;
  bugKiller: boolean;
  hobby: string;
  absentDays: string;
  mbti?: string;
  selfDescription: string;
}

export default function MatchingDetailScreen() {
  const params = useLocalSearchParams();
  const [isRequesting, setIsRequesting] = useState(false);

  // Mock 데이터
  const mockDetail: MatchDetailData = {
    userId: params.userId ? Number(params.userId) : 11,
    name: params.name as string || "행복한 두더지",
    gender: "남",
    age: 24,
    smoker: false,
    sleepTime: "11시",
    wakeTime: "10시",
    snoring: true,
    cleaningCycle: "매일 한다.",
    drinkingFrequency: "주 1회",
    bugKiller: true,
    hobby: "러닝",
    absentDays: "주말",
    mbti: "astro",
    selfDescription:
      "안녕하세요! 저는 평소에는 비교적 규칙적인 생활을 하는 편이고, 청소는 깔끔하게 매일 해두는 걸 좋아해요. 흡연은 하지 않고, 술자리는 주 1회 정도 가볍게 즐깁니다. 코골이가 조금 있는 편이라 이 부분은 미리 양해 구해요 대신 생활 소음이나 배려는 신경 쓰려고 합니다. 운동하는 걸 좋아해서 러닝을 취미로 하고 있고, 벌레도 웬만한 건 혼자서 처리할 수 있어요 주말에는 기숙사에 없는 경우가 많아 비교적 조용한 편일 거예요.",
  };

  const handleMatchingRequest = async () => {
    if (isRequesting) return;
    
    try {
      setIsRequesting(true);
      // TODO: 실제 매칭 요청 API 호출
      console.log("매칭 요청:", mockDetail.userId);
      
      // 매칭 완료 페이지로 이동
      setTimeout(() => {
        setIsRequesting(false);
        router.push("/matchingComplete");
      }, 500);
    } catch (error) {
      console.error("매칭 요청 실패:", error);
      setIsRequesting(false);
    }
  };

  return (
    <SafeAreaView style={matchingDetailStyles.container}>
      {/* Header */}
      <View style={matchingDetailStyles.header}>
        <Pressable onPress={() => router.back()} style={matchingDetailStyles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </Pressable>
        <Text style={matchingDetailStyles.headerTitle}>매칭</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={matchingDetailStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* 정보 섹션 */}
        <View style={matchingDetailStyles.section}>
          <View style={matchingDetailStyles.sectionHeader}>
            <Text style={matchingDetailStyles.sectionTitle}>정보</Text>
          </View>

          <View style={matchingDetailStyles.infoList}>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>닉네임: </Text>
              <Text style={matchingDetailStyles.infoValue}>{mockDetail.name}</Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>성별: </Text>
              <Text style={matchingDetailStyles.infoValue}>{mockDetail.gender}</Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>나이: </Text>
              <Text style={matchingDetailStyles.infoValue}>{mockDetail.age}</Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>흡연유무: </Text>
              <Text style={matchingDetailStyles.infoValue}>
                {mockDetail.smoker ? "한다" : "하지 않는다"}
              </Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>취침/기상 시간대: </Text>
              <Text style={matchingDetailStyles.infoValue}>
                {mockDetail.sleepTime}취침 {mockDetail.wakeTime} 기상
              </Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>코골이 유무: </Text>
              <Text style={matchingDetailStyles.infoValue}>
                {mockDetail.snoring ? "한다" : "하지 않는다"}
              </Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>청소 주기: </Text>
              <Text style={matchingDetailStyles.infoValue}>{mockDetail.cleaningCycle}</Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>술자리: </Text>
              <Text style={matchingDetailStyles.infoValue}>{mockDetail.drinkingFrequency}</Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>벌레 잘 잡는지: </Text>
              <Text style={matchingDetailStyles.infoValue}>
                {mockDetail.bugKiller ? "잘 잡는다." : "잘 못 잡는다."}
              </Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>취미: </Text>
              <Text style={matchingDetailStyles.infoValue}>{mockDetail.hobby}</Text>
            </View>
            <View style={matchingDetailStyles.infoItem}>
              <Text style={matchingDetailStyles.infoLabel}>기숙사에 없는 요일: </Text>
              <Text style={matchingDetailStyles.infoValue}>{mockDetail.absentDays}</Text>
            </View>
          </View>
        </View>

        {/* 소개말 섹션 */}
        <View style={matchingDetailStyles.section}>
          <Text style={matchingDetailStyles.sectionTitle}>소개말</Text>
          <Text style={matchingDetailStyles.descriptionText}>{mockDetail.selfDescription}</Text>
        </View>
      </ScrollView>

      {/* 매칭 요청하기 버튼 */}
      <View style={matchingDetailStyles.footer}>
        <TouchableOpacity
          style={[
            matchingDetailStyles.requestButton,
            isRequesting && matchingDetailStyles.requestButtonDisabled,
          ]}
          disabled={isRequesting}
          onPress={handleMatchingRequest}>
          <Text
            style={[
              matchingDetailStyles.requestButtonText,
              isRequesting && matchingDetailStyles.requestButtonTextDisabled,
            ]}>
            {isRequesting ? "요청 중..." : "매칭 요청하기"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


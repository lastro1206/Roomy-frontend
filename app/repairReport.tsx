import { apiService } from "@/service/macthing/macthingService";
import { useRepairReportStore } from "@/store/repairReportStore";
import { repairReportStyles } from "@/styles/repairReportStyles";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image, Platform, Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Severity = "LOW" | "MEDIUM" | "HIGH";

export default function RepairReportScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null); // 선택한 이미지 URI
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(""); // AI가 생성한 문의사항
  const [severity, setSeverity] = useState<Severity>("LOW");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null); // 분석 결과 저장
  const addReport = useRepairReportStore((state) => state.addReport);
  const reports = useRepairReportStore((state) => state.reports);

  const pickImage = async () => {
    // 먼저 현재 권한 상태 확인
    const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
    
    if (permissionResult.status === "granted") {
      // 권한이 있으면 바로 이미지 선택
    } else if (permissionResult.canAskAgain) {
      // 다시 물어볼 수 있으면 권한 요청
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한 필요", "사진 접근 권한이 필요합니다.");
        return;
      }
    } else {
      // 권한이 거절되었고 다시 물어볼 수 없으면 설정으로 이동
      Alert.alert(
        "권한 필요",
        "사진 접근 권한이 필요합니다.\n설정에서 권한을 허용해주세요.",
        [
          { text: "취소", style: "cancel" },
          {
            text: "설정으로 이동",
            onPress: async () => {
              if (Platform.OS === "ios") {
                await Linking.openURL("app-settings:");
              } else {
                await Linking.openSettings();
              }
            },
          },
        ]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // 1장만 선택
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      // 이미지 선택만 하고 저장하지 않음
      setImageUri(asset.uri);
    }
  };

  const removeImage = () => {
    // 이미지 선택만 제거 (저장된 파일 없음)
    setImageUri(null);
  };

  const parseLocation = (locationText: string) => {
    // "3층 301호" 또는 "건물명, 3층, 301호" 형식 파싱
    // 예: "3층 301호" -> floor: "3", roomNumber: "301"
    // 예: "행복기숙사, 3층, 301호" -> floor: "3", roomNumber: "301"
    let floor = "";
    let roomNumber: string | null = null;

    // 층수 찾기: "3층", "3F", "3층" 등
    const floorPattern = /(\d+)\s*층/i;
    const floorMatch = locationText.match(floorPattern);
    if (floorMatch) {
      floor = floorMatch[1]; // 숫자만 추출 (string)
    } else {
      // "F"로 끝나는 경우도 처리
      const floorFPattern = /(\d+)\s*F/i;
      const floorFMatch = locationText.match(floorFPattern);
      if (floorFMatch) {
        floor = floorFMatch[1];
      }
    }

    // 호수 찾기: "301호", "301" 등
    const roomPattern = /(\d{3,})\s*호/i;
    const roomMatch = locationText.match(roomPattern);
    if (roomMatch) {
      roomNumber = roomMatch[1]; // 숫자만 추출 (string)
    } else {
      // 쉼표로 구분된 경우나 공백으로 구분된 경우 처리
      const parts = locationText.split(/[,\s]+/).map((p) => p.trim());
      for (const part of parts) {
        // 3자리 이상 숫자만 호수로 간주 (예: "301")
        if (/^\d{3,}$/.test(part)) {
          roomNumber = part;
          break;
        }
      }
    }

    // 기본값 설정
    if (!floor) {
      floor = "1"; // 기본값을 "1" (string)으로 설정
    }

    return { floor, roomNumber };
  };

  const analyzeRepair = async () => {
    if (!location.trim()) {
      Alert.alert("알림", "고장 위치를 입력해주세요.");
      return;
    }

    if (!imageUri) {
      Alert.alert("알림", "사진을 선택해주세요.");
      return;
    }

    try {
      setIsAnalyzing(true);

      const { floor, roomNumber } = parseLocation(location);

      // 기존 신고 목록 조회하여 같은 위치의 신고 ID와 전체 개수 가져오기
      let existingReportIds: number[] = [];
      let totalReportCount = 0;

      try {
        const reportsResponse = await apiService.getRepairReports();
        const allReports = reportsResponse?.data || [];
        totalReportCount = allReports.length;

        // 같은 위치의 기존 신고 ID 필터링
        existingReportIds = allReports
          .filter((report: any) => {
            const sameFloor = report.floor === floor;
            const sameRoom =
              roomNumber && report.roomNumber
                ? report.roomNumber === roomNumber
                : !roomNumber && !report.roomNumber;
            return sameFloor && sameRoom;
          })
          .map((report: any) => report.id);
      } catch (err) {
        console.warn("기존 신고 목록 조회 실패, 기본값 사용:", err);
      }

      const analyzeRequest = {
        existingReportIds,
        totalReportCount,
        floor,
        roomNumber: roomNumber || null,
      };

      console.log("=== 고장 분석 API 요청 ===");
      console.log("요청:", JSON.stringify(analyzeRequest, null, 2));
      const response = await apiService.analyzeRepair(analyzeRequest);
      console.log("=== 고장 분석 API 응답 ===");
      console.log("응답:", JSON.stringify(response, null, 2));

      // AI가 생성한 문의사항을 description에 설정
      if (response?.data?.analysis?.description) {
        setDescription(response.data.analysis.description);
      }

      // 분석 결과 저장
      setAnalysisResult(response?.data?.analysis);

      // 심각도도 분석 결과에서 가져오기 (선택사항)
      if (response?.data?.analysis?.severity) {
        const analysisSeverity = response.data.analysis.severity;
        // API의 severity를 우리의 Severity 타입으로 매핑
        if (analysisSeverity === "CRITICAL" || analysisSeverity === "HIGH") {
          setSeverity("HIGH");
        } else if (analysisSeverity === "MEDIUM") {
          setSeverity("MEDIUM");
        } else {
          setSeverity("LOW");
        }
      }
    } catch (error: any) {
      console.error("분석 실패:", error);
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error?.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        errorMessage =
          errorData?.message ||
          errorData?.error ||
          `서버 오류 (${status})\n\n서버 로그를 확인해주세요.`;
        console.error("서버 응답 상세:", JSON.stringify(errorData, null, 2));
      } else if (error?.request) {
        errorMessage = "네트워크 오류가 발생했습니다.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      Alert.alert("오류", errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!location.trim()) {
      Alert.alert("알림", "고장 위치를 입력해주세요.");
      return;
    }

    if (!imageUri) {
      Alert.alert("알림", "사진을 선택해주세요.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("알림", "먼저 분석을 진행해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      const { floor, roomNumber } = parseLocation(location);

      // 분석 결과가 없으면 분석 먼저 실행
      if (!analysisResult) {
        Alert.alert("알림", "먼저 분석을 진행해주세요.");
        setIsSubmitting(false);
        return;
      }

      // 같은 위치의 기존 신고 확인 (중복 체크)
      const duplicateReport = reports.find((report) => {
        const sameFloor = report.floor === floor;
        const sameRoom =
          roomNumber && report.roomNumber
            ? report.roomNumber === roomNumber
            : !roomNumber && !report.roomNumber;
        return sameFloor && sameRoom;
      });

      // 중복 신고가 있으면 알림 표시
      if (duplicateReport) {
        Alert.alert(
          "중복 신고",
          "같은 위치로 이미 신고가 등록되어 있습니다.\n기존 신고를 확인하시겠습니까?",
          [
            { text: "취소", style: "cancel" },
            {
              text: "상세 보기",
              onPress: () => {
                router.push({
                  pathname: "/repairDetail",
                  params: { id: duplicateReport.id.toString() },
                } as any);
              },
            },
          ]
        );
        setIsSubmitting(false);
        return;
      }

      // 심각도 매핑 (UI의 Severity -> API의 severity)
      const severityMap: Record<Severity, "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"> = {
        HIGH: "HIGH",
        MEDIUM: "MEDIUM",
        LOW: "LOW",
      };

      // 로컬 스토어에 신고 추가 (API 호출 없이)
      addReport({
        floor,
        roomNumber: roomNumber || null,
        item: analysisResult.item || "시설",
        issue: analysisResult.issue || "고장",
        severity: severityMap[severity],
        priorityScore: analysisResult.priority_score || 0,
        description: description,
        imagePath: imageUri,
        status: "PENDING",
      });

      Alert.alert("성공", "신고가 등록되었습니다.", [
        {
          text: "확인",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (error: any) {
      console.error("신고 등록 실패:", error);
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error?.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        errorMessage =
          errorData?.message ||
          errorData?.error ||
          `서버 오류 (${status})\n\n서버 로그를 확인해주세요.`;
        console.error("서버 응답 상세:", JSON.stringify(errorData, null, 2));
      } else if (error?.request) {
        errorMessage = "네트워크 오류가 발생했습니다.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      Alert.alert("오류", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={repairReportStyles.container}>
      {/* Header */}
      <View style={repairReportStyles.header}>
        <Pressable onPress={() => router.back()} style={repairReportStyles.closeButton}>
          <Ionicons name="close-outline" size={24} color="#000" />
        </Pressable>
        <Text style={repairReportStyles.headerTitle}>신고하기</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={repairReportStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Image Upload Section */}
        <View style={repairReportStyles.imageSection}>
          {!imageUri ? (
            <TouchableOpacity style={repairReportStyles.imageUploadButton} onPress={pickImage}>
              <Ionicons name="camera-outline" size={32} color="#5A81FA" />
            </TouchableOpacity>
          ) : (
            <View style={repairReportStyles.imageItem}>
              <Image source={{ uri: imageUri }} style={repairReportStyles.selectedImage} />
              <TouchableOpacity
                style={repairReportStyles.removeImageButton}
                onPress={removeImage}>
                <Ionicons name="close-circle" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Fault Location Input */}
        <View style={repairReportStyles.inputSection}>
          <Text style={repairReportStyles.inputLabel}>고장 위치</Text>
          <TextInput
            style={repairReportStyles.textInput}
            placeholder="건물명, 층수, 호수(선택)를 작성해주세요"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
            multiline={false}
          />
        </View>

        {/* Inquiry Details Input */}
        <View style={repairReportStyles.inputSection}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={repairReportStyles.inputLabel}>문의사항</Text>
            <Pressable
              style={[
                {
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: description ? "#E5E5E5" : "#5A81FA",
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                },
                isAnalyzing && { opacity: 0.6 },
              ]}
              disabled={isAnalyzing}
              onPress={analyzeRepair}>
              {isAnalyzing && (
                <ActivityIndicator 
                  size="small" 
                  color={description ? "#666" : "#FFF"} 
                  style={{ marginRight: 8 }}
                />
              )}
              <Text
                style={{
                  color: description ? "#666" : "#FFF",
                  fontSize: 14,
                  fontWeight: "600",
                }}>
                {isAnalyzing ? "분석 중..." : description ? "다시 분석" : "분석하기"}
              </Text>
            </Pressable>
          </View>
          <TextInput
            style={[repairReportStyles.textInput, repairReportStyles.textArea, !description && { backgroundColor: "#F5F5F5" }]}
            placeholder={description ? "" : "분석하기 버튼을 눌러 AI가 문의사항을 생성합니다."}
            placeholderTextColor="#999"
            value={description}
            onChangeText={() => {}} // 읽기 전용
            editable={false}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Severity Selection */}
        <View style={repairReportStyles.inputSection}>
          <View style={repairReportStyles.severityHeader}>
            <Text style={repairReportStyles.inputLabel}>심각도</Text>
          </View>
          <View style={repairReportStyles.severityButtons}>
            <Pressable
              style={[
                repairReportStyles.severityButton,
                severity === "LOW" && repairReportStyles.severityButtonSelected,
              ]}
              onPress={() => setSeverity("LOW")}>
              <Text
                style={[
                  repairReportStyles.severityButtonText,
                  severity === "LOW" && repairReportStyles.severityButtonTextSelected,
                ]}>
                여유
              </Text>
            </Pressable>
            <Pressable
              style={[
                repairReportStyles.severityButton,
                severity === "MEDIUM" && repairReportStyles.severityButtonSelected,
              ]}
              onPress={() => setSeverity("MEDIUM")}>
              <Text
                style={[
                  repairReportStyles.severityButtonText,
                  severity === "MEDIUM" && repairReportStyles.severityButtonTextSelected,
                ]}>
                보통
              </Text>
            </Pressable>
            <Pressable
              style={[
                repairReportStyles.severityButton,
                severity === "HIGH" && repairReportStyles.severityButtonSelected,
              ]}
              onPress={() => setSeverity("HIGH")}>
              <Text
                style={[
                  repairReportStyles.severityButtonText,
                  severity === "HIGH" && repairReportStyles.severityButtonTextSelected,
                ]}>
                긴급
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={repairReportStyles.footer}>
        <Pressable
          style={[
            repairReportStyles.submitButton,
            isSubmitting && repairReportStyles.submitButtonDisabled,
          ]}
          disabled={isSubmitting}
          onPress={handleSubmit}>
          <Text
            style={[
              repairReportStyles.submitButtonText,
              isSubmitting && repairReportStyles.submitButtonTextDisabled,
            ]}>
            {isSubmitting ? "등록 중..." : "등록하기"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


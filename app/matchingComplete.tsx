import { matchingCompleteStyles } from "@/styles/matchingCompleteStyles";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MatchingCompleteScreen() {
  const handleGoToMain = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={matchingCompleteStyles.container}>
      <View style={matchingCompleteStyles.content}>
        {/* 제목 */}
        <Text style={matchingCompleteStyles.title}>매칭이 완료되었어요</Text>

        {/* 서브텍스트 */}
        <Text style={matchingCompleteStyles.subtitle}>
          상대방도 수락하면{"\n"}바로 알려드릴게요!
        </Text>

        {/* 3D 캐릭터 이미지 영역 */}
        <View style={matchingCompleteStyles.charactersContainer}>
          <View style={matchingCompleteStyles.characterBox}>
            {/* 왼쪽 캐릭터 - 파란색 스웨터 */}
            <View style={matchingCompleteStyles.character}>
                <Image source={require("@/assets/images/requestMatching.png")} style={matchingCompleteStyles.characterImage} />
            </View>
          </View>
        </View>
      </View>

      {/* 메인으로 버튼 */}
      <View style={matchingCompleteStyles.footer}>
        <Pressable style={matchingCompleteStyles.mainButton} onPress={handleGoToMain}>
          <Text style={matchingCompleteStyles.mainButtonText}>메인으로</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


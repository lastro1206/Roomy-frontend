import { homeStyles } from "@/styles/homeStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const noticeImages = [
  require("@/assets/images/notice1.png"),
  require("@/assets/images/notice2.png"),
  require("@/assets/images/notice3.png"),
];

const noticeSlides = [
  { id: "1", title: "기숙사 단수 안내", date: "12월 25일 오전 9시~12시" },
  { id: "2", title: "시설 점검 공지", date: "12월 26일 14시~16시" },
  { id: "3", title: "소방 대피 훈련", date: "12월 28일 10시" },
];

const quickActions = [
  { id: "outhome", label: "외박신청", image: require("@/assets/images/outhome.png"), route: "/outhome" },
  { id: "replacemeal", label: "대체식", image: require("@/assets/images/replacefood.png"), route: "/replacemeal" },
  { id: "faq", label: "FAQ", image: require("@/assets/images/faq.png"), route: "/faq" },
  { id: "lifenotice", label: "생활안내", image: require("@/assets/images/lifenotice.png"), route: "/lifenotice" },
];

export default function Index() {
  const { width } = useWindowDimensions();
  const carouselWidth = useMemo(() => width - 40, [width]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // 페이드 아웃
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // 다음 인덱스로 변경
        setCurrentIndex((prev) => (prev + 1) % noticeImages.length);
        // 페이드 인
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={homeStyles.headerRow}>
          <Image source={require("@/assets/images/homeLogo.png")} style={{ width: 94, height: 27,
            backgroundColor: "#F6F5FA",
           }} resizeMode='contain' />
        </View>

        {/* Greeting */}
        <View style={homeStyles.greetingBlock}>
          
        <Text style={homeStyles.subGreeting}>좋은 하루에요 물개님,</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
            {/* 왼쪽 텍스트 영역 */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
                <Text style={homeStyles.mainHeadline}>오늘의 </Text>
                <Text style={{ color: "#5A81FA", fontSize: 24, fontWeight: "800" }}>기숙사 소식</Text>
                <Text style={homeStyles.mainHeadline}>을</Text>
              </View>
              <Text style={homeStyles.mainHeadline}>한눈에 확인해보세요</Text>
            </View>
            
            {/* 오른쪽 이미지 */}
            <Image
              source={require("@/assets/images/dormheader.png")}
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>

                {/* Notice carousel */}
                <View style={[homeStyles.noticeCard, { width: carouselWidth }]}>
          <Animated.View
            style={[
              {
                width: "100%",
                height: "100%",
                opacity: fadeAnim,
              },
            ]}>
            <Image
              source={noticeImages[currentIndex]}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
                borderRadius: 18,
              }}
            />
          </Animated.View>
        </View>
        
        <View style={homeStyles.dotsRow}>
          {noticeImages.map((_, idx) => (
            <View
              key={idx}
              style={[homeStyles.dot, idx === currentIndex && homeStyles.dotActive]}
            />
          ))}
        </View>

        <View style={homeStyles.quickRow}>
          {quickActions.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={homeStyles.quickItem}
              onPress={() => router.push(item.route as any)}>
              <View style={{...homeStyles.quickIconBox, backgroundColor:"#F6F5FA"
              }}>
                <Image 
                  source={item.image} 
                  style={{ width: 52, height: 52 }} 
                  resizeMode='contain' 
                />
              </View>
              <Text style={homeStyles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
                {/* Cards */}
                <View style={homeStyles.cardRow}>
          {/* 생활점검 카드 */}
          <TouchableOpacity 
            style={homeStyles.card}
            onPress={() => router.push("/lifecheck" as any)}>
            <View style={homeStyles.cardContent}>
              <View style={homeStyles.cardLeftContent}>
                <View style={homeStyles.ddayImageContainer}>
                  <Image
                    source={require("@/assets/images/D-14.png")}
                    style={homeStyles.ddayImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={homeStyles.cardTextRow}>
                  <Text style={homeStyles.cardTitle}>생활점검</Text>
                  <View style={homeStyles.badge}>
                    <Text style={homeStyles.badgeText}>디데이</Text>
                  </View>
                </View>
              </View>
              <MaterialCommunityIcons
                name='chevron-right'
                size={20}
                color='#999'
                style={homeStyles.cardArrowTop}
              />
            </View>
          </TouchableOpacity>

          {/* 오늘의 메뉴 카드 */}
          <TouchableOpacity 
            style={homeStyles.card}
            onPress={() => router.push("/menu" as any)}>
            <View style={homeStyles.cardContent}>
              <View style={homeStyles.cardLeftContent}>
                <View style={homeStyles.menuIconBox}>
                  <Image
                    source={require("@/assets/images/menu.png")}
                    style={homeStyles.menuImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={homeStyles.cardTextRow}>
                  <Text style={homeStyles.cardTitle}>오늘의 메뉴</Text>
                  <View style={homeStyles.badge}>
                    <Text style={homeStyles.badgeText}>점심</Text>
                  </View>
                </View>
              </View>
              <MaterialCommunityIcons
                name='chevron-right'
                size={20}
                color='#999'
                style={homeStyles.cardArrowTop}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
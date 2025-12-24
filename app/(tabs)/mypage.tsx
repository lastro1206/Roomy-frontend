import { mypageStyles } from "@/styles/mypageStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPage() {
  return (
    <SafeAreaView style={mypageStyles.container}>
      {/* Header */}
      <View style={mypageStyles.header}>
        <Text style={mypageStyles.headerTitle}>마이페이지</Text>
      </View>

      <ScrollView
        contentContainerStyle={mypageStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={mypageStyles.profileSection}>
          <View style={mypageStyles.profileImageContainer}>
            <Ionicons name="person-circle-outline" size={80} color="#5A81FA" />
          </View>
          <Text style={mypageStyles.profileName}>홍길동</Text>
          <Text style={mypageStyles.profileEmail}>hong@example.com</Text>
        </View>

        {/* Menu Section */}
        <View style={mypageStyles.menuSection}>
          <TouchableOpacity style={mypageStyles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#333" />
            <Text style={mypageStyles.menuText}>프로필 수정</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={mypageStyles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#333" />
            <Text style={mypageStyles.menuText}>설정</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={mypageStyles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#333" />
            <Text style={mypageStyles.menuText}>고객센터</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={mypageStyles.menuItem}>
            <Ionicons name="document-text-outline" size={24} color="#333" />
            <Text style={mypageStyles.menuText}>이용약관</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={mypageStyles.logoutButton}>
          <Text style={mypageStyles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

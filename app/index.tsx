import { useAuth } from "@/contexts/AuthContext";
import { loginStyles } from "@/styles/loginStyles";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function UserLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUserType } = useAuth();

  const mockHomeButton = () => {
    router.push("/(tabs)");
  };

  const handleLogin = () => {
    setErrorMessage(null);

    if (!email) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    // 로그인 검증
    if (email === "24000000" && password === "test1234") {
      setUserType("user");
      router.push("/onboarding/firstWelcomeText");
    } else {
      setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.topSpacer} />

      <View style={loginStyles.logoContainer}>
        <Image source={require("@/assets/images/logo.png")} style={{ width: 140, height: 160 }} resizeMode='contain' />
      </View>
      <View style={loginStyles.content}>
        <TextInput
          style={loginStyles.input}
          placeholder='학번/아이디'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          placeholderTextColor='#B3B3B3'
        />

        <TextInput
          style={loginStyles.input}
          placeholder='비밀번호'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor='#B3B3B3'
        />

        {errorMessage && (
          <Text style={loginStyles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity
          style={loginStyles.buttonText}
          onPress={handleLogin}>
          <Text style={loginStyles.nextLabel}>로그인</Text>
        </TouchableOpacity>
      </View>
      
      <View style={loginStyles.bottomSpacer} />
    </View>
  );
}

// app/adminLogin.tsx
import { useAuth } from "@/contexts/AuthContext";
import { loginStyles } from "@/styles/loginStyles";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AdminLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUserType } = useAuth();

  const handleUserLoginButton = () => {
    router.push("/userLogin");
  };

  const handleLogin = () => {
    setErrorMessage(null);

    if (!email) {
      setErrorMessage("관리자 이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    // 관리자 로그인 검증
    if (email === "admin" && password === "admin123") {
      setUserType("admin");
      router.replace("/(admin-tabs)");
    } else {
      setErrorMessage("관리자 이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.content}>
        <Text style={loginStyles.title}>관리자 로그인</Text>

        <TextInput
          style={loginStyles.input}
          placeholder='관리자 이메일'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
        />

        <TextInput
          style={loginStyles.input}
          placeholder='비밀번호'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage && (
          <Text style={loginStyles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity
          style={loginStyles.loginButton}
          onPress={handleLogin}>
          <Text style={loginStyles.buttonText}>로그인</Text>
        </TouchableOpacity>

        <View style={loginStyles.secondaryContainer}>
          <Text style={loginStyles.secondary}>사용자이신가요? </Text>
          <TouchableOpacity onPress={handleUserLoginButton}>
            <Text style={loginStyles.secondaryText}>사용자 로그인하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import { mypageStyles } from "@/styles/mypageStyles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function MyPage() {
  return (
    <SafeAreaView style={mypageStyles.container}>
      <Text>My Page</Text>
    </SafeAreaView>
  );
}

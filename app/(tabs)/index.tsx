import { homeStyles } from "@/styles/homeStyles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView style={homeStyles.container}>
      <Text>Hello World</Text>
    </SafeAreaView>
  );
}

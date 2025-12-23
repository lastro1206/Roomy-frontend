import { matchingStyles } from "@/styles/matchingStyles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Matching() {
  return (
    <SafeAreaView style={matchingStyles.container}>
      <Text>Matching</Text>
    </SafeAreaView>
  );
}

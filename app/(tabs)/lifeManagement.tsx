import { lifeManagementStyles } from "@/styles/lifeManagement";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LifeManagement() {
  return (
    <SafeAreaView style={lifeManagementStyles.container}>
      <Text>Life Management</Text>
    </SafeAreaView>
  );
}

import MapView from "@/components/MapView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminHomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView />
    </SafeAreaView>
  );
}

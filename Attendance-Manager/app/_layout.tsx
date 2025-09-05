import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "@/components/shared/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { ProtectedRoute } from "@/components/shared/Redirect";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <ProtectedRoute>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </ProtectedRoute>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

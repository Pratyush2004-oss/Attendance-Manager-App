import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "@/components/shared/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { ProtectedRoute } from "@/components/shared/Redirect";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  // Wait until the font is loaded before rendering the app
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <ProtectedRoute>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
          </Stack>
        </ProtectedRoute>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

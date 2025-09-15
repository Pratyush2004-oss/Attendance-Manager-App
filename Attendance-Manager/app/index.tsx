import { useRouter } from "expo-router";
import { Text, Pressable, View } from "react-native";

export default function Index() {
  const navigate = useRouter();
  return (
    <View className="items-center justify-center flex-1 bg-red-500">
      <Text className="text-2xl text-white">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Pressable
        className="p-5 mt-4 border-2 border-black rounded-md"
        onPress={() => navigate.push("/(auth)")}
      >
        <Text>Navigate to Home</Text>
      </Pressable>
    </View>
  );
}

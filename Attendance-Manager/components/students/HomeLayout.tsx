import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationOptions } from "@/assets/constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HomeLayout = () => {
  const router = useRouter();
  return (
    <FlatList
      data={NavigationOptions}
      className="flex-1 px-4 bg-blue-400/40"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 25 }}
      keyExtractor={(item) => item.category}
      renderItem={({ item }) => (
        <View className="px-4 py-3 mt-4 border-2 border-white rounded-2xl">
          <Text className="mb-2 text-3xl font-black text-white">
            {item.category}
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item.options}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="items-center p-4 mr-3 shadow-lg min-w-40 bg-blue-500/70 rounded-xl"
                onPress={() => {
                  router.push(item.href as any);
                }}
              >
                <View className="p-3.5 border border-white rounded-full bg-blue-700/50">
                  <Ionicons
                    className="rounded-full"
                    name={item.icon as keyof typeof Ionicons.glyphMap}
                    size={
                      item.icon.includes("people") || item.icon.includes("bar")
                        ? 40
                        : 45
                    }
                    color="white"
                  />
                </View>
                <Text className="text-lg font-medium text-center text-white text-wrap">
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    />
  );
};

export default HomeLayout;

import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AuthHeader = () => {
  const router = useRouter();
  return (
    <>
      <Pressable
        onPress={() => router.back()}
        className="absolute z-20 left-5 top-5"
      >
        <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
      </Pressable>
      <View className="w-full gap-3 px-3">
        <Text className="text-3xl text-center text-white">
          Attandance Manager
        </Text>
        <Text className="text-lg text-center text-white">
          Manage, View and Mark Your Attendance, Effortlessly
        </Text>
      </View>
    </>
  );
};

export default AuthHeader;

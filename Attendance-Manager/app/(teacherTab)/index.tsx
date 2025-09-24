import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import HomeLayout from "@/components/teachers/HomeLayout";

const Home = () => {
  return (
    <View className="flex-1">
      <HomeLayout />
    </View>
  );
};

export default Home;

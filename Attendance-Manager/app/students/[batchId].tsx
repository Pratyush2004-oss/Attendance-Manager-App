import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import BackHeader from "@/components/shared/BackHeader";

const BatchDetails = () => {
  const { batchId } = useLocalSearchParams();
  return (
    <View className="flex-1 ">
      <BackHeader />
      <Text>{batchId}</Text>
    </View>
  );
};

export default BatchDetails;

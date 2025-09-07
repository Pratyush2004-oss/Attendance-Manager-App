import BatchFlatList from "@/components/students/BatchFlatList";
import React from "react";
import { View } from "react-native";

const Batches = () => {
  return (
    <View className="flex-1">
      <BatchFlatList />
    </View>
  );
};

export default Batches;

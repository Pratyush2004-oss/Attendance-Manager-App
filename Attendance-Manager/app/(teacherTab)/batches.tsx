import BatchFlatList from "@/components/teachers/BatchFlatList";
import CreateBatch from "@/components/teachers/CreateBatch";
import React from "react";
import { View } from "react-native";

const Batches = () => {
  return (
    <View className="flex-1">
      <CreateBatch />
      <BatchFlatList />
    </View>
  );
};

export default Batches;

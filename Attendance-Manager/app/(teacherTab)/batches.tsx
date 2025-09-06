import BatchFlatList from "@/components/BatchFlatList";
import CreateBatch from "@/components/CreateBatch";
import React from "react";
import { FlatList, View } from "react-native";

const Batches = () => {
  return (
    <FlatList
      data={[]}
      className="flex-1 bg-gray-100"
      ListHeaderComponent={() => (
        <View className="flex-1">
          <CreateBatch />
          <BatchFlatList />
        </View>
      )}
      renderItem={() => null}
    />
  );
};

export default Batches;

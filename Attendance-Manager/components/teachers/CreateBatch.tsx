import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CreateBatch = () => {
  return (
    <View className="px-5 mt-5">
      <TouchableOpacity className="flex-row items-center justify-center px-5 py-3 rounded-full bg-blue-700/70 ">
        <Ionicons
          className="mr-2"
          name="add-circle-outline"
          size={24}
          color="white"
        />
        <Text className="text-lg font-medium text-center text-white">
          Create Batch
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBatch;

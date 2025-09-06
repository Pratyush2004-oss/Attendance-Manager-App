import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CreateBatch = () => {
  return (
    <View className="px-5">
      <TouchableOpacity className="px-5 py-3 rounded-full bg-blue-700/70">
        <Text className="text-lg font-medium text-center">
          <Ionicons
            className="mr-2"
            name="add-circle-outline"
            size={24}
            color="white"
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBatch;

import { useBatchStore } from "@/store/batch.store";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddToBatchModal from "./AddToBatchModal";

const BatchStudentList = () => {
  const [showModal, setshowModal] = useState(false);
  const { selectedBatch, batchStudentList } = useBatchStore();
  return (
    selectedBatch && (
      <>
        <FlatList
          data={batchStudentList}
          keyExtractor={(item) => item._id}
          className="flex-1 bg-gray-200"
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <View className="flex-row items-center justify-between p-2 bg-gray-200 border-b-2 px-7">
              <Text className="text-3xl font-bold">
                Students ({batchStudentList.length})
              </Text>
              <TouchableOpacity
                className="p-1 rounded-full bg-blue-500/70"
                onPress={() => setshowModal(true)}
              >
                <Ionicons name="add-circle-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center flex-1 h-[50vh] bg-gray-200 gap-10">
              <Text className="text-3xl font-bold">No Students found</Text>
              <TouchableOpacity
                className="w-5/6 px-5 py-3 rounded-full bg-blue-700/70"
                onPress={() => setshowModal(true)}
              >
                <Text className="text-xl text-center text-white">
                  Add Students
                </Text>
              </TouchableOpacity>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="relative flex-row items-center gap-3 p-2 mx-1 my-2 bg-blue-500/70 rounded-xl">
              <Image
                source={require("@/assets/images/student.jpeg")}
                className="rounded-full size-32 aspect-square"
              />
              <Pressable className="absolute p-2 right-2 top-2">
                <FontAwesome name="ellipsis-v" size={20} color="white" />
              </Pressable>
              <View className="w-full">
                <Text className="text-xl font-bold text-white">
                  {item.name}
                </Text>
                <Text className="text-lg font-semibold text-white">
                  {item.email}
                </Text>
                <View className="h-0.5 bg-white my-2 w-full pr-2" />
                <View>
                  <Text className="text-lg font-semibold text-white underline">
                    Guardian Details
                  </Text>
                  <Text className="text-lg font-semibold text-gray-200">
                    Name:{" "}
                    <Text className="text-xl font-bold text-white">
                      {item.guardian.name}
                    </Text>
                  </Text>
                  <Text className="text-lg font-semibold text-gray-200">
                    Number:{" "}
                    <Text className="text-xl font-bold text-white">
                      {item.guardian.number}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        <AddToBatchModal setshowModal={setshowModal} showModal={showModal} />
      </>
    )
  );
};

export default BatchStudentList;

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import useTeacherHook from "@/hooks/UseTeacherHook";
import { BatchForTeacherType } from "@/types";
import { Ionicons } from "@expo/vector-icons";

const BatchFlatList = () => {
  const [BatchList, setBatchList] = useState<BatchForTeacherType[]>([]);
  const { getListOfAllBatches } = useTeacherHook();
  const getBatchList = async () => {
    const batches = await getListOfAllBatches();
    setBatchList(batches);
  };
  useEffect(() => {
    BatchList.length === 0 && getBatchList();
  }, [BatchList]);
  return (
    <FlatList
      className="flex-1 p-4 bg-gray-100"
      data={BatchList}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={() => (
        <View className="my-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold text-center">
              Your Batches ({BatchList.length})
            </Text>
          </View>
          {/* Search Bar */}
          {BatchList.length > 0 && (
            <View className="relative flex-row items-center bg-white rounded-full">
              <TextInput
                placeholder="Search"
                className="w-5/6 p-4 bg-transparent rounded-full"
              />
              <Pressable className="absolute items-center justify-center right-1">
                <Ionicons name="search-circle" size={45} color="#3b82f6" />
              </Pressable>
            </View>
          )}
        </View>
      )}
      ListEmptyComponent={() => (
        <View className="items-center justify-center flex-1 my-auto h-96">
          <TouchableOpacity className="w-5/6 p-3 bg-blue-500 rounded-xl">
            <Text className="text-2xl font-medium text-center text-white">
              Create Batch
            </Text>
          </TouchableOpacity>
        </View>
      )}
      renderItem={({ item }) => (
        <View className="relative flex-row items-center gap-3 px-5 py-3 shadow-lg bg-blue-700/70 rounded-xl">
          <Image
            source={require("@/assets/images/teacher.jpg")}
            className="rounded-full size-28 aspect-square"
          />
          <View className="">
            <Text className="text-2xl font-bold text-white">{item.name}</Text>
            <Text className="text-lg font-bold text-white">
              {item.Organization.name}
            </Text>
            <Text className="text-lg font-medium text-white">
              Joining Code: {item.batchJoiningCode}
            </Text>
            <Text className="text-lg font-medium text-white">
              Number of Students: {item.studentCount}
            </Text>
          </View>
          <TouchableOpacity className="absolute right-5">
            <Ionicons name="arrow-forward-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default BatchFlatList;

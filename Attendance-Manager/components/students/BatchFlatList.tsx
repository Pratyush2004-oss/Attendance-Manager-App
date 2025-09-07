import useStudentHook from "@/hooks/UseStudentHook";
import { BatchForStudentType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BatchFlatList = () => {
  const [BatchList, setBatchList] = useState<BatchForStudentType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const { getListOfAllBatches } = useStudentHook();
  const getBatchList = async () => {
    const batches = await getListOfAllBatches();
    setBatchList(batches);
  };
  useEffect(() => {
    BatchList.length === 0 && getBatchList();
  }, [BatchList]);

  const filteredList = () => {
    return BatchList.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.Organization.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  };
  return (
    <>
      {/* Search Bar */}
      {BatchList.length > 0 && (
        <View className="flex-row items-center justify-center my-3">
          <View className="flex-row w-5/6 bg-white rounded-full">
            <TextInput
              placeholder="Search"
              className="w-5/6 p-4 text-base bg-transparent rounded-full"
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
            />
            <Ionicons
              className="absolute items-center justify-center right-1"
              name="search-circle"
              size={45}
              color="#3b82f6"
            />
          </View>
        </View>
      )}
      <FlatList
        className="flex-1 px-4 bg-gray-100"
        contentContainerStyle={{ paddingBottom: 20 }}
        data={searchInput ? filteredList() : BatchList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <View className="mt-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-center">
                Your Batches ({BatchList.length})
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center flex-1 my-auto h-96">
            <TouchableOpacity className="w-5/6 p-3 bg-blue-500 rounded-xl">
              <Text className="text-2xl font-medium text-center text-white">
                Join Batches
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="relative flex-row items-center gap-3 px-5 py-3 mt-3 shadow-lg bg-blue-700/70 rounded-xl">
            <Image
              source={require("@/assets/images/student.jpeg")}
              className="rounded-full size-28 aspect-square"
            />
            <View className="gap-1.5">
              <Text className="text-2xl font-bold text-white">{item.name}</Text>
              <Text className="text-2xl font-bold text-emerald-300">
                ({item.Organization.name})
              </Text>
              <Text>
                <Text className="text-lg font-medium text-white">
                  Teacher:{" "}
                  <Text className="text-xl font-extrabold">
                    {item.teacherId.name}
                  </Text>
                </Text>
              </Text>
              <Text className="text-lg font-medium text-white">
                Students:{" "}
                <Text className="text-xl font-extrabold">
                  {item.studentCount}
                </Text>
              </Text>
            </View>
            <TouchableOpacity className="absolute right-5">
              <Ionicons name="arrow-forward-circle" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

export default BatchFlatList;

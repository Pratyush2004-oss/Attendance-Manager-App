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
import SearchBar from "../shared/SearchBar";

const BatchFlatList = () => {
  const [BatchList, setBatchList] = useState<BatchForTeacherType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const { getListOfAllBatches } = useTeacherHook();
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
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
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
                Create Batch
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="relative flex-row items-center gap-3 px-5 py-3 mt-3 shadow-lg bg-blue-700/70 rounded-xl">
            <Image
              source={require("@/assets/images/teacher.jpg")}
              className="rounded-full size-28 aspect-square"
            />
            <View className="gap-1.5">
              <Text className="text-2xl font-bold text-white">{item.name}</Text>
              <Text className="text-lg font-bold text-white">
                ({item.Organization.name})
              </Text>
              <Text className="text-lg font-medium text-white">
                Joining Code:{" "}
                <Text className="text-xl font-black">
                  {item.batchJoiningCode}
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

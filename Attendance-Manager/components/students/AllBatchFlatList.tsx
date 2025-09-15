import useStudentHook from "@/hooks/UseStudentHook";
import { AllBatchesType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import BatchModal from "./BatchModal";
import SearchBar from "../shared/SearchBar";
const AllBatchFlatList = () => {
  const [BatchList, setBatchList] = useState<AllBatchesType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<AllBatchesType | null>(
    null
  );
  const { getAllBatchesListOfOrganization } = useStudentHook();
  const getBatchList = async () => {
    const batches = await getAllBatchesListOfOrganization();
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
                All Batches ({BatchList.length})
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center flex-1 my-auto h-96">
            <Pressable className="w-5/6 p-3 bg-blue-500 rounded-xl">
              <Text className="text-2xl font-medium text-center text-white">
                Join Batches
              </Text>
            </Pressable>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => setSelectedBatch(item)}
            className="relative flex-row items-center gap-3 px-5 py-3 mt-3 shadow-lg bg-blue-700/70 rounded-xl"
          >
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
            </View>
            {item.isStudent && (
              <Pressable className="absolute p-1 bg-white rounded-full right-5">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color="green"
                  className="ml-auto"
                />
              </Pressable>
            )}
            {selectedBatch?._id === item._id && (
              <BatchModal
                selectedBatch={selectedBatch}
                setSelectedBatch={setSelectedBatch}
              />
            )}
          </Pressable>
        )}
        ListFooterComponent={() => (
          <View className="items-center px-5 py-2">
            <Text className="text-lg">Press and Hold the Batch to Join</Text>
          </View>
        )}
      />
    </>
  );
};

export default AllBatchFlatList;

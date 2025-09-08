import BackHeader from "@/components/shared/BackHeader";
import { batchParamsType, StudentType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
const BatchDetailsPage = ({
  params,
  StudentList,
}: {
  params: batchParamsType;
  StudentList: StudentType[];
}) => {
  console.log(StudentList);
  return (
    <View className="flex-1">
      <BackHeader />
      <View className="relative flex-row items-center gap-3 px-5 py-5 bg-green-700/70">
        <Image
          source={require("@/assets/images/teacher.jpg")}
          className="rounded-full size-40 aspect-square"
        />
        <View className="gap-1.5">
          <Text className="text-3xl font-bold text-white">{params.name}</Text>
          <Text className="text-2xl font-bold text-white">
            ({params.organizationName})
          </Text>
          <Text className="text-xl font-medium text-white">
            Joining Code:{" "}
            <Text className="text-2xl font-black">
              {params.batchJoiningCode}
            </Text>
          </Text>
          <Text className="text-lg font-medium text-white">
            Students:{" "}
            <Text className="text-xl font-extrabold">
              {params.studentCount}
            </Text>
          </Text>
        </View>
      </View>
      {/* Students List */}
      <FlatList
        data={StudentList}
        ListHeaderComponent={() => (
          <View className="flex-row items-center justify-between p-2 bg-gray-200 border-b-2 px-7">
            <Text className="text-3xl font-bold">
              Students ({params.studentCount})
            </Text>
            <TouchableOpacity className="p-1 rounded-full bg-blue-500/70">
              <Ionicons name="add-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center flex-1 h-[50vh] bg-gray-200 gap-10">
            <Text className="text-3xl font-bold">No Students found</Text>
            <TouchableOpacity className="w-5/6 px-5 py-3 rounded-full bg-blue-700/70">
              <Text className="text-xl text-center text-white">
                Add Students
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View>
            <View></View>
          </View>
        )}
      />
    </View>
  );
};

export default BatchDetailsPage;

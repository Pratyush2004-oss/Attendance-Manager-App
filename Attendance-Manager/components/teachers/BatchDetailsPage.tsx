import BackHeader from "@/components/shared/BackHeader";
import { batchParamsType, StudentType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BatchStudentList from "./BatchStudentList";
const BatchDetailsPage = ({
  params,
  StudentList,
}: {
  params: batchParamsType;
  StudentList: StudentType[];
}) => {
  return (
    <View className="flex-1">
      <BackHeader />
      <View className="relative flex-row items-center gap-3 px-5 py-5 bg-green-700/70">
        <Image
          source={require("@/assets/images/teacher.jpg")}
          className="rounded-full size-36 aspect-square"
        />

        {/* Edit Button */}
        <TouchableOpacity className="absolute p-2 bg-blue-500 rounded-full right-5 bottom-2">
          <Ionicons name="pencil-outline" size={24} color="white" />
        </TouchableOpacity>
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
      <BatchStudentList StudentList={StudentList} params={params} />
    </View>
  );
};

export default BatchDetailsPage;

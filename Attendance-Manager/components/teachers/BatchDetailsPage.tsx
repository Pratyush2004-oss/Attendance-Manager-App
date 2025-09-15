import BackHeader from "@/components/shared/BackHeader";
import { useBatchStore } from "@/store/batch.store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, Pressable, View, TouchableOpacity } from "react-native";
import LoadingSection from "../shared/LoadingSection";
import BatchStudentList from "./BatchStudentList";
import { useRouter, useSegments } from "expo-router";
import AttendanceList from "./AttendanceList";
const BatchDetailsPage = ({}: {}) => {
  const router = useRouter();
  const segment = useSegments();
  const isBatchDetailsPage = segment[segment.length - 1] === "[batchDetails]";
  const { selectedBatch, isLoading } = useBatchStore();
  return (
    selectedBatch && (
      <View className="flex-1">
        <BackHeader />
        <View className="relative flex-row items-center gap-3 px-5 py-5 bg-green-700/70">
          <Image
            source={require("@/assets/images/teacher.jpg")}
            className="rounded-full size-36 aspect-square"
          />

          {/* Edit Button */}
          {isBatchDetailsPage && (
            <Pressable className="absolute p-2 bg-blue-500 rounded-full right-5 bottom-2">
              <Ionicons name="pencil-outline" size={24} color="white" />
            </Pressable>
          )}
          <View className="gap-1.5">
            <Text className="text-3xl font-bold text-white">
              {selectedBatch.name}
            </Text>
            <Text className="text-2xl font-bold text-white">
              ({selectedBatch.Organization.name})
            </Text>
            <Text className="text-xl font-medium text-white">
              Joining Code:{" "}
              <Text className="text-2xl font-black">
                {selectedBatch.batchJoiningCode}
              </Text>
            </Text>
            <Text className="text-lg font-medium text-white">
              Students:{" "}
              <Text className="text-xl font-extrabold">
                {selectedBatch.studentCount}
              </Text>
            </Text>
          </View>
        </View>
        {isBatchDetailsPage && (
          <TouchableOpacity
            className="flex-row items-center justify-center py-3 my-1 bg-blue-200"
            onPress={() => router.push("/teacher/markAttendance")}
          >
            <Text className="text-xl font-bold text-gray-700">
              Mark Attendance for this batch
            </Text>
          </TouchableOpacity>
        )}
        {/* Students List */}
        {isBatchDetailsPage ? (
          isLoading ? (
            <LoadingSection />
          ) : (
            <BatchStudentList />
          )
        ) : isLoading ? (
          <LoadingSection />
        ) : (
          <AttendanceList />
        )}
      </View>
    )
  );
};

export default BatchDetailsPage;

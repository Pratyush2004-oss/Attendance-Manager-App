import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { useAttendanceStore } from "@/store/attendance.store";
import { Ionicons } from "@expo/vector-icons";
import { RecordType } from "@/types";
import ChangeAttendanceStatusModal from "./ChangeAttendanceStatusModal";

const AttencanceTableForTeacher = () => {
  const { attendaceOfAllStudents } = useAttendanceStore();
  const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);

  // get color for the status
  const colorPallet = (status: "present" | "absent" | "leave") => {
    if (status === "present") {
      return "text-green-600";
    } else if (status === "absent") {
      return "text-red-500";
    } else {
      return "text-yellow-600";
    }
  };
  return (
    <>
      <FlatList
        data={attendaceOfAllStudents?.records}
        keyExtractor={(item) => item.studentId._id}
        ListHeaderComponent={() => (
          <View className="">
            <View className="px-5 my-3">
              <Text className="text-3xl font-bold">Attendance Table</Text>
            </View>
            <View className="flex-row w-full gap-1 bg-gray-400 border-b-2 border-white">
              <View className="w-12 py-3 pl-4">
                <Text className="text-lg font-bold">Sr.</Text>
              </View>
              <View className="w-1/2 px-4 py-3 border-l-2 border-white">
                <Text className="text-xl font-bold">Name</Text>
              </View>
              <View className="px-4 py-3 border-l-2 border-white ">
                <Text className="text-xl font-bold">Status</Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View className="flex-row w-full gap-1 border-b border-white bg-gray-400/50">
            <View className="w-12 py-3 pl-4">
              <Text className="px-2 text-lg font-bold">{index + 1}</Text>
            </View>
            <View className="w-1/2 px-4 py-3 border-l-2 border-white">
              <Text className="text-xl font-bold">{item.studentId.name}</Text>
            </View>
            <View className="flex-row items-center justify-between flex-1 px-4 py-3 border-l-2 border-white">
              <Text
                className={`text-2xl font-black ${colorPallet(item.status)}`}
              >
                {item.status.charAt(0).toUpperCase()}
              </Text>
              <Pressable onPress={() => setSelectedRecord(item)}>
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={20}
                  color="green"
                />
              </Pressable>
            </View>
          </View>
        )}
      />
      {selectedRecord && <ChangeAttendanceStatusModal selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} />}
    </>
  );
};

export default AttencanceTableForTeacher;

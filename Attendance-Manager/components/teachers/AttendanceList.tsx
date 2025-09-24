import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useBatchStore } from "@/store/batch.store";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MarkAttendaneInputType } from "@/types";
import { useAttendanceStore } from "@/store/attendance.store";
import { useUserStore } from "@/store/userStore";

const AttendanceList = () => {
  const { batchStudentList, selectedBatch } = useBatchStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [input, setInput] = useState<MarkAttendaneInputType>({
    batchId: selectedBatch?._id || "",
    date: new Date(),
    records: [],
  });
  const { markAttendace, isLoading } = useAttendanceStore();
  const { token } = useUserStore();

  // add or change record of the attendance
  const handleAddRecord = (
    studentId: string,
    status: "present" | "absent" | "leave"
  ) => {
    // check if the studentId is there but with different status
    if (
      input.records.some(
        (rec) => rec.studentId === studentId && rec.status !== status
      )
    ) {
      setInput((prev) => {
        const updatedRecords = prev.records.map((rec) => {
          if (rec.studentId === studentId) {
            return { ...rec, status: status };
          }
          return rec;
        });
        return { ...prev, records: updatedRecords };
      });
    } else if (
      input.records.some(
        (rec) => rec.studentId === studentId && rec.status === status
      )
    ) {
      // Student already exists with the same status, do nothing
    } else {
      setInput((prev) => ({
        ...prev,
        records: [...prev.records, { studentId, status }],
      }));
    }
  };

  // check the status of the student in the UI
  const checkStatus = (
    studentId: string,
    status: "present" | "absent" | "leave"
  ) => {
    return input.records.some(
      (rec) => rec.studentId === studentId && rec.status === status
    );
  };

  // handleSubmit the attendance
  const handleSubmitAttendance = async () => {
    if (input.records.length !== batchStudentList.length) {
      return alert("Please mark attendance for all students");
    }
    await markAttendace(input, token as string).then((res) => {
      if (res)
        Alert.alert("Success", "Attendance marked successfully", [
          {
            text: "OK",
            onPress: () => {
              setInput({
                ...input,
                records: [],
              });
            },
          },
        ]);
    });
  };

  return (
    <View className="flex-1 bg-gray-200">
      <FlatList
        data={batchStudentList}
        contentContainerStyle={{ paddingBottom: 10 }}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <View className="flex-row items-center justify-between px-5 py-2 bg-blue-200">
            <Text className="text-2xl font-semibold text-gray-900/70">
              Mark Attendance
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-1 px-5 py-1 bg-blue-400 rounded-xl"
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={16} color="white" />
              <Text className="text-lg font-normal text-white">
                {input.date.toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={input.date}
                mode="date"
                display={"spinner"}
                maximumDate={new Date()}
                onChange={(_, date) => {
                  setShowDatePicker(false);
                  if (date) setInput((prev) => ({ ...prev, date: date }));
                }}
              />
            )}
          </View>
        )}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center justify-between px-4 bg-gray-200 border-b-2 border-gray-500">
            <View className="flex-row items-center gap-2 py-2">
              <Text className="text-lg">{index + 1}</Text>
              <Text className="text-lg">{item.name}</Text>
            </View>
            <View className="flex-row gap-3 px-2 py-2 border-l-2 border-gray-500">
              <Pressable
                className={`py-2 px-4  ${checkStatus(item._id, "present") && "bg-green-600/70 border-white"} rounded-full flex-row items-center gap-1 border `}
                onPress={() => handleAddRecord(item._id, "present")}
              >
                <Text
                  className={`text-lg ${checkStatus(item._id, "present") && "text-white"}`}
                >
                  P
                </Text>
              </Pressable>
              <Pressable
                className={`px-4 py-2 ${checkStatus(item._id, "leave") && "bg-yellow-600 border-white"} rounded-full flex-row items-center gap-1 border `}
                onPress={() => handleAddRecord(item._id, "leave")}
              >
                <Text
                  className={`text-lg ${checkStatus(item._id, "leave") && "text-white"}`}
                >
                  L
                </Text>
              </Pressable>
              <Pressable
                className={`px-4 py-2 ${checkStatus(item._id, "absent") && "bg-red-400 border-white"} rounded-full flex-row items-center gap-1 border`}
                onPress={() => handleAddRecord(item._id, "absent")}
              >
                <Text
                  className={`text-lg ${checkStatus(item._id, "absent") && "text-white"}`}
                >
                  A
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        disabled={isLoading}
        className="flex-row items-center justify-center px-5 py-2 bg-blue-600/70 disabled:bg-blue-200"
        onPress={handleSubmitAttendance}
      >
        <Text
          className="text-2xl font-semibold text-white"
          onPress={handleSubmitAttendance}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AttendanceList;

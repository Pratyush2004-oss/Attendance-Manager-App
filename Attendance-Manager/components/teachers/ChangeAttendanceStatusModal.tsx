import { useAttendanceStore } from "@/store/attendance.store";
import { useUserStore } from "@/store/userStore";
import { RecordType, updateStudentAttendanceInputType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

const ChangeAttendanceStatusModal = ({
  selectedRecord,
  setSelectedRecord,
}: {
  selectedRecord: RecordType;
  setSelectedRecord: React.Dispatch<React.SetStateAction<RecordType | null>>;
}) => {
  const { updateStatusInput, updateStudentAttendanceStatus } =
    useAttendanceStore();
  const { token } = useUserStore();
  const [input, setInput] = useState<updateStudentAttendanceInputType>({
    batchId: updateStatusInput?.batchId as string,
    date: updateStatusInput?.date as Date,
    studentId: selectedRecord.studentId._id,
    status: selectedRecord.status,
  });
  const [isLoading, setisLoading] = useState(false);
  const colorPallet = () => {
    if (selectedRecord.status === "present") {
      return "green-600";
    } else if (selectedRecord.status === "absent") {
      return "red-500";
    } else {
      return "yellow-500";
    }
  };

  //   function that changes the status of the student attendance
  const handleUpdateSatus = async (value: "present" | "absent" | "leave") => {
    setisLoading(true);
    try {
      if (input.status === value) return;
      await updateStudentAttendanceStatus(
        { ...input, status: value },
        token as string
      )
        .then((res) => {
          if (res) {
            Alert.alert("Success", "Status updated successfully.", [
              {
                text: "OK",
                onPress: () => setSelectedRecord(null),
              },
            ]);
          }
        })
        .catch()
        .finally(() => setisLoading(false));
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Modal
      visible={selectedRecord !== null}
      onRequestClose={() => setSelectedRecord(null)}
      animationType="slide"
      presentationStyle="overFullScreen"
      className="flex-1"
      transparent
    >
      <View className="items-center justify-center flex-1 px-4 bg-gray-500/70">
        <View
          className={`relative items-center justify-around w-5/6 gap-4 p-5 bg-white/90 rounded-xl h-1/2`}
        >
          {/* Close button */}
          <Pressable
            className="absolute right-5 top-5"
            onPress={() => setSelectedRecord(null)}
          >
            <Ionicons name="close-circle-outline" size={25} color={"red"} />
          </Pressable>

          {/* Title */}
          <Text className="text-2xl font-bold">Update Status</Text>
          <Text className="text-xl font-bold">
            Date: {updateStatusInput?.date.toDateString()}
          </Text>
          <View className="flex-row items-center justify-around w-full py-5 rounded-lg bg-blue-400/70 ">
            <Text className="text-2xl text-white">
              {selectedRecord.studentId.name}
            </Text>
            <Text className={`text-xl font-black text-${colorPallet()}`}>
              {selectedRecord.status.charAt(0).toUpperCase() +
                selectedRecord.status.slice(1)}
            </Text>
          </View>

          {/* Status */}
          {isLoading ? (
            <ActivityIndicator size={"large"} color={"blue"} />
          ) : (
            <MapButtons
              selectedRecord={selectedRecord}
              handleUpdateSatus={handleUpdateSatus}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

// Buttons that change the date
const MapButtons = ({
  selectedRecord,
  handleUpdateSatus,
}: {
  selectedRecord: RecordType;
  handleUpdateSatus: (value: "present" | "absent" | "leave") => Promise<void>;
}) => {
  const StatusArray = [
    {
      name: "Present",
      value: "present",
      color: "green-500",
    },
    {
      name: "Leave",
      value: "leave",
      color: "yellow-600",
    },
    {
      name: "Absent",
      value: "absent",
      color: "red-500",
    },
  ];
  return (
    <View className="flex-row items-center w-full justify-evenly">
      {StatusArray.filter((item) => item.value !== selectedRecord.status).map(
        (item) => (
          <Pressable
            key={item.value}
            className={`flex-row items-center justify-between gap-2 px-4 py-2 bg-${item.color} rounded-lg`}
            onPress={() =>
              handleUpdateSatus(item.value as "present" | "absent" | "leave")
            }
          >
            <Text className={` font-bold  text-white`}>{item.name}</Text>
          </Pressable>
        )
      )}
    </View>
  );
};
export default ChangeAttendanceStatusModal;

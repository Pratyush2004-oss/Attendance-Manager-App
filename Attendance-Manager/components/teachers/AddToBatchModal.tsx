import {
  View,
  Modal,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Add_To_BatchInputType, Student } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useBatchStore } from "@/store/batch.store";
import useTeacherHook from "@/hooks/UseTeacherHook";

const AddToBatchModal = ({
  setshowModal,
  showModal,
}: {
  showModal: boolean;
  setshowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedBatch } = useBatchStore();
  const [StudentList, setStudentList] = useState<Student[]>([]);
  const [input, setInput] = useState<Add_To_BatchInputType>({
    batchId: selectedBatch?._id as string,
    studentId: [],
  });
  const handleCloseModal = () => {
    setshowModal(false);
    setInput({
      batchId: "",
      studentId: [],
    });
  };
  const { getStudentList } = useTeacherHook();
  const fetchStudents = async () => {
    if (!selectedBatch) return;
    await getStudentList(selectedBatch._id).then((res) => {
      setStudentList(res);
    });
  };

  useEffect(() => {
    StudentList.length === 0 && fetchStudents();
  }, [selectedBatch]);

  const handleSelectStudent = (studentId: string) => {
    if (input.studentId.includes(studentId)) {
      setInput((prevInput) => ({
        ...prevInput,
        studentId: prevInput.studentId.filter((id) => id !== studentId),
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        studentId: [...prevInput.studentId, studentId],
      }));
    }
  };
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setshowModal(false)}
      animationType="slide"
      presentationStyle="overFullScreen"
      className="flex-1"
      transparent
    >
      <View className="items-center justify-center flex-1 bg-gray-500/70">
        <View className="w-5/6 p-5 bg-white rounded-xl h-5/6">
          <Pressable
            className="absolute top-5 right-5"
            onPress={handleCloseModal}
          >
            <Ionicons name="close-circle-outline" size={25} color="red" />
          </Pressable>
          <View className="px-2 my-2">
            <Text className="text-3xl font-bold">Add To Batch</Text>
            <Text className="mt-5 text-3xl font-bold text-center">
              {selectedBatch?.name}
            </Text>
          </View>
          <View className="">
            <FlatList
              data={StudentList}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`flex-row items-center w-full gap-2 px-4 py-2 mt-2 rounded-lg ${input.studentId.includes(item._id) ? "bg-green-400" : "bg-gray-200"}`}
                  onPress={() => handleSelectStudent(item._id)}
                >
                  <Ionicons
                    name={
                      input.studentId.includes(item._id)
                        ? "checkmark-circle-sharp"
                        : "checkmark-circle-outline"
                    }
                    size={25}
                    color={
                      input.studentId.includes(item._id) ? "white" : "green"
                    }
                  />
                  <Text
                    className={`text-lg ${input.studentId.includes(item._id) && "text-white"} `}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddToBatchModal;

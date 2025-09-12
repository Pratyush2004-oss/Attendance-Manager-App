import useTeacherHook from "@/hooks/UseTeacherHook";
import { useBatchStore } from "@/store/batch.store";
import { useUserStore } from "@/store/userStore";
import { Add_To_BatchInputType, Student } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

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
    batchId: selectedBatch?._id || "",
    studentIds: [],
  });
  const [isLoading, setisLoading] = useState(false);
  const handleCloseModal = () => {
    setshowModal(false);
    setInput({
      batchId: "",
      studentIds: [],
    });
  };
  const { getStudentList } = useTeacherHook();
  const { addStudentsToBatch } = useBatchStore();
  const { token } = useUserStore();

  // fetch the students that are not in the batch
  const fetchStudents = async () => {
    if (!selectedBatch) return;
    await getStudentList(selectedBatch._id).then((res) => {
      setStudentList(res);
    });
  };

  useEffect(() => {
    StudentList.length === 0 && fetchStudents();
  }, [selectedBatch]);

  // seldct the students to join the batch
  const handleSelectStudent = (studentId: string) => {
    if (input.studentIds.includes(studentId)) {
      setInput((prevInput) => ({
        ...prevInput,
        studentIds: prevInput.studentIds.filter((id) => id !== studentId),
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        studentIds: [...prevInput.studentIds, studentId],
      }));
    }
  };

  // add the students to the batch
  const handleSubmit = async () => {
    try {
      setisLoading(true);
      await addStudentsToBatch(input, token as string).then((res) => {
        if (res) {
          handleCloseModal();
        }
      });
    } catch (error) {
    } finally {
      setisLoading(false);
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
          <View className="justify-between flex-1">
            <FlatList
              data={StudentList}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => (
                <View className="items-center justify-center flex-1">
                  <Text className="text-xl font-bold text-gray-500">
                    No Students found
                  </Text>
                </View>
              )}
              renderItem={({ item }) => (
                <Pressable
                  className={`flex-row items-center w-full gap-2 px-4 py-2 mt-2 rounded-lg ${input.studentIds.includes(item._id) ? "bg-green-400" : "bg-gray-200"}`}
                  onPress={() => handleSelectStudent(item._id)}
                >
                  <Ionicons
                    name={
                      input.studentIds.includes(item._id)
                        ? "checkmark-circle-sharp"
                        : "checkmark-circle-outline"
                    }
                    size={25}
                    color={
                      input.studentIds.includes(item._id) ? "white" : "green"
                    }
                  />
                  <Text
                    className={`text-xl ${input.studentIds.includes(item._id) && "text-white"} `}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
          <Pressable
            className="w-full px-5 py-3 mt-5 rounded-full bg-green-500/70"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text className="text-xl font-bold text-center text-white">
              {isLoading ? "Adding..." : "Add Students"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddToBatchModal;

import { View, Text, Modal, Image } from "react-native";
import React from "react";
import { Teacher } from "@/types";

const TeacherActionModal = ({
  selectedTeacher,
  setSelectedTeacher,
}: {
  selectedTeacher: Teacher;
  setSelectedTeacher: React.Dispatch<React.SetStateAction<Teacher | null>>;
}) => {
  return selectedTeacher && (
    <Modal
      visible={selectedTeacher !== null}
      onRequestClose={() => setSelectedTeacher(null)}
      animationType="slide"
      presentationStyle="overFullScreen"
      className="flex-1"
      transparent
    >
      <View className="items-center justify-center flex-1 p-4 bg-black/50">
        <View className="w-5/6 p-4 bg-white h-2/3 rounded-xl">
          <Image
            source={require("@/assets/images/teacher.jpg")}
            className="mx-auto my-3 rounded-full size-44 aspect-square"
          />
          <Text className="text-3xl font-bold text-center">
            {selectedTeacher.name}
          </Text>
          <Text className="text-xl font-bold text-center text-gray-500">
            {selectedTeacher.email}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default TeacherActionModal;

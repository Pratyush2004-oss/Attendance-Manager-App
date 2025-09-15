import { useOrganizationStore } from "@/store/Organization.store";
import { useUserStore } from "@/store/userStore";
import { Teacher } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  View
} from "react-native";

const TeacherActionModal = ({
  selectedTeacher,
  setSelectedTeacher,
}: {
  selectedTeacher: Teacher;
  setSelectedTeacher: React.Dispatch<React.SetStateAction<Teacher | null>>;
}) => {
  const [isLoading, setisLoading] = useState(false);
  const { deleteTeacherFromOrganization, verifyTeacher } =
    useOrganizationStore();
  const { token } = useUserStore();
  const handleVerify = async () => {
    try {
      setisLoading(true);
      await verifyTeacher(selectedTeacher._id, token as string);
      setSelectedTeacher(null);
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      await deleteTeacherFromOrganization(selectedTeacher._id, token as string);
      setSelectedTeacher(null);
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };
  return (
    selectedTeacher && (
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
            <Pressable
              className="absolute top-3 right-3"
              onPress={() => setSelectedTeacher(null)}
            >
              <Ionicons name="close-circle-outline" size={30} color="red" />
            </Pressable>
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

            <View className="flex-row justify-around p-3 my-auto">
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Pressable
                    className="px-5 py-2 rounded-full bg-green-500/70"
                    disabled={selectedTeacher.isTeacherVerified}
                    onPress={handleVerify}
                  >
                    <Text className="text-xl text-white">
                      {selectedTeacher.isTeacherVerified
                        ? "Verified"
                        : "Verify"}
                    </Text>
                  </Pressable>
                  <Pressable
                    className="px-5 py-2 rounded-full bg-red-500/70"
                    onPress={handleRemove}
                  >
                    <Text className="text-xl text-white">Remove</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    )
  );
};

export default TeacherActionModal;

import useTeacherHook from "@/hooks/UseTeacherHook";
import { useUserStore } from "@/store/userStore";
import { CreateBatchInputType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreateBatch = ({ refreshList }: { refreshList: () => Promise<void> }) => {
  const { user } = useUserStore();
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<CreateBatchInputType>({
    name: "",
    Organization: "",
  });
  const { createBatch } = useTeacherHook();
  const handleSelectOrganization = (itemValue: string) => {
    setInput({ ...input, Organization: itemValue });
  };

  const handleCloseModal = () => {
    setshowModal(false);
    setInput({
      name: "",
      Organization: "",
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await createBatch(input);
      if (res) {
        await refreshList();
        handleCloseModal();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="px-5 mt-5">
      <TouchableOpacity
        className="flex-row items-center justify-center px-5 py-3 rounded-full bg-blue-700/70 "
        onPress={() => setshowModal(true)}
      >
        <Ionicons
          className="mr-2"
          name="add-circle-outline"
          size={24}
          color="white"
        />
        <Text className="text-lg font-medium text-center text-white">
          Create Batch
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        onRequestClose={() => setshowModal(false)}
        animationType="slide"
        presentationStyle="overFullScreen"
        className="flex-1"
        transparent
      >
        <View className="items-center justify-center flex-1 bg-gray-500/70">
          <View className="items-center justify-center w-5/6 gap-3 p-5 bg-white rounded-xl">
            <Pressable
              className="absolute top-5 right-5"
              onPress={handleCloseModal}
            >
              <Ionicons name="close-circle-outline" size={25} color="red" />
            </Pressable>
            <Text className="text-2xl font-bold text-center text-blue-600">
              Create Batch
            </Text>
            {/* batch name */}
            <View className="w-full gap-2">
              <Text className="ml-3 text-xl font-bold text-black">
                Batch Name
              </Text>
              <TextInput
                placeholder="John Doe"
                className="w-full px-3 py-2 text-xl border border-black rounded-md bg-200"
                value={input.name}
                onChangeText={(text) => setInput({ ...input, name: text })}
              />
            </View>
            {/* Organization */}
            <View className="w-full gap-2">
              <Text className="ml-3 text-xl font-bold">Organization:</Text>
              <View className="w-full bg-white border rounded-lg">
                <Picker
                  selectedValue={""}
                  onValueChange={(itemValue) =>
                    handleSelectOrganization(itemValue)
                  }
                >
                  <Picker.Item label="Select Organization" value="" />
                  {user?.Organization.map((organization) => (
                    <Picker.Item
                      key={organization._id}
                      label={organization.name}
                      value={organization._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-center w-full px-5 py-3 mt-3 rounded-full bg-blue-700/70"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text className="text-lg font-medium text-center text-white">
                {isLoading ? (
                  <ActivityIndicator color={"white"} size={"small"} />
                ) : (
                  "Create Batch"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateBatch;

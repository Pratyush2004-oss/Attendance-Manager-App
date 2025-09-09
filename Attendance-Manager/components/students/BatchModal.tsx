import useStudentHook from "@/hooks/UseStudentHook";
import { AllBatchesType, JoinBatchInputType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OtpVerification from "../auth/OtpVerification";
import { useRouter } from "expo-router";

const BatchModal = ({
  selectedBatch,
  setSelectedBatch,
}: {
  selectedBatch: AllBatchesType;
  setSelectedBatch: React.Dispatch<React.SetStateAction<AllBatchesType | null>>;
}) => {
  const [input, setInput] = useState<JoinBatchInputType>({
    batchId: selectedBatch._id,
    batchJoiningCode: "",
  });
  const { joinBatch } = useStudentHook();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const handleOtpChange = (otp: string) => {
    setInput({ ...input, batchJoiningCode: otp });
  };

  const handleSubmit = async () => {
    try {
      setisLoading(true);
      const res = await joinBatch(input);
      if (res) {
        setInput({ batchId: "", batchJoiningCode: "" });
        router.replace("/(studentTab)/batches");
      }
    } catch (error) {
    } finally {
      setSelectedBatch(null);
      setisLoading(false);
    }
  };
  return (
    <Modal
      visible={selectedBatch !== null}
      onRequestClose={() => setSelectedBatch(null)}
      animationType="slide"
      presentationStyle="overFullScreen"
      className="flex-1"
      transparent
    >
      <View className="items-center justify-center flex-1 px-4 bg-gray-500/70">
        <View className="relative items-center justify-center w-full gap-4 p-5 bg-white rounded-xl">
          <Image
            className="border-4 rounded-full size-32 aspect-square"
            source={require("@/assets/images/student.jpeg")}
          />
          <Text className="text-3xl font-bold text-center">
            {selectedBatch.name}
          </Text>

          {/* Close button */}
          <Pressable
            className="absolute right-5 top-5"
            onPress={() => setSelectedBatch(null)}
          >
            <Ionicons name="close-circle-outline" size={25} color={"red"} />
          </Pressable>

          {/* Otp section for the students who are not the student of the batch */}
          <View className="flex-row items-center justify-center gap-2">
            {selectedBatch.isStudent ? (
              <View className="flex-row items-center justify-center my-4">
                <Text className="text-xl text-green-600">
                  You are already in the batch, want to Leave
                </Text>
              </View>
            ) : (
              <View className="items-center justify-center w-full my-4 rounded-xl">
                <Text className="text-sm text-center text-green-500">
                  You have to enter the Joining Code to join the batch
                </Text>
                <View className="p-2 my-2 bg-gray-200 rounded-xl">
                  <OtpVerification onOtpChange={handleOtpChange} />
                </View>
                <TouchableOpacity
                  className="w-full px-4 py-2 bg-blue-400 rounded-xl"
                  onPress={() => {}}
                >
                  <Text
                    className="text-lg text-center text-white"
                    onPress={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={"white"} size={"small"} />
                    ) : (
                      "Join Batch"
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BatchModal;

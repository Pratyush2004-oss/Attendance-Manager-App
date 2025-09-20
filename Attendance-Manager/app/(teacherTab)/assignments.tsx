import BatchPicker from "@/components/teachers/BatchPicker";
import FileUploadPage from "@/components/teachers/FileUploadPage";
import { useAssignmentStore } from "@/store/assignment.store";
import { useUserStore } from "@/store/userStore";
import { CreateAssignmentInputType } from "@/types";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const Assignments = () => {
  const [input, setInput] = useState<CreateAssignmentInputType>({
    batchIds: [],
    files: [],
  });
  const [isLoading, setisLoading] = useState(false);
  const { token } = useUserStore();
  const { createAssignment } = useAssignmentStore();
  const handleUpload = async () => {
    setisLoading(true);
    await createAssignment(input, token as string)
      .then((res) => {
        if (res) {
          setInput({ batchIds: [], files: [] });
        }
      })
      .catch()
      .finally(() => setisLoading(false));
  };

  return (
    <View className="flex-1">
      <BatchPicker setInput={setInput} input={input} />
      <FileUploadPage setInput={setInput} input={input} />
      <TouchableOpacity
        className="w-5/6 py-3 mx-auto mb-3 bg-blue-500/70 mt-7 rounded-xl disabled:bg-blue-400/50"
        disabled={
          isLoading || input.batchIds.length === 0 || input.files.length === 0
        }
        onPress={handleUpload}
      >
        <Text className="text-2xl font-bold text-center text-white">
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            "Upload"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Assignments;

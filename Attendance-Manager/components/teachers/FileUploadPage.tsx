import { CreateAssignmentInputType } from "@/types"; // Assuming this type is defined elsewhere
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerAsset } from "expo-document-picker";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FileUploadPage = ({
  input,
  setInput,
}: {
  input: CreateAssignmentInputType;
  setInput: React.Dispatch<React.SetStateAction<CreateAssignmentInputType>>;
}) => {
  // Select files to upload
  const onFilePick = async () => {
    // 2. Use DocumentPicker.getDocumentAsync to open the file picker
    // No manual permission request is needed; the picker handles it.
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ], // Allows picking any file type except videos
        multiple: true, // Allows multiple file selection
      });

      // 3. The result object structure is different now.
      // We check for `canceled: false` and the presence of an `assets` array.
      if (!result.canceled && result.assets) {
        setInput((prev) => ({
          ...prev,
          // The selected files are in the `assets` property
          files: [...prev.files, ...result.assets],
        }));
      }
    } catch (error) {
      // Optionally, show an alert to the user
    }
  };

  // The type for the file is now DocumentPickerAsset from the library
  const onDelete = (file: DocumentPickerAsset) => {
    setInput((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f.name !== file.name),
    }));
  };
  return (
    <View className="items-center justify-center flex-1">
      {/* 4. Added the onPress handler to the TouchableOpacity */}
      <TouchableOpacity
        className="items-center justify-center w-5/6 bg-white border-2 border-dashed h-1/4 rounded-xl border-blue-500/70"
        onPress={onFilePick}
      >
        <Ionicons
          name="file-tray-full"
          size={72}
          color="rgb(96 165 250 / 0.8)"
        />
        <Text className="mt-2 text-2xl font-bold text-blue-500/80">
          Tap to Select Files
        </Text>
      </TouchableOpacity>

      {/* Display the list of selected files */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-5/6 mt-7 rounded-xl h-1/2"
      >
        {input.files.map((file, index) => (
          <View
            key={index}
            className="flex-row items-center px-3 py-2 mb-3 rounded-xl"
          >
            <Ionicons name="document-text-outline" size={24} color="#4B5563" />
            <Text className="flex-1 mx-3 text-sm " numberOfLines={1}>
              {file.name}
            </Text>
            <Pressable
              className="bg-red-500 rounded-full"
              onPress={() => onDelete(file as DocumentPickerAsset)}
            >
              <Ionicons name="close-circle-outline" size={18} color="white" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// It's better practice to use StyleSheet for styling
const styles = StyleSheet.create({
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  fileName: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    color: "#1F2937",
  },
});

export default FileUploadPage;

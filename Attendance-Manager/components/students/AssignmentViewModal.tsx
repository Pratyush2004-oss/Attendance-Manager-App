import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
// --- Import the required modules ---
import { File, Directory, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
const AssignmentViewModal = ({
  selectedFile,
  setSelectedFile,
}: {
  selectedFile: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  // --- IMPLEMENTED DOWNLOAD FUNCTIONALITY ---
  const handleDownloadFile = async () => {
    const destination = new Directory(Paths.cache, "downloads");
    try {
      setIsDownloading(true);
      destination.create();
      const output = await File.downloadFileAsync(selectedFile, destination);
      await MediaLibrary.saveToLibraryAsync(output.uri);
      Alert.alert("Success", "File downloaded successfully.");
    } catch (error) {
      Alert.alert("Error", "Something went wrong while downloading the file.");
    } finally {
      setIsDownloading(false);
    }
  };
  const handleOpenPDF = async () => {
    const supported = await Linking.canOpenURL(selectedFile);
    if (supported) {
      await Linking.openURL(selectedFile);
    } else {
      Alert.alert("Error", "Don't know how to open this file.");
    }
  };
  return (
    <Modal
      visible={selectedFile !== null}
      onRequestClose={() => setSelectedFile(null)}
      animationType="slide"
      presentationStyle="overFullScreen"
      className="flex-1"
      transparent
    >
      <View className="items-center justify-center flex-1 px-4 bg-gray-500/70">
        <View className="relative items-center justify-center w-full gap-4 p-5 bg-white rounded-xl h-5/6">
          <Pressable
            className="absolute z-20 rounded-full top-5 right-5"
            onPress={() => setSelectedFile(null)}
          >
            <Ionicons name="close-circle-outline" color={"red"} size={20} />
          </Pressable>
          {/* document Veiw */}
          <View className="w-full h-5/6 rounded-xl">
            {selectedFile?.endsWith("jpg") ||
            selectedFile?.endsWith("png") ||
            selectedFile?.endsWith("jpeg") ? (
              <Image
                source={{ uri: selectedFile }}
                resizeMode="contain"
                className="object-contain w-full h-full rounded-xl"
              />
            ) : (
              <View className="flex-1 bg-red-500 ">
                <PdfVeiwer selectedFile={selectedFile} />
                <Pressable
                  onPress={handleOpenPDF}
                  className="absolute z-20 p-2 bg-blue-300 rounded-full top-2 right-5"
                >
                  <Text>Open PDF</Text>
                </Pressable>
              </View>
            )}
          </View>
          <Pressable
            className="flex-row items-center justify-center w-full gap-2 py-3 bg-blue-400 rounded-xl"
            onPress={handleDownloadFile}
          >
            {isDownloading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-xl text-white">Download</Text>
                <Ionicons name="download-outline" color={"white"} size={20} />
              </>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const PdfVeiwer = ({ selectedFile }: { selectedFile: string }) => {
  const pdfUrl =
    Platform.OS === "android"
      ? "https://docs.google.com/gview?embedded=true&url=" +
        encodeURIComponent(selectedFile)
      : selectedFile;
  return (
    <WebView
      source={{ uri: pdfUrl }}
      className="flex-1"
      renderLoading={() => (
        <Text className="text-xl font-bold">Loading PDF...</Text>
      )}
      originWhitelist={["*"]}
    />
  );
};

export default AssignmentViewModal;

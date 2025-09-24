import { View, Text, FlatList, Image, Pressable, Alert } from "react-native";
import React from "react";
import { useAssignmentStore } from "@/store/assignment.store";
import { Ionicons } from "@expo/vector-icons";
import BackHeader from "../shared/BackHeader";
import { useBatchStore } from "@/store/batch.store";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";

const BatchAssignmentList = () => {
  const { leaveBatch } = useBatchStore();
  const { token } = useUserStore();
  const { selectedBatch } = useAssignmentStore();
  const router = useRouter();
  const handleLeaveBatch = async () => {
    Alert.alert(
      "Leave Batch",
      "If you leave the batch, your attendance records will be deleted. Are You sure you want to leave?",
      [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: async () => {
            // leave batch
            const res = await leaveBatch(selectedBatch, token as string);
            if (res) {
              router.push("/(studentTab)/batches");
            }
          },
        },
      ]
    );
  };
  const { batchAssignment } = useAssignmentStore();
  return (
    <View>
      <BackHeader />
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={batchAssignment}
        ListHeaderComponent={() => (
          <View className="flex-row items-center justify-between px-5 my-3">
            <Text className="text-3xl font-bold">Batch Assignments</Text>
            <Pressable
              className="p-1 bg-red-500 rounded-xl"
              onPress={handleLeaveBatch}
            >
              <Ionicons name="exit-outline" size={25} color="white" />
            </Pressable>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="px-5 py-3 mx-4 mt-2 rounded-2xl bg-blue-300/40">
            <Text className="text-xl font-semibold">
              {new Date(item.createdAt).toDateString()}
            </Text>
            <FlatList
              data={item.homework}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="gap-2 px-5 py-4 mx-2 rounded-xl bg-blue-500/70">
                  {item.endsWith("jpg") ||
                  item.endsWith("png") ||
                  item.endsWith("jpeg") ? (
                    <Image
                      source={{ uri: item }}
                      className="size-32 rounded-xl"
                    />
                  ) : (
                    <Ionicons
                      name={"document-attach-outline"}
                      size={128}
                      color={"white"}
                    />
                  )}
                  <Text className="text-center text-white">
                    {item.endsWith("jpg") ||
                    item.endsWith("png") ||
                    item.endsWith("jpeg")
                      ? "IMAGE"
                      : item.endsWith("pdf")
                        ? "PDF"
                        : "DOC"}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default BatchAssignmentList;

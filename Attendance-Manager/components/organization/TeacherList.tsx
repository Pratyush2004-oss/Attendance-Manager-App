import { useOrganizationStore } from "@/store/Organization.store";
import { Teacher } from "@/types";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import TeacherActionModal from "./TeacherActionModal";

const TeacherList = () => {
  const { teachers } = useOrganizationStore();
  const [selectedTeacher, setselectedTeacher] = useState<Teacher | null>(null);
  return (
    <>
      <FlatList
        className="flex-1 px-4 bg-gray-100"
        contentContainerStyle={{ paddingBottom: 20 }}
        data={teachers}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-3xl font-bold">Teachers</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center flex-1">
            <Text>No Teachers found</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => setselectedTeacher(item)}
            className={`flex-row items-center justify-between w-full px-5 py-3 mt-3 ${item.isTeacherVerified ? "bg-green-500/30" : "bg-red-500/30"} rounded-xl`}
          >
            <View>
              <Text className="text-3xl font-bold text-black">{item.name}</Text>
              <Text className="text-xl font-semibold text-gray-500">
                {item.email}
              </Text>
            </View>
            <Text>{item.isTeacherVerified ? "Verified" : "not verified"}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        ListFooterComponent={() => (
          <View className="flex-row items-center justify-center my-2">
            <Text className="text-lg text-gray-500">
              Press and hold to take actions{" "}
            </Text>
          </View>
        )}
      />
      {selectedTeacher && (
        <TeacherActionModal
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setselectedTeacher}
        />
      )}
    </>
  );
};

export default TeacherList;

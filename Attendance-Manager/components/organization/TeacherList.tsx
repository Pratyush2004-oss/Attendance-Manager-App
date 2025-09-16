import { useOrganizationStore } from "@/store/Organization.store";
import { Teacher } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, Text, Pressable, View } from "react-native";
import TeacherActionModal from "./TeacherActionModal";
import LoadingSection from "../shared/LoadingSection";
import { useUserStore } from "@/store/userStore";

const TeacherList = () => {
  const { teachers, isLoading, getAllTeachers, selectedOrganization } =
    useOrganizationStore();
  const { token } = useUserStore();
  const [selectedTeacher, setselectedTeacher] = useState<Teacher | null>(null);
  const fetchTeachers = async () => {
    await getAllTeachers(selectedOrganization?._id as string, token as string);
  };
  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSection />
      ) : (
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
            <Pressable
              onLongPress={() => setselectedTeacher(item)}
              className={`flex-row items-center justify-between w-full px-5 py-3 mt-3 ${item.organization.isTeacherVerified ? "bg-green-500/30" : "bg-red-500/30"} rounded-xl`}
            >
              <View>
                <Text className="text-3xl font-bold text-black">
                  {item.name}
                </Text>
                <Text className="text-xl font-semibold text-gray-500">
                  {item.email}
                </Text>
              </View>
              <Text>
                {item.organization.isTeacherVerified
                  ? "Verified"
                  : "not verified"}
              </Text>
            </Pressable>
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
      )}
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

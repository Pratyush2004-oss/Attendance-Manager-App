import TeacherList from "@/components/organization/TeacherList";
import BackHeader from "@/components/shared/BackHeader";
import { useOrganizationStore } from "@/store/Organization.store";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const OrganizationAdmin = () => {
  const { getAllTeachers, teachers, isLoading } = useOrganizationStore();
  const { token } = useUserStore();
  const fetchTeachers = async () => {
    await getAllTeachers(token as string);
  };
  useEffect(() => {
    teachers.length === 0 && fetchTeachers();
  }, []);
  return (
    <View className="flex-1">
      <BackHeader />
      {isLoading ? (
        <View className="items-center justify-center flex-1">
          <Text>Loading...</Text>
        </View>
      ) : (
        <TeacherList />
      )}
    </View>
  );
};

export default OrganizationAdmin;

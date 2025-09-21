import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAssignmentStore } from "@/store/assignment.store";
import { useUserStore } from "@/store/userStore";
import AssignmentList from "@/components/students/AssignmentList";

const Assignments = () => {
  const { getTodaysAssignment } = useAssignmentStore();
  const { token } = useUserStore();

  useEffect(() => {
    getTodaysAssignment(token as string);
  }, []);
  return (
    <View>
      <AssignmentList />
    </View>
  );
};

export default Assignments;

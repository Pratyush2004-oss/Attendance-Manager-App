import AssignmentList from "@/components/students/AssignmentList";
import { useAssignmentStore } from "@/store/assignment.store";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { View } from "react-native";

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

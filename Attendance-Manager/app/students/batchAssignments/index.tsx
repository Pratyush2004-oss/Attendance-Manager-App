import BatchAssignmentList from "@/components/students/BatchAssignmentList";
import { useAssignmentStore } from "@/store/assignment.store";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const BatchAssignmentPage = () => {
  const { selectedBatch, getBatchAssignment } = useAssignmentStore();
  const { token } = useUserStore();
  useEffect(() => {
    selectedBatch && getBatchAssignment(token as string);
  }, [selectedBatch]);
  return (
    <View>
      <BatchAssignmentList />
    </View>
  );
};

export default BatchAssignmentPage;

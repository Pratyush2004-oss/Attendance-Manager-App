import BatchDetailsPage from "@/components/teachers/BatchDetailsPage";
import { useBatchStore } from "@/store/batch.store";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";

const BatchDetails = () => {
  const { selectedBatch } = useBatchStore();
  const { token } = useUserStore();
  const { getBatchStudents } = useBatchStore();
  const fetchStudents = async () => {
    if (!selectedBatch) return;
    await getBatchStudents(selectedBatch._id, token as string);
  };
  useEffect(() => {
    fetchStudents();
  }, [selectedBatch]);
  return selectedBatch && <BatchDetailsPage />;
};

export default BatchDetails;

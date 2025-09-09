import BatchDetailsPage from "@/components/teachers/BatchDetailsPage";
import useTeacherHook from "@/hooks/UseTeacherHook";
import { useBatchStore } from "@/store/batch.store";
import { StudentType } from "@/types";
import React, { useEffect, useState } from "react";

const BatchDetails = () => {
  const { selectedBatch } = useBatchStore();
  const [StudentList, setStudentList] = useState<StudentType[]>([]);
  const { getBatchDetails } = useTeacherHook();
  const fetchStudents = async () => {
    if (!selectedBatch) return;
    await getBatchDetails(selectedBatch._id).then((res) => {
      setStudentList(res.students);
    });
  };
  useEffect(() => {
    selectedBatch && selectedBatch.studentCount !== 0 && fetchStudents();
  }, [selectedBatch]);
  return selectedBatch && <BatchDetailsPage StudentList={StudentList} />;
};

export default BatchDetails;

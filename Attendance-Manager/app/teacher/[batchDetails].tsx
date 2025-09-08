import BatchDetailsPage from "@/components/teachers/BatchDetailsPage";
import useTeacherHook from "@/hooks/UseTeacherHook";
import { batchParamsType, StudentType } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

const BatchDetails = () => {
  const params = useLocalSearchParams<batchParamsType>();
  const [StudentList, setStudentList] = useState<StudentType[]>([]);
  const { getBatchDetails } = useTeacherHook();
  const fetchStudents = async () => {
    await getBatchDetails(params._id).then((res) => {
      setStudentList(res.students);
    });
  };
  useEffect(() => {
    params.studentCount !== "0" && fetchStudents();
  }, [params._id]);
  return (
    params && <BatchDetailsPage StudentList={StudentList} params={params} />
  );
};

export default BatchDetails;

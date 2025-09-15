import { batchApis } from "@/assets/constants";
import {
  Add_To_BatchInputType,
  BatchForTeacherType,
  removeStudentFromBatchInputType,
  StudentType,
} from "@/types";
import axios from "axios";
import { Alert } from "react-native";
import { create } from "zustand";

interface BatchStoreInterface {
  selectedBatch: BatchForTeacherType | null;
  setSelectedBatch: (batch: BatchForTeacherType) => void;

  batchStudentList: StudentType[];
  getBatchStudents: (batchId: string, token: string) => Promise<void>;
  isLoading: boolean;
  addStudentsToBatch: (
    input: Add_To_BatchInputType,
    token: string
  ) => Promise<boolean>;
  removeStudentFromBatch: (
    input: removeStudentFromBatchInputType,
    token: string
  ) => Promise<boolean>;
}

export const useBatchStore = create<BatchStoreInterface>((set, get) => ({
  selectedBatch: null,
  setSelectedBatch: (batch) => set({ selectedBatch: batch }),
  batchStudentList: [],
  isLoading: false,
  // get all students of the batch
  getBatchStudents: async (batchId, token) => {
    try {
      set({ isLoading: true, batchStudentList: [] });
      const batchDetails = await axios.get(
        batchApis.get_Single_Batch_for_Teacher.replace(":batchId", batchId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (batchDetails.status === 400) throw new Error(batchDetails.data.error);
      set({ batchStudentList: batchDetails.data.students });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
  // add students to batch
  addStudentsToBatch: async (input, token) => {
    try {
      if (
        !input.batchId ||
        !input.studentIds ||
        input.studentIds.length === 0
      ) {
        Alert.alert("Error", "Please add atlest one student.");
        return false;
      }
      const response = await axios.post(
        batchApis.add_students_to_batch,
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 400) throw new Error(response.data.error);
      Alert.alert("Success", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            get().getBatchStudents(input.batchId, token);
            return true;
          },
        },
      ]);
      return false;
    } catch (error: any) {
      if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
      return false;
    }
  },
  removeStudentFromBatch: async (input, token) => {
    if (!input.batchId || !input.studentId) {
      Alert.alert("Error", "Please add atlest one student.");
      return false;
    }
    try {
      const response = await axios.post(
        batchApis.delete_Student_from_Batch,
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 400) throw new Error(response.data.error);
      Alert.alert("Success", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            get().getBatchStudents(input.batchId, token);
            return true;
          },
        },
      ]);
      return false;
    } catch (error: any) {
      if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
      return false;
    }
  },
}));

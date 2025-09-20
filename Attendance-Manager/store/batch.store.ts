import { batchApis } from "@/assets/constants";
import {
  Add_To_BatchInputType,
  BatchForStudentType,
  BatchForTeacherType,
  CreateBatchInputType,
  JoinBatchInputType,
  removeStudentFromBatchInputType,
  StudentType,
} from "@/types";
import axios from "axios";
import { Alert } from "react-native";
import { create } from "zustand";

interface BatchStoreInterface {
  selectedBatch: BatchForTeacherType | null;
  setSelectedBatch: (batch: BatchForTeacherType) => void;
  batchListForTeacher: BatchForTeacherType[];
  batchListforStudents: BatchForStudentType[];
  batchStudentList: StudentType[];
  createBatch: (input: CreateBatchInputType, token: string) => Promise<boolean>;
  getBatchListForStudent: (token: string) => Promise<void>;
  getBatchListForTeacher: (token: string) => Promise<void>;
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
  joinBatch: (input: JoinBatchInputType, token: string) => Promise<boolean>;
  resetBatchRecords: () => void;
}

export const useBatchStore = create<BatchStoreInterface>((set, get) => ({
  selectedBatch: null,
  batchListForTeacher: [],
  batchStudentList: [],
  isLoading: false,
  batchListforStudents: [],
  // set selected batch
  setSelectedBatch: (batch) => set({ selectedBatch: batch }),
  // get batchList for student
  getBatchListForStudent: async (token) => {
    try {
      const batches = await axios.get(batchApis.get_batches_for_Student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (batches.status === 400) throw new Error(batches.data.error);
      set({ batchListforStudents: batches.data.batchDetails });
    } catch (error) {}
  },
  // get batchList for teacher
  getBatchListForTeacher: async (token) => {
    try {
      const batches = await axios.get(batchApis.get_Batches_for_Teacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (batches.status === 400) throw new Error(batches.data.error);
      set({ batchListForTeacher: batches.data.batchDetails });
    } catch (error) {}
  },
  // create batch
  createBatch: async (input, token) => {
    if (!(input.name && input.Organization)) {
      Alert.alert("Error", "Please fill all the fields.");
      return false;
    }

    try {
      const response = await axios.post(batchApis.createBatch, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 400) throw new Error(response.data.error);
      Alert.alert("Success", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            get().getBatchListForTeacher(token);
            return true;
          },
        },
      ]);
      return false;
    } catch (error: any) {
      if (error.isAxiosError) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Error", error.message);
      }
      return false;
    }
  },
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
  // remove student from batch
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
  // join batch
  joinBatch: async (input, token) => {
    if (!input.batchId || !input.batchJoiningCode) {
      Alert.alert("Error", "Please fill all the fields.");
      return false;
    }
    try {
      const response = await axios.post(batchApis.add_to_batch, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 400) throw new Error(response.data.error);
      Alert.alert("Success", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            get().getBatchListForStudent(token);
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
  // reset All batch Records
  resetBatchRecords: () =>
    set({
      batchListforStudents: [],
      batchStudentList: [],
      batchListForTeacher: [],
      selectedBatch: null,
      isLoading: false,
    }),
}));

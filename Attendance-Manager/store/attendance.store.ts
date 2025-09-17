import { AttendanceApis } from "@/assets/constants";
import {
  AttendanceForStudentType,
  AttendanceForTeacherType,
  MarkAttendaneInputType,
  updateStudentAttendanceInputType,
} from "@/types";
import axios from "axios";
import { Alert } from "react-native";
import { create } from "zustand";

interface AttendanceStoreInterface {
  isLoading: boolean;
  monthYear: {
    monthString: string;
    month: string;
    year: string;
  };
  updateStatusInput: { date: Date; batchId: string } | null;
  setMonthYear: (monthYear: {
    monthString: string;
    month: string;
    year: string;
  }) => void;
  attendanceForStudent: AttendanceForStudentType[] | null;
  attendaceOfAllStudents: AttendanceForTeacherType | null;
  markAttendace: (
    input: MarkAttendaneInputType,
    token: string
  ) => Promise<boolean>;
  getAttendanceforStudent: (month: string, token: string) => Promise<void>;
  getAttendanceofAllStudents: (
    batchId: string,
    date: Date,
    token: string
  ) => Promise<boolean>;
  updateStudentAttendanceStatus: (
    input: updateStudentAttendanceInputType,
    token: string
  ) => Promise<boolean>;
}

export const useAttendanceStore = create<AttendanceStoreInterface>(
  (set, get) => ({
    isLoading: false,
    monthYear: {
      monthString: "",
      month: "",
      year: "",
    },
    attendaceOfAllStudents: null,
    setMonthYear: (monthYear) => set({ monthYear }),
    attendanceForStudent: null,
    updateStatusInput: null,
    // mark attendance
    markAttendace: async (input, token) => {
      set({ isLoading: true });
      try {
        const response = await axios.post(
          AttendanceApis.markAttendace,
          { ...input, date: input.date.toISOString().split("T")[0] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) throw new Error(response.data.error);
        return true;
      } catch (error: any) {
        if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
        else Alert.alert("Error", error.message);
        return false;
      } finally {
        set({ isLoading: false });
      }
    },
    // get attendance for student
    getAttendanceforStudent: async (month, token) => {
      set({ isLoading: true, attendanceForStudent: null });
      try {
        const response = await axios.get(
          AttendanceApis.getAttendanceForStudents.replace(":month", month),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) throw new Error(response.data.error);
        set({ attendanceForStudent: response.data.attendance });
      } catch (error) {
      } finally {
        set({ isLoading: false });
      }
    },
    // get attendance of all students for teacher
    getAttendanceofAllStudents: async (batchId, date, token) => {
      try {
        if (!batchId || !date) {
          Alert.alert("Error", "BatchId and Date are required.");
          return false;
        }
        if (date.getDay() === 0) {
          Alert.alert("Error", "Sunday is a holiday.");
          return false;
        }
        set({
          isLoading: true,
          attendaceOfAllStudents: null,
          updateStatusInput: {
            date: date,
            batchId,
          },
        });
        const response = await axios.post(
          AttendanceApis.getAttendanceOfAllStudents,
          { batchId, date: date.toISOString().split("T")[0] },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 400) throw new Error(response.data.error);
        set({ attendaceOfAllStudents: response.data.attendance });
        return true;
      } catch (error: any) {
        if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
        else Alert.alert("Error", error.message);
        return false;
      } finally {
        set({ isLoading: false });
      }
    },
    // update the status of the student in the existing attendance record
    updateStudentAttendanceStatus: async (input, token) => {
      try {
        if (!(input.status && input.studentId && input.date && input.batchId)) {
          Alert.alert("Error", "Please fill all the fields.");
          return false;
        }

        const response = await axios.put(
          AttendanceApis.updateStatusofStudentInAttendance,
          { ...input, date: input.date.toISOString().split("T")[0] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) throw new Error(response.data.error);
        get().getAttendanceofAllStudents(input.batchId, input.date, token);
        return true;
      } catch (error: any) {
        if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
        else Alert.alert("Error", error.message);
        return false;
      }
    },
  })
);

import { AttendanceApis } from "@/assets/constants";
import { AttendanceForStudentType, MarkAttendaneInputType } from "@/types";
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
  setMonthYear: (monthYear: {
    monthString: string;
    month: string;
    year: string;
  }) => void;
  attendanceForStudent: AttendanceForStudentType[] | null;
  markAttendace: (
    input: MarkAttendaneInputType,
    token: string
  ) => Promise<boolean>;
  getAttendanceforStudent: (month: string, token: string) => Promise<void>;
}

export const useAttendanceStore = create<AttendanceStoreInterface>(
  (set, get) => ({
    isLoading: false,
    monthYear: {
      monthString: "",
      month: "",
      year: "",
    },
    setMonthYear: (monthYear) => set({ monthYear }),
    attendanceForStudent: null,
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
        console.log(month);
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
  })
);

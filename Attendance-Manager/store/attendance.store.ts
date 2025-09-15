import { AttendanceApis } from "@/assets/constants";
import { MarkAttendaneInputType } from "@/types";
import axios from "axios";
import { Alert } from "react-native";
import { create } from "zustand";

interface AttendanceStoreInterface {
  isLoading: boolean;
  markAttendace: (
    input: MarkAttendaneInputType,
    token: string
  ) => Promise<boolean>;
}

export const useAttendanceStore = create<AttendanceStoreInterface>(
  (set, get) => ({
    isLoading: false,
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
  })
);

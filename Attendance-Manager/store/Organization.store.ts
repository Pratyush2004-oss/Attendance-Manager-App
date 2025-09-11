import { OrganizationApis } from "@/assets/constants";
import { Teacher } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { Alert } from "react-native";

interface OrganizationStoreInterface {
  teachers: Teacher[];
  isLoading: boolean;
  verifyTeacher: (teacherId: string, token: string) => Promise<void>;
  getAllTeachers: (token: string) => Promise<void>;
  deleteTeacherFromOrganization: (
    teacherId: string,
    token: string
  ) => Promise<void>;
}

export const useOrganizationStore = create<OrganizationStoreInterface>(
  (set, get) => ({
    teachers: [],
    isLoading: false,

    getAllTeachers: async (token: string) => {
      if (!token) return;
      try {
        set({ isLoading: true });
        const teachers = await axios.get(OrganizationApis.getAllTeachers, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (teachers.status === 400) throw new Error(teachers.data.error);
        console.log(teachers.data.teachers)
        set({ teachers: teachers.data.teachers });
      } catch (error) {
      } finally {
        set({ isLoading: false });
      }
    },
    verifyTeacher: async (teacherId, token) => {
      if (!token || !teacherId) return;
      try {
        set({ isLoading: true });
        const response = await axios.get(
          OrganizationApis.verifyTeacher.replace(":teacherId", teacherId),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) throw new Error(response.data.error);
        await get().getAllTeachers(token);
      } catch (error: any) {
        if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
        else Alert.alert("Error", error.message);
      } finally {
        set({ isLoading: false });
      }
    },
    deleteTeacherFromOrganization: async (teacherId, token) => {
      if (!token || !teacherId) return;
      try {
        set({ isLoading: true });
        const response = await axios.delete(
          OrganizationApis.deleteTeacher.replace(":teacherId", teacherId),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) throw new Error(response.data.error);
        await get().getAllTeachers(token);
      } catch (error: any) {
        if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
        else Alert.alert("Error", error.message);
      } finally {
        set({ isLoading: false });
      }
    },
  })
);

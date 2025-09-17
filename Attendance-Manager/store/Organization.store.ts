import { OrganizationApis } from "@/assets/constants";
import { OrganizationForAdmin, Teacher } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { Alert } from "react-native";

interface OrganizationStoreInterface {
  teachers: Teacher[];
  isLoading: boolean;
  verifyTeacher: (
    teacherId: string,
    organizationId: string,
    token: string
  ) => Promise<void>;
  selectedOrganization: OrganizationForAdmin | null;
  setSelectedOrganization: (organization: OrganizationForAdmin) => void;
  OrganizationList: OrganizationForAdmin[];
  getOrganizationList: (token: string) => Promise<void>;
  getAllTeachers: (organizationId: string, token: string) => Promise<void>;
  deleteTeacherFromOrganization: (
    teacherId: string,
    organizationId: string,
    token: string
  ) => Promise<void>;
}

export const useOrganizationStore = create<OrganizationStoreInterface>(
  (set, get) => ({
    teachers: [],
    selectedOrganization: null,
    isLoading: false,
    OrganizationList: [],
    setSelectedOrganization: (organization) =>
      set({ selectedOrganization: organization }),
    getOrganizationList: async (token) => {
      set({ isLoading: true });
      try {
        const response = await axios.get(
          OrganizationApis.getOrganizationForAdmins,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.error) throw new Error(response.data.error);
        set({ OrganizationList: response.data.organizations });
      } catch (error) {
      } finally {
        set({ isLoading: false });
      }
    },
    getAllTeachers: async (organizaitionId: string, token: string) => {
      if (!token) return;
      try {
        set({ isLoading: true });
        const teachers = await axios.get(
          OrganizationApis.getAllTeachersOfOrganization.replace(
            ":organizationId",
            organizaitionId
          ),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (teachers.status === 400) throw new Error(teachers.data.error);
        set({ teachers: teachers.data.teachers });
      } catch (error: any) {
      } finally {
        set({ isLoading: false });
      }
    },
    verifyTeacher: async (teacherId, organizationId, token) => {
      if (!token || !teacherId) return;
      try {
        const response = await axios.post(
          OrganizationApis.verifyTeacher,
          { teacherId, organizationId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) throw new Error(response.data.error);
        Alert.alert("Success", response.data.message);
        await get().getAllTeachers(organizationId, token);
      } catch (error: any) {
        if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
        else Alert.alert("Error", error.message);
      }
    },
    deleteTeacherFromOrganization: async (organizationId, teacherId, token) => {
      if (!token || !teacherId) return;
      try {
        const response = await axios.delete(
          OrganizationApis.deleteTeacher.replace(":teacherId", teacherId),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) throw new Error(response.data.error);
        Alert.alert("Success", response.data.message);
        await get().getAllTeachers(organizationId, token);
      } catch (error: any) {
        if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
        else Alert.alert("Error", error.message);
      }
    },
  })
);

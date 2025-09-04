import {
  loginInputType,
  resetPasswordInputType,
  signupInputType,
  UserType,
} from "@/types";
import { Alert } from "react-native";
import { create } from "zustand";
import axios from "axios";
import { UserApis } from "@/assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStoreInterface {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isAdmin: boolean;
  user: UserType | null;
  isOrganizationAdmin: boolean;
  token: string | null;

  signup: (userInput: signupInputType) => Promise<boolean>;
  login: (userInput: loginInputType) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    resetPasswordInput: resetPasswordInputType
  ) => Promise<boolean>;
  logout: () => void;
  reset: () => void;
}

export const useUserStore = create<UserStoreInterface>((set) => ({
  isAuthenticated: false,
  isCheckingAuth: true,
  isAdmin: false,
  isOrganizationAdmin: false,
  user: null,
  token: null,

  //   signup controller
  signup: async (userInput) => {
    try {
      // check for all fields
      if (
        !userInput.email ||
        !userInput.password ||
        !userInput.name ||
        !userInput.role ||
        !userInput.Organization
      ) {
        Alert.alert("Error", "Please fill all the fields.");
        return false;
      }
      //   check for guardian details for students only
      if (
        userInput.role === "student" &&
        !(userInput.guardianName && userInput.guardianNumber)
      ) {
        Alert.alert("Error", "Please fill guardian details.");
        return false;
      }

      //   check for valid email
      if (!/^\S+@\S+\.\S+$/.test(userInput.email)) {
        Alert.alert("Error", "Please enter a valid email address.");
        return false;
      }

      const response = await axios.post(UserApis.registerUser, userInput);
      if (response.status === 400) throw new Error(response.data.error);

      Alert.alert("Success", response.data.message);
      return true;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error);
        Alert.alert("Error", error.response.data.error);
      }
      return false;
    }
  },
  //   login controller
  login: async (userInput) => {
    if (!userInput.email || !userInput.password) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(userInput.email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const response = await axios.post(UserApis.loginUser, userInput);
    if (response.status === 400) throw new Error(response.data.message);

    // check for admin
    try {
      const responseAdmin = await axios.get(UserApis.checkAdmin, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      if (responseAdmin.data.isAdmin) set({ isAdmin: true });

      if (responseAdmin.status === 401) throw new Error(responseAdmin.data);
    } catch (error) {}
    set({ isAuthenticated: true, user: response.data.user });
    Alert.alert("Success", response.data.message);
    AsyncStorage.setItem("token", response.data.token);
  },
  //   check auth controller
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return set({
        isCheckingAuth: false,
        isAuthenticated: false,
        token: null,
        user: null,
      });
    }

    const response = await axios.get(UserApis.checkAuth, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400) throw new Error(response.data.message);
    set({
      token: token,
      isCheckingAuth: false,
      isAuthenticated: true,
      user: response.data.user,
    });
    // check for admin also
    try {
      const requireAdmin = await axios.get(UserApis.checkAdmin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 400) throw new Error(response.data.message);
      if (requireAdmin.data.isAdmin) set({ isAdmin: true });
    } catch (error) {
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  //   forgot password controller
  forgotPassword: async (email) => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }
    try {
      const response = await axios.post(UserApis.forgotPassword, { email });
      if (response.status === 400) throw new Error(response.data.message);
      Alert.alert("Success", response.data.message);
      return true;
    } catch (error: any) {
      Alert.alert("Error", error.response.error);
      return false;
    }
  },
  //   reset password controller
  resetPassword: async (resetPasswordInput) => {
    if (
      !(
        resetPasswordInput.email ||
        resetPasswordInput.newPassword ||
        resetPasswordInput.confirmPassword ||
        resetPasswordInput.otp
      )
    ) {
      Alert.alert("Error", "Please fill all the fields");
      return false;
    }
    if (resetPasswordInput.newPassword !== resetPasswordInput.confirmPassword) {
      Alert.alert("Error", "Password doesn;t match");
      return false;
    }
    const resposne = await axios.post(UserApis.forgotPassword, {
      ...resetPasswordInput,
      confirmPassword: undefined,
    });
    if (resposne.status === 400) throw new Error(resposne.data.error);
    Alert.alert("Success", resposne.data.message);
    return true;
  },
  //   logout controller
  logout: () => {
    try {
      AsyncStorage.removeItem("token");
      set({
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        token: null,
      });
      Alert.alert("Logged out successfully");
    } catch (error) {
      Alert.alert("Error Logging out");
    }
  },
  //   reset controller
  reset: () => {
    set({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      token: null,
    });
  },
}));

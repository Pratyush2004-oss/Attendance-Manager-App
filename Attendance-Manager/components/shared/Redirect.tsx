import { useUserStore } from "@/store/userStore";
import { Redirect, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import LoadingScreen from "./LoadingScreen";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const segment = useSegments();
  const {
    user,
    isCheckingAuth,
    isAuthenticated,
    checkAuth,
    isOrganizationAdmin,
  } = useUserStore();

  useEffect(() => {
    if (isCheckingAuth && !isAuthenticated) {
      checkAuth();
    }
  }, [isCheckingAuth, isAuthenticated, checkAuth]);

  const isAuthScreen = segment[0] === "(auth)";
  const isStudentScreen =
    segment[0] === "students" || segment[0] === "(studentTab)";
  const isTeacherScreen = segment[0] === "(teacherTab)";
  const OrganizationScreen = segment[0] === "organization";

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }
  if (isAuthScreen && user && user.role === "student" && isAuthenticated) {
    return <Redirect href={"/(studentTab)"} />;
  } else if (
    isAuthScreen &&
    user &&
    user.role === "teacher" &&
    isAuthenticated
  ) {
    return <Redirect href={"/(teacherTab)"} />;
  } else if (isStudentScreen && user?.role === "teacher") {
    return <Redirect href={"/(teacherTab)"} />;
  } else if (isTeacherScreen && user?.role === "student") {
    return <Redirect href={"/(studentTab)"} />;
  } else if (!isOrganizationAdmin && OrganizationScreen) {
    return <Redirect href={"/(teacherTab)"} />;
  }

  return <View className="flex-1">{children}</View>;
};

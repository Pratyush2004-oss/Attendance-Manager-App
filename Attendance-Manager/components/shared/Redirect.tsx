import { useUserStore } from "@/store/userStore";
import { Redirect, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import LoadingScreen from "./LoadingScreen";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const segment = useSegments();
  const { user, isCheckingAuth, isAuthenticated, checkAuth } = useUserStore();

  useEffect(() => {
    if (isCheckingAuth && !isAuthenticated) {
      checkAuth();
    }
  }, [isCheckingAuth, isAuthenticated, checkAuth]);
  const isAuthScreen = segment[0] === "(auth)";

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
  }

  return <View className="flex-1">{children}</View>;
};

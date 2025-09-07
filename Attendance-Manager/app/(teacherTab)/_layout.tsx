import { View } from "react-native";
import React, { useState } from "react";
import TabHeader from "@/components/shared/TabHeader";
import Sidebar from "@/components/shared/Sidebar";
import { Tabs } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TeacherTabLayout = () => {
  const [sidebarVisible, setsidebarVisible] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white">
      <TabHeader onSidebarPress={() => setsidebarVisible(true)} />
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setsidebarVisible(false)}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1DA1F2",
          tabBarInactiveTintColor: "#657786",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#E1E8ED",
            height: 40 + insets.bottom,
          },
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        {/* batches */}
        <Tabs.Screen
          name="batches"
          options={{
            title: "Batches",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="barchart" color={color} size={size} />
            ),
          }}
        />
        {/* assignments */}
        <Tabs.Screen
          name="assignments"
          options={{
            title: "Assignments",
            tabBarIcon: ({ color, size }) => (
              <Feather name="book-open" color={color} size={size} />
            ),
          }}
        />
        {/* profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TeacherTabLayout;

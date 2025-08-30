import Sidebar from "@/components/shared/Sidebar";
import TabHeader from "@/components/shared/TabHeader";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

const StudentTabLayout = () => {
  const [sidebarVisible, setsidebarVisible] = useState(false);
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
            height: 0,
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
        {/* attendance */}
        <Tabs.Screen
          name="attendance"
          options={{
            title: "Attendance",
            tabBarIcon: ({ color, size }) => (
              <Feather name="bar-chart" color={color} size={size} />
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

export default StudentTabLayout;

import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TabHeader = ({
  onSidebarPress,
  onProfilePress,
}: {
  onSidebarPress: () => void;
  onProfilePress?: () => void;
}) => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleProfilePress = () => {
    setDropdownVisible(!dropdownVisible);
    if (onProfilePress) onProfilePress();
  };
  const handleLogout = () => {
    router.push("/(auth)");
    setDropdownVisible(false);
  };

  const handleMenuOption = (option: string) => {
    setDropdownVisible(false);
    // Handle navigation or actions here
    if (option === "profile") router.push("/profile");
    if (option === "logout") handleLogout();
  };
  return (
    <View className="relative z-10 flex-row items-center justify-between w-full px-4 py-3 bg-white shadow-md">
      <View className="flex-row items-center gap-2">
        {/* sidebar button */}
        <TouchableOpacity onPress={onSidebarPress}>
          <Ionicons name="menu" size={20} color="#22223b" />
        </TouchableOpacity>

        {/* App Logo */}
        <Pressable
          onPress={() => {
            router.push("/");
          }}
        >
          {/* to do: logo here in landscape */}
          <Text className="text-xl font-semibold ">Attendance Manager</Text>
        </Pressable>
      </View>

      {/* Right side */}
      <View className="flex-row items-center mr-3">
        <TouchableOpacity
          className="items-center mt-1"
          onPress={handleProfilePress}
        >
          <Ionicons name="person-circle-outline" size={28} color={"#2563eb"} />
        </TouchableOpacity>
        {dropdownVisible && (
          <View className="absolute right-0 p-2 bg-white rounded-md shadow-md top-12">
            <TouchableOpacity
              className="px-4 py-2"
              onPress={() => handleMenuOption("profile")}
            >
              <Text className="text-lg">Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2"
              onPress={() => handleMenuOption("logout")}
            >
              <Text className="text-lg">Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TabHeader;

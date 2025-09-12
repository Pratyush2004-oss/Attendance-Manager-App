import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
const ProfilePage = () => {
  const { user } = useUserStore();
  return (
    user && (
      <View className="relative items-center justify-around flex-1">
        <Pressable className="absolute z-20 p-2 bg-blue-300 rounded-full top-2 right-5">
          <Ionicons name="pencil-sharp" size={24} color="white" />
        </Pressable>
        {/* Profile Image section */}
        <View className="items-center justify-center w-full py-4">
          <Image
            source={
              user.role === "student"
                ? require("@/assets/images/student.jpeg")
                : require("@/assets/images/teacher.jpg")
            }
            className="object-contain border-8 border-blue-400 rounded-full shadow-md size-56 aspect-square"
          />
          <Text className="mt-3 text-3xl font-bold text-center text-blue-700/75">
            {user.name}
          </Text>
          <Text className="text-2xl text-center">{user.email}</Text>
          <Text
            className={`mt-5 text-3xl text-center ${user.role === "teacher" ? "text-green-600" : "text-blue-600"}`}
          >
            {user.role.toUpperCase()}
          </Text>
        </View>

        {/* map Organizations */}
        <FlatList
          className="w-full p-3 rounded-t-2xl bg-blue-500/50 h-2/5"
          data={user.Organization}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => (
            <View className="items-center py-3 ">
              <Text className="text-2xl font-bold">Your Organizations</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-row items-center w-full gap-5 px-5 py-5 mt-4 bg-gray-200 rounded-md">
              <View className="size-12">
                <Image
                  source={require("@/assets/images/Organization.jpg")}
                  className="object-contain rounded-full size-full aspect-square"
                />
              </View>
              <Text className="text-2xl font-medium">{item.name}</Text>
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color="green"
                className="ml-auto"
              />
            </View>
          )}
        />
      </View>
    )
  );
};

export default ProfilePage;

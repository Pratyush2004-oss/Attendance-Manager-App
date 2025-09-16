import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useOrganizationStore } from "@/store/Organization.store";
import { useUserStore } from "@/store/userStore";
import LoadingSection from "../shared/LoadingSection";
import { useRouter } from "expo-router";

const OrgnaizationFlatList = () => {
  const {
    OrganizationList,
    getOrganizationList,
    isLoading,
    setSelectedOrganization,
  } = useOrganizationStore();
  const { token } = useUserStore();
  const fetchOrganizationList = async () => {
    await getOrganizationList(token as string);
  };
  const router = useRouter();
  useEffect(() => {
    fetchOrganizationList();
  }, []);
  return (
    <View className="flex-1 bg-gray-200">
      {isLoading ? (
        <LoadingSection />
      ) : (
        <FlatList
          data={OrganizationList}
          ListHeaderComponent={() => (
            <View className="px-4 my-5">
              <Text className="text-3xl font-bold">Organization List</Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="flex-row items-center w-full gap-3 px-5 py-2 mx-5 my-2 bg-gray-100 rounded-xl">
              <Image
                source={require("@/assets/images/Organization.jpg")}
                className="rounded-full size-32 aspect-square"
              />
              <View className="flex-1 gap-2">
                <Text className="text-2xl font-black">{item.name}</Text>
                <TouchableOpacity
                  className="w-2/3 p-2 bg-blue-500 rounded-full"
                  onPress={() => {
                    setSelectedOrganization(item);
                    router.push("/organization/teachers");
                  }}
                >
                  <Text className="text-center text-white">
                    Get All Teachers
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default OrgnaizationFlatList;

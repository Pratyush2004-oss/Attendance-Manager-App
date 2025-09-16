import OrgnaizationFlatList from "@/components/organization/OrgnaizationFlatList";
import BackHeader from "@/components/shared/BackHeader";
import React from "react";
import { View } from "react-native";

const OrganizationAdmin = () => {
  return (
    <View className="flex-1">
      <BackHeader />
      <OrgnaizationFlatList />
    </View>
  );
};

export default OrganizationAdmin;

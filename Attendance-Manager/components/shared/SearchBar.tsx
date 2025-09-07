import { View, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View className="flex-row items-center justify-center mt-3 mb-1">
      <View className="flex-row w-5/6 bg-white rounded-full">
        <TextInput
          placeholder="Search"
          className="w-5/6 p-4 text-base bg-transparent rounded-full"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <Ionicons
          className="absolute items-center justify-center right-1"
          name="search-circle"
          size={45}
          color="#3b82f6"
        />
      </View>
    </View>
  );
};

export default SearchBar;

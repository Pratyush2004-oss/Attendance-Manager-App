import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useBatchStore } from "@/store/batch.store";
import { Ionicons } from "@expo/vector-icons";
import { CreateAssignmentInputType } from "@/types";

const BatchPicker = ({
  input,
  setInput,
}: {
  input: CreateAssignmentInputType;
  setInput: React.Dispatch<React.SetStateAction<CreateAssignmentInputType>>;
}) => {
  const { batchListForTeacher } = useBatchStore();
  const handleSelectBatch = (itemValue: string) => {
    if (input.batchIds.some((batchId) => batchId === itemValue)) {
      setInput({
        ...input,
        batchIds: input.batchIds.filter((id) => id !== itemValue),
      });
    } else {
      setInput({
        ...input,
        batchIds: [...input.batchIds, itemValue],
      });
    }
  };
  const handleRemove = (itemValue: string) => {
    setInput({
      ...input,
      batchIds: input.batchIds.filter((id) => id !== itemValue),
    });
  };

  const filteredList = () => {
    return batchListForTeacher.filter((batch) =>
      input.batchIds.includes(batch._id)
    );
  };
  return (
    <View className="gap-2 px-5 my-5">
      <View className="flex-row items-center justify-between w-full gap-2 px-5">
        <Text className="w-1/3 text-2xl font-bold">Batch</Text>
        <View className="w-2/3 bg-white rounded-xl">
          <Picker
            selectedValue={""}
            onValueChange={(itemValue) => handleSelectBatch(itemValue)}
          >
            <Picker.Item label="Select Organization" value="" />
            {batchListForTeacher.map((batch) => (
              <Picker.Item
                key={batch._id}
                label={batch.name}
                value={batch._id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <FlatList
          className="flex-1 w-full py-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredList()}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between gap-2 px-5 py-3 ml-3 bg-blue-400/80 rounded-2xl">
              <Pressable className="absolute rounded-full bg-red-500/80 -right-1 -top-1">
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color="white"
                  onPress={() => handleRemove(item._id)}
                />
              </Pressable>
              <Text className="font-bold text-white">{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BatchPicker;

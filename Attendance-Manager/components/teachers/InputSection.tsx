import { useAttendanceStore } from "@/store/attendance.store";
import { useBatchStore } from "@/store/batch.store";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const InputSection = ({
  setShowTable,
}: {
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState({
    batchId: "",
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { batchListForTeacher } = useBatchStore();
  const { getAttendanceofAllStudents } = useAttendanceStore();
  const { token } = useUserStore();
  const handleSelectBatch = (itemValue: string) => {
    setInput({ ...input, batchId: itemValue });
  };
  const handleSubmit = async () => {
    try {
      await getAttendanceofAllStudents(
        input.batchId,
        input.date,
        token as string
      ).then((res) => setShowTable(res));
    } catch (error) {
    } finally {
      setisLoading(false);
    }
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

      {/* Date Picker */}
      <View className="flex-row items-center justify-between px-5 py-2">
        <Text className="text-2xl font-semibold text-gray-900/70">Date</Text>
        <TouchableOpacity
          className="flex-row items-center gap-1 px-4 py-1 bg-blue-400 rounded-xl"
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={16} color="white" />
          <Text className="text-lg font-normal text-white">
            {input.date.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={input.date}
            mode="date"
            display={"spinner"}
            maximumDate={new Date()}
            onChange={(_, date) => {
              setShowDatePicker(false);
              if (date) setInput((prev) => ({ ...prev, date: date }));
            }}
          />
        )}
      </View>

      <TouchableOpacity
        className="items-center w-5/6 px-5 py-1 mx-auto bg-blue-400 rounded-xl disabled:bg-blue-400/50"
        onPress={handleSubmit}
        disabled={isLoading || !input.batchId || !input.date}
      >
        <Text className="text-xl font-semibold text-white">
          {isLoading ? " Loading..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputSection;

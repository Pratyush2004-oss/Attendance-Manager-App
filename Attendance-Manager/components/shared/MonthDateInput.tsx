import { AttendanceMonth, AttendanceYear } from "@/assets/constants";
import { useAttendanceStore } from "@/store/attendance.store";
import { useUserStore } from "@/store/userStore";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

const MonthDateInput = () => {
  const { token } = useUserStore();
  const { getAttendanceforStudent, isLoading, setMonthYear, monthYear } =
    useAttendanceStore();
  const handleSelectMonth = (itemValue: string) => {
    setMonthYear({
      ...monthYear,
      month: itemValue,
      monthString: AttendanceMonth.find((month) => month.value === itemValue)
        ?.name as string,
    });
  };
  const handleSelectYear = (itemValue: string) => {
    setMonthYear({ ...monthYear, year: itemValue });
  };
  const handleSearch = async () => {
    if (!monthYear.month || !monthYear.year) {
      Alert.alert("Error", "Please select month and year.");
      return;
    }
    await getAttendanceforStudent(
      `${monthYear.year}-${monthYear.month}`,
      token as string
    );
  };
  return (
    <View className="my-3">
      <View className="w-5/6 gap-2 px-2 mx-auto">
        <Text className="ml-3 text-xl font-bold">Select Month and Year</Text>
        <View className="w-full bg-white rounded-lg ">
          <Picker
            selectedValue={monthYear.month}
            onValueChange={(itemValue) => handleSelectMonth(itemValue)}
          >
            <Picker.Item label="Select Month" value="" />
            {AttendanceMonth.map((month, index) => (
              <Picker.Item key={index} label={month.name} value={month.value} />
            ))}
          </Picker>
        </View>
        <View className="w-full bg-white rounded-lg">
          <Picker
            selectedValue={monthYear.year}
            onValueChange={(itemValue) => handleSelectYear(itemValue)}
          >
            <Picker.Item label="Select Year" value="" />
            {AttendanceYear.map((year, index) => (
              <Picker.Item key={index} label={year} value={year} />
            ))}
          </Picker>
        </View>
        <Pressable
          className="w-5/6 py-2 mx-auto bg-blue-500 rounded-2xl disabled:bg-blue-500/50 "
          disabled={!monthYear.month || !monthYear.year || isLoading}
          onPress={() => handleSearch()}
        >
          <Text className="text-lg font-semibold text-center text-gray-900 disabled:text-gray-500">
            {isLoading ? (
              <ActivityIndicator color="white" size={"small"} />
            ) : (
              "Search"
            )}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MonthDateInput;

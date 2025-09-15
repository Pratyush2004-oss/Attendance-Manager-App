import MonthDateInput from "@/components/shared/MonthDateInput";
import AttendaceTableScreen from "@/components/students/AttendaceScreen";
import React from "react";
import { Text, View } from "react-native";

const Attendance = () => {
  return (
    <View className="flex-1">
      {/* Input section for entering the date */}
      <MonthDateInput />

      {/* display attendance table  */}
      <AttendaceTableScreen />
    </View>
  );
};

export default Attendance;

import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useAttendanceStore } from "@/store/attendance.store";
import { AttendanceTable } from "./AttendanceTable";

const AttendaceTableScreen = () => {
  const { monthYear, attendanceForStudent } = useAttendanceStore();

  //   get the date list of the month
  const DateList = (month: number, year: number): Date[] => {
    const date = new Date(year, month - 1);
    const dates: Date[] = [];

    while (date.getMonth() === month - 1) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  useEffect(() => {
    !monthYear.month &&
      DateList(parseInt(monthYear.month, 10), parseInt(monthYear.year, 10));
  }, [monthYear]);

  return (
    monthYear.month &&
    monthYear.year &&
    attendanceForStudent && (
      <View className="p-4">
        <Text className="mb-4 text-2xl font-bold text-center">
          Attendance for {monthYear.monthString} {monthYear.year}
        </Text>
        <AttendanceTable
          attendanceData={attendanceForStudent}
          dates={DateList(
            parseInt(monthYear.month, 10),
            parseInt(monthYear.year, 10)
          )}
        />
      </View>
    )
  );
};

export default AttendaceTableScreen;

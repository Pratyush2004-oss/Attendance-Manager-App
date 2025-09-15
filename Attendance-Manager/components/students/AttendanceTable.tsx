// src/components/AttendanceTable.tsx

import { AttendanceForStudentType } from "@/types";
import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";

// Import your type definitions

// Assuming they are in a file like 'src/types/attendance.ts'

// Define the component's props
interface AttendanceTableProps {
  dates: Date[];
  attendanceData: AttendanceForStudentType[];
}

/**
 * A helper function to format a Date object into a consistent 'YYYY-MM-DD' string.
 * This is crucial for using dates as keys in our lookup Map.
 */
const formatDateKey = (date: Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2); // Months are 0-indexed
  const day = `0${d.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  dates,
  attendanceData,
}) => {
  if (!dates || dates.length === 0) {
    return <Text>No dates to display.</Text>;
  }

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ flexGrow: 1, paddingRight: 30 }}
      showsHorizontalScrollIndicator={false}
    >
      <View>
        {/* ======================= */}
        {/* ====== Header Row ===== */}
        {/* ======================= */}
        <View className="flex-row">
          {/* Top-left empty corner cell */}
          <View className="items-center justify-center w-56 p-3 bg-gray-200 border-b border-r border-gray-300">
            <Text className="font-bold text-gray-700">Batch</Text>
          </View>
          {/* Mapping through dates to create date columns */}
          {dates.map((date) => (
            <View
              key={date.toISOString()}
              className="items-center justify-center w-12 h-12 p-2 bg-gray-200 border-b border-r border-gray-300"
            >
              <Text className="font-bold text-gray-700">{date.getDate()}</Text>
            </View>
          ))}
        </View>

        {/* ======================= */}
        {/* ====== Data Rows ====== */}
        {/* ======================= */}
        {attendanceData.map((batch) => (
          // We use useMemo to create the lookup map only when attendanceRecords change
          <AttendanceRow key={batch._id} batch={batch} dates={dates} />
        ))}
      </View>
    </ScrollView>
  );
};

// We can extract the row into its own component for better separation and optimization
const AttendanceRow: React.FC<{
  batch: AttendanceForStudentType;
  dates: Date[];
}> = ({ batch, dates }) => {
  // useMemo ensures this heavy computation runs only when the batch records change
  const attendanceMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const record of batch.attendanceRecords) {
      map.set(formatDateKey(record.date), record.status);
    }
    return map;
  }, [batch.attendanceRecords]);

  return (
    <View className="flex-row">
      {/* Batch Name Cell (Row Header) */}
      <View className="items-center justify-center w-56 p-3 bg-gray-200 border-b border-r border-gray-300">
        <Text className="font-semibold text-gray-600">{batch.batchName}</Text>
      </View>

      {/* Status Cells */}
      {dates.map((date) => {
        const dateKey = formatDateKey(date);
        const status = attendanceMap.get(dateKey); // O(1) lookup

        let statusChar = "";
        let textColor = "text-black";

        if (status) {
          statusChar = status.charAt(0).toUpperCase();
          if (status === "present") textColor = "text-green-600";
          else if (status === "absent") textColor = "text-red-600";
          else if (status === "leave") textColor = "text-yellow-600";
        }

        return (
          <View
            key={date.toISOString()}
            className="items-center justify-center w-12 h-12 p-2 bg-white border-b border-r border-gray-300"
          >
            <Text className={`font-bold ${textColor}`}>{statusChar}</Text>
          </View>
        );
      })}
    </View>
  );
};

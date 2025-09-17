import BackHeader from "@/components/shared/BackHeader";
import AttencanceTableForTeacher from "@/components/teachers/AttencanceTable";
import InputSection from "@/components/teachers/InputSection";
import React, { useState } from "react";
import { View } from "react-native";

const GetAttendancePage = () => {
  const [showTable, setShowTable] = useState(false);
  return (
    <View>
      <BackHeader />
      <InputSection setShowTable={setShowTable} />
      {showTable && <AttencanceTableForTeacher />}
    </View>
  );
};

export default GetAttendancePage;

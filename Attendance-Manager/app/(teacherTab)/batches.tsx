import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useTeacherHook from "@/hooks/UseTeacherHook";

const Batches = () => {
  const [BatchList, setBatchList] = useState([]);
  const { getListOfAllBatches } = useTeacherHook();
  const getBatchList = async () => {
    const batches = await getListOfAllBatches();
    setBatchList(batches);
  };
  useEffect(() => {
    BatchList && getBatchList();
  }, []);
  return (
    <View>
      <Text>Batches</Text>
    </View>
  );
};

export default Batches;

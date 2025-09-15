import BatchFlatList from "@/components/teachers/BatchFlatList";
import CreateBatch from "@/components/teachers/CreateBatch";
import useTeacherHook from "@/hooks/UseTeacherHook";
import { BatchForTeacherType } from "@/types";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const Batches = () => {
  const [BatchList, setBatchList] = useState<BatchForTeacherType[]>([]);
  const { getListOfAllBatches } = useTeacherHook();
  const getBatchList = async () => {
    await getListOfAllBatches().then((res) => setBatchList(res));
  };
  useEffect(() => {
    getBatchList();
  }, []);
  return (
    <View className="flex-1">
      <CreateBatch refreshList={getBatchList} />
      <BatchFlatList BatchList={BatchList} getBatchList={getBatchList} />
    </View>
  );
};

export default Batches;

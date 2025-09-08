import { batchApis, UserApis } from "@/assets/constants";
import { useUserStore } from "@/store/userStore";
import { CreateBatchInputType } from "@/types";
import axios from "axios";
import { Alert } from "react-native";

const useTeacherHook = () => {
  const { token } = useUserStore();
  const getListOfAllBatches = async () => {
    try {
      const batches = await axios.get(batchApis.get_Batches_for_Teacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return batches.data.batchDetails;
    } catch (error) {
      console.log(error);
    }
  };

  const createBatch = async (input: CreateBatchInputType) => {
    if (!(input.name && input.Organization)) {
      Alert.alert("Error", "Please fill all the fields.");
      return false;
    }

    try {
      const response = await axios.post(batchApis.createBatch, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 400) throw new Error(response.data.error);
      Alert.alert("Success", response.data.message);
      return true;
    } catch (error: any) {
      if (error.isAxiosError) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Error", error.message);
      }
      return false;
    }
  };

  const getBatchDetails = async (batchId: string) => {
    try {
      const batchDetails = await axios.get(
        batchApis.get_Single_Batch_for_Teacher.replace(":batchId", batchId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (batchDetails.status === 400) throw new Error(batchDetails.data.error);
      return batchDetails.data.batch;
    } catch (error) {}
  };

  return {
    getListOfAllBatches,
    createBatch,
    getBatchDetails,
  };
};

export default useTeacherHook;

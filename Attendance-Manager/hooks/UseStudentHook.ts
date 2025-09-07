import { batchApis } from "@/assets/constants";
import { useUserStore } from "@/store/userStore";
import { JoinBatchInputType } from "@/types";
import axios from "axios";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const useStudentHook = () => {
  const { token } = useUserStore();
  // list of batches where user exists
  const getListOfAllBatches = async () => {
    try {
      const batches = await axios.get(batchApis.get_batches_for_Student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (batches.status === 400) throw new Error(batches.data.error);
      return batches.data.batchDetails;
    } catch (error) {}
  };

  // list of all the batches of the organization where student is a part of
  const getAllBatchesListOfOrganization = async () => {
    try {
      const batches = await axios.get(
        batchApis.get_All_Batches_of_Organization,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (batches.status === 400) throw new Error(batches.data.error);
      return batches.data.batchDetails;
    } catch (error) {}
  };

  // join a batch using batch code
  const joinBatch = async (input: JoinBatchInputType) => {
    if (!input.batchId || !input.batchJoiningCode) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    try {
      const response = await axios.post(batchApis.add_to_batch, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 400) throw new Error(response.data.error);
      Alert.alert("Success", response.data.message);
      return true;
    } catch (error: any) {
      if (error.isAxiosError) Alert.alert("Error", error.response.data.error);
      return false;
    }
  };

  return {
    getListOfAllBatches,
    getAllBatchesListOfOrganization,
    joinBatch,
  };
};

export default useStudentHook;

import { batchApis } from "@/assets/constants";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

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

  return {
    getListOfAllBatches,
  };
};

export default useTeacherHook;

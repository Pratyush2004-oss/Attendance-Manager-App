import { batchApis } from "@/assets/constants";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

const useStudentHook = () => {
    const { token } = useUserStore();
  const getListOfAllBatches = async () => {
    try {
      const batches = await axios.get(batchApis.get_batches_for_Student, {
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
}

export default useStudentHook
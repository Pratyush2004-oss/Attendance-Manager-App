import { batchApis } from "@/assets/constants";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

const useTeacherHook = () => {
  const { token } = useUserStore();
  const getListOfAllBatches = async () => {
    console.log(token);
    try {
      const batches = await axios.get(batchApis.get_Batches_for_Teacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(batches.data);

      return batches.data.batcheDetails;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getListOfAllBatches,
  };
};

export default useTeacherHook;

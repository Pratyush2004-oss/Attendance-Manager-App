import { batchApis } from "@/assets/constants";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

const useStudentHook = () => {
  const { token } = useUserStore();

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

  return {
    getAllBatchesListOfOrganization,
  };
};

export default useStudentHook;

import { batchApis } from "@/assets/constants";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

const useTeacherHook = () => {
  const { token } = useUserStore();

  const getStudentList = async (batchId: string) => {
    try {
      const students = await axios.get(
        batchApis.getAllStudentList.replace(":batchId", batchId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (students.status === 400) throw new Error(students.data.error);
      return students.data.students;
    } catch (error) {}
  };

  return {
    getStudentList,
  };
};

export default useTeacherHook;

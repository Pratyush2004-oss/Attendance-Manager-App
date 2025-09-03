import { OrganizationApis } from "@/assets/constants";
import axios from "axios";

const useOrganizationHook = () => {
  const getOrganizationList = async () => {
    const response = await axios.get(OrganizationApis.getOrganizationList);
    return response.data.organizations;
  };

  return {
    getOrganizationList,
  };
};

export default useOrganizationHook;

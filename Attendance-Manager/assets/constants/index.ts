export const BASE_URL = "https://attendance-manager-app-seven.vercel.app";

export const UserApis = {
  registerUser: `${BASE_URL}/api/auth/register`,
  loginUser: `${BASE_URL}/api/auth/login`,
  checkAuth: `${BASE_URL}/api/auth/check-auth`,
  checkAdmin: `${BASE_URL}/api/auth/check-admin`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${BASE_URL}/api/auth/reset-password`,
}

export const batchApis = {
  createBatch: `${BASE_URL}/api/batch/create-batch`,
  getBatches: `${BASE_URL}/api/batch/get-batches`,
  getBatch: `${BASE_URL}/api/batch/get-batch`,
  updateBatch: `${BASE_URL}/api/batch/update-batch`,
  deleteBatch: `${BASE_URL}/api/batch/delete-batch`
}

export const OrganizationApis = {
  getOrganizationList : `${BASE_URL}/api/organization/get-organization-list`,
  
}

export const NavigationOptions = [
  {
    title: "Batches",
    href: "/batches",
    icon: "bar-chart",
  },
  {
    title:"Attendance",
    href:"/attendance",
    icon:"calendar"
  },
  {
    title:"Assignments",
    href:"Assignments",
    icon:"book-open" 
  }
];

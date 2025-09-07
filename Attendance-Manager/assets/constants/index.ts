export const BASE_URL = "https://attendance-manager-app-seven.vercel.app";

export const UserApis = {
  registerUser: `${BASE_URL}/api/auth/register`,
  loginUser: `${BASE_URL}/api/auth/login`,
  checkAuth: `${BASE_URL}/api/auth/check-auth`,
  checkAdmin: `${BASE_URL}/api/auth/check-admin`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${BASE_URL}/api/auth/reset-password`,
};

export const batchApis = {
  // teacher apis
  getAllStudentList: `${BASE_URL}/api/batch/get-student-list`,
  createBatch: `${BASE_URL}/api/batch/create-batch`,
  get_Batches_for_Teacher: `${BASE_URL}/api/batch/get-batches-for-teacher`,
  get_Single_Batch_for_Teacher: `${BASE_URL}/api/batch/get-batch-By-id-for-teacher/:batchId`,
  add_student_to_batch: `${BASE_URL}/api/batch/add-students-to-batch`,
  delete_Student_from_Batch: `${BASE_URL}/api/batch/delete-student-from-batch`,
  deleteBatch: `${BASE_URL}/api/batch/delete-batch/:batchId`,

  // student apis
  add_to_batch: `${BASE_URL}/api/batch/add-to-batch`,
  get_batches_for_Student: `${BASE_URL}/api/batch/get-batches-for-student`,
  get_Single_Batch_for_Student: `${BASE_URL}/api/batch/get-batch-By-id-for-students/:batchId`,
  get_All_Batches_of_Organization: `${BASE_URL}/api/batch/get-all-batches-of-organization`,
};

export const OrganizationApis = {
  getOrganizationList: `${BASE_URL}/api/organization/get-organization-list`,
};

export const NavigationOptions = [
  {
    title: "Batches",
    href: "/batches",
    icon: "bar-chart",
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: "calendar",
  },
  {
    title: "Assignments",
    href: "Assignments",
    icon: "book-open",
  },
];

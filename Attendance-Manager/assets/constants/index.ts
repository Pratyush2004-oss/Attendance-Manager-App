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
  getAllStudentList: `${BASE_URL}/api/batch/get-student-list/:batchId`,
  createBatch: `${BASE_URL}/api/batch/create-batch`,
  get_Batches_for_Teacher: `${BASE_URL}/api/batch/get-batches-for-teacher`,
  get_Single_Batch_for_Teacher: `${BASE_URL}/api/batch/get-batch-By-id-for-teacher/:batchId`,
  add_students_to_batch: `${BASE_URL}/api/batch/add-students-to-batch`,
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
    category: "Batches",
    options: [
      {
        title: "All Batches",
        href: "/students/batches",
        icon: "bar-chart-outline",
      },
      {
        title: "Your Batches",
        href: "/batches",
        icon: "bar-chart",
      },
    ],
  },
  {
    category: "Organization",
    options: [
      {
        title: "All Organizations",
        href: "/organizations",
        icon: "people-circle-outline",
      },
      {
        title: "Your Organizations",
        href: "/organizations",
        icon: "people-circle-outline",
      },
    ],
  },
  {
    category: "Assignments",
    options: [
      {
        title: "Assignments",
        href: "/assignments",
        icon: "book-outline",
      },
      {
        title: "Today's Assignments",
        href: "/assignments",
        icon: "book-outline",
      },
      {
        title: "Today's Assignments",
        href: "/assignments",
        icon: "book-outline",
      },
    ],
  },
  {
    category: "Attendance",
    options: [
      {
        title: "Attendance",
        href: "/attendance",
        icon: "calendar",
      },
      {
        title: "Attendance Stats",
        href: "/attendance",
        icon: "calendar",
      },
    ],
  },
];

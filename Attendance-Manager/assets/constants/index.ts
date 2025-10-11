export const BASE_URL = "https://attendance-manager-app-seven.vercel.app";

// user apis
export const UserApis = {
  registerUser: `${BASE_URL}/api/auth/register`,
  loginUser: `${BASE_URL}/api/auth/login`,
  checkAuth: `${BASE_URL}/api/auth/check-auth`,
  checkAdmin: `${BASE_URL}/api/auth/check-admin`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${BASE_URL}/api/auth/reset-password`,
};


// batch apis
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
  leaveBatch: `${BASE_URL}/api/batch/leave-batch`,
};

// organization apis
export const OrganizationApis = {
  getOrganizationList: `${BASE_URL}/api/organization/get-organization-list`,
  verifyTeacher: `${BASE_URL}/api/organization/verify-teachers`,
  getOrganizationForAdmins: `${BASE_URL}/api/organization/get-organizations-for-admins`,
  checkOrganizationAdmin: `${BASE_URL}/api/organization/check-organization-admin`,
  getAllTeachersOfOrganization: `${BASE_URL}/api/organization/get-all-teacher-list/:organizationId`,
  deleteTeacher: `${BASE_URL}/api/organization/delete-teaher-account/:teacherId`,
};

// attendance routes
export const AttendanceApis = {
  markAttendace: `${BASE_URL}/api/attendance/mark-attendance`,
  getAttendanceForStudents: `${BASE_URL}/api/attendance/get-attendance-for-student/:month`,
  getAttendanceOfAllStudents: `${BASE_URL}/api/attendance/get-attendance-of-all-students`,
  updateStatusofStudentInAttendance: `${BASE_URL}/api/attendance/update-status-of-student-in-attendance`,
};

// assignment Routes
export const AssignmentApis = {
  createAssignment: `${BASE_URL}/api/assignment/create-assignment`,
  getTodayAssignment: `${BASE_URL}/api/assignment/get-assignments-of-today`,
  getBatchAssignment: `${BASE_URL}/api/assignment/get-assignment/:batchId`,
};

// navigation options for students
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
        title: "Assignment Stats",
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

// navigation options for teachers
export const NavigationOptionsForTeachers = [
  {
    category: "Batches",
    options: [
      {
        title: "All Batches",
        href: "/batches",
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
    category: "Assignments",
    options: [
      {
        title: "Create Assignments",
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
        title: "Mark Attendance",
        href: "/batches",
        icon: "calendar",
      },
      {
        title: "Get Attendance Stats",
        href: "/teacher/getAttendance",
        icon: "calendar",
      },
    ],
  },
];

// attendance constants
export const AttendanceMonth = [
  {
    name: "January",
    value: "01",
  },
  {
    name: "February",
    value: "02",
  },
  {
    name: "March",
    value: "03",
  },
  {
    name: "April",
    value: "04",
  },
  {
    name: "May",
    value: "05",
  },
  {
    name: "June",
    value: "06",
  },
  {
    name: "July",
    value: "07",
  },
  {
    name: "August",
    value: "08",
  },
  {
    name: "September",
    value: "09",
  },
  {
    name: "October",
    value: "10",
  },
  {
    name: "November",
    value: "11",
  },
  {
    name: "December",
    value: "12",
  },
];

// attendance constants
export const AttendanceYear = ["2024", "2025", "2026"];

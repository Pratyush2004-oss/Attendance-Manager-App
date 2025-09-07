export type loginInputType = {
  email: string;
  password: string;
};

export type signupInputType = {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "";
  Organization: {
    _id: string;
    name: string;
  }[];
  guardianName: string;
  guardianNumber: string;
};

export type resetPasswordInputType = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  Organization: OrganizationType[];
  guardian: {
    name: string | null;
    number: string | null;
  };
};

export type BatchForStudentType = {
  _id: string;
  name: string;
  Organization: {
    name: string;
  };
  teacherId: {
    _id: string;
    name: string;
    email: string;
  };
  studentCount: number;
};

export type BatchForTeacherType = {
  _id: string;
  name: string;
  Organization: {
    name: string;
  };
  batchJoiningCode: string | null;
  studentCount: number;
  students:
    | {
        _id: string;
        name: string;
        email: string;
        guardian: {
          name: string;
          number: string;
        };
      }[]
    | null;
};

export type OrganizationType = {
  _id: string;
  name: string;
};

export type AttendanceForStudentType = {
  _id: string;
  date: Date;
  batchName: string;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  attendanceRecords: {
    date: Date;
    status: "present" | "absent" | "leave";
  }[];
};

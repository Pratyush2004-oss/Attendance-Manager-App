export type loginInputType = {
  email: string;
  password: string;
};

export type signupInputType = {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "";
  Organization: string[];
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

export type CreateBatchInputType = {
  name: string;
  Organization: string;
};

export type BatchForStudentType = {
  _id: string;
  name: string;
  Organization: {
    name: string;
  };
  teacher: {
    name: string;
  };
  studentCount: number;
};

export type AllBatchesType = {
  _id: string;
  teacherId: {
    name: string;
  };
  name: string;
  Organization: {
    name: string;
  };
  isStudent: boolean;
};

export type BatchForTeacherType = {
  _id: string;
  name: string;
  Organization: {
    name: string;
  };
  batchJoiningCode: string | null;
  studentCount: number;
};

export type Student = {
  _id: string;
  name: string;
  email: string;
};

export type Teacher = {
  _id: string;
  name: string;
  email: string;
  organization: {
    isTeacherVerified: boolean;
  };
};

export type StudentType = {
  _id: string;
  name: string;
  email: string;
  guardian: {
    name: string;
    number: string;
  };
};

export type Add_To_BatchInputType = {
  batchId: string;
  studentIds: string[];
};

export type removeStudentFromBatchInputType = {
  batchId: string;
  studentId: string;
};

export type BatchdetailType = {
  _id: string;
  students: StudentType[];
};

export type batchParamsType = {
  _id: string;
  name: string;
  organizationName: string;
  batchJoiningCode: string;
  studentCount: string;
};

export type JoinBatchInputType = {
  batchId: string;
  batchJoiningCode: string;
};

export type OrganizationType = {
  _id: string;
  name: string;
  isTeacherVerified: boolean;
};

export type OrganizationForAdmin = {
  _id: string;
  name: string;
};

export type MarkAttendaneInputType = {
  batchId: string;
  date: Date;
  records: {
    studentId: string;
    status: "present" | "absent" | "leave";
  }[];
};

export interface AttendanceForStudentType {
  _id: string;
  batchName: string;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  attendanceRecords: AttendaceRecordType[];
}

export type AttendaceRecordType = {
  date: Date;
  status: "present" | "absent" | "leave";
};

export type AttendanceForTeacherType = {
  _id: string;
  batchId: {
    name: string;
  };
  date: Date;
  records: RecordType[];
};

export type RecordType = {
  studentId: {
    name: string;
    _id: string;
  };
  status: "present" | "absent" | "leave";
};

export type updateStudentAttendanceInputType = {
  studentId: string;
  batchId: string;
  status: "present" | "absent" | "leave";
  date: Date;
};

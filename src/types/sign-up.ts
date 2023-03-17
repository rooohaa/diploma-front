export interface IMainFormValues {
  email: string;
  password: string;
}

export interface IPersonalInfoFormValues {
  fullName: string;
  lastName: string;
  age: number | null;
  phoneNumber: string;
}

export interface IAcademicPerformanceFormValues {
  major: string;
  faculty: string;
  gpa: string;
}

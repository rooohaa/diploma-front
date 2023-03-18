export interface IMainFormValues {
  email: string
  password: string
}

export interface IPersonalInfoFormValues {
  firstName: string
  lastName: string
  birthdate: Date | null
  phoneNumber: string
}

export interface IAcademicPerformanceFormValues {
  advisor: string
  faculty: string
  gpa: string
}

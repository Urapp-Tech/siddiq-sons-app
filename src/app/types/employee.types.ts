export type GetEmployeesResponse = {
  success: boolean;
  code: number;
  message: string;
  data: EmployeesData;
};

export type EmployeesData = {
  list: Array<Employee>;
  total: number;
};

export type Employee = {
  id: string;
  tenant: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string | null;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  cabin: string | null;
  cabinName: string | null;
};

export type GetEmployeeCabinHistoryResponse = {
  success: boolean;
  code: number;
  message: string;
  data: EmployeeCabinHistoryData;
};

export type EmployeeCabinHistoryData = {
  data: EmployeeCabinHistoryDetails;
  total: number;
};

export type EmployeeCabinHistoryDetails = {
  details: Array<EmployeeCabinHistoryDetail>;
  totalPresentTime: string;
  totalAbsentTime: string;
};

export type EmployeeCabinHistoryDetail = {
  time: string;
  identifier: boolean;
};

export type CreateEmployeePayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: File | null;
};

export type CreateEmployeeResponse = {
  success: boolean;
  code: number;
  message: string;
  data: Employee;
};

export type GetBackOfficeUsersResponse = {
  success: boolean;
  code: number;
  message: string;
  data: BackOfficeUsersData;
};

export type BackOfficeUsersData = {
  list: BackOfficeUser[];
  total: number;
};

export type BackOfficeUser = {
  id: string;
  tenant: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  role: string | null;
  avatar: string | null;
  address: string;
  userType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetEmployeesResponse = {
  success: boolean;
  code: number;
  message: string;
  data: EmployeesData;
};

export type EmployeesData = {
  list: Employee[];
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

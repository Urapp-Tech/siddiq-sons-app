export type GetBackOfficeUsersResponse = {
  success: boolean;
  code: number;
  message: string;
  data: BackOfficeUsersData;
};

export type BackOfficeUsersData = {
  list: Array<BackOfficeUser>;
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

export type CreateBackOfficeUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  userType: string;
};

export type CreateBackOfficeUserResponse = {
  success: boolean;
  code: number;
  message: string;
  data: BackOfficeUser;
};

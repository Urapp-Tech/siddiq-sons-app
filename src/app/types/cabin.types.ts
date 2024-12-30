export type GetCabinsResponse = {
  success: boolean;
  code: number;
  message: string;
  data: CabinsData;
};

export type CabinsData = {
  list: Array<Cabin>;
  total: number;
};

export type Cabin = {
  id: string;
  tenant: string;
  branch: string;
  cabinNumber: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddCabinResponse = {
  success: boolean;
  code: number;
  message: string;
  data: Cabin;
};

export type EditCabinResponse = {
  success: boolean;
  code: number;
  message: string;
  data: Cabin;
};

export type DeleteCabinResponse = {
  success: boolean;
  code: number;
  message: string;
};

export type AssignCabinPayload = {
  cabin: string;
  employee: string;
  tenant: string;
};

export type AssignCabinResponse = {
  success: boolean;
  code: number;
  message: string;
  data: AssignCabinData;
};

export type AssignCabinData = {
  id: string;
  tenant: string;
  cabin: string;
  employee: string;
  isAssign: boolean;
  createdAt: string;
  updatedAt: string;
  cabinName: string;
};

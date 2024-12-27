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

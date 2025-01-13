export type GetOperationCategoriesResponse = {
  success: boolean;
  code: number;
  message: string;
  data: OperationCategoriesData;
};

export type OperationCategoriesData = {
  list: Array<OperationCategory>;
  total: number;
};

export type OperationCategory = {
  id: string;
  tenant: string;
  branch: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

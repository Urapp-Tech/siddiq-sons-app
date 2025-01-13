export type GetOperationCategoryItemsResponse = {
  success: boolean;
  code: number;
  message: string;
  data: OperationCategoryItemsData;
};

export type OperationCategoryItemsData = {
  list: Array<OperationCategoryItem>;
  total: number;
};

export type OperationCategoryItem = {
  id: string;
  tenant: string;
  branch: string;
  operationCategory: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

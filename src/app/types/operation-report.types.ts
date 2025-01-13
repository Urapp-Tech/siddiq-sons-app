export type CreateOperationReportPayload = {
  employee: string;
  operationCategory: string;
  operationCategoryItem: string;
  bno: string;
  qty: string;
};

export type CreateOperationReportResponse = {
  success: boolean;
  code: number;
  message: string;
  data: OperationReportData;
};

export type OperationReportData = {
  id: string;
  tenant: string;
  branch: string;
  employee: string;
  details: Array<OperationReportDetail>;
  createdAt: string;
  updatedAt: string;
};

export type OperationReportDetail = {
  bno: string;
  qty: string;
  time: string;
  operationCategory: {
    id: string;
    name: string;
  };
  operationCategoryItem: {
    id: string;
    name: string;
  };
};

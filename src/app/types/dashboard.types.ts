export type GetDashboardActivityResponse = {
  success: boolean;
  code: number;
  message: string;
  data: DashboardActivityData;
};

export type DashboardActivityData = {
  totalActiveCabins: number;
  totalActiveAssignedCabins: number;
  totalActiveEmployees: number;
};

import type { DashboardFilter } from "../../types/dashboard.type";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  data: (filter: DashboardFilter) => [...dashboardKeys.all, "data", filter] as const,
};

import { queryClient } from "@/lib/query-client";
import { useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { getDashboardData } from "../api";
import { dashboardKeys } from "../key";
import type { DashboardData, DashboardFilter } from "../../../types/dashboard.type";

export function useGetDashboardData(
  filter: DashboardFilter
): UseSuspenseQueryResult<DashboardData, Error> {
  return useSuspenseQuery<DashboardData, Error>({
    queryKey: dashboardKeys.data(filter),
    queryFn: () => getDashboardData(filter),
  });
}

export async function ensureGetDashboardData(filter: DashboardFilter): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: dashboardKeys.data(filter),
    queryFn: () => getDashboardData(filter),
  });
}

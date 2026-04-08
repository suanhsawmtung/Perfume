import axios from "@/lib/api";
import type { DashboardData, DashboardFilter } from "../../types/dashboard.type";

export const getDashboardData = async (filter: DashboardFilter) => {
  const response = await axios.get<{ data: DashboardData }>("/admin/dashboard", {
    params: filter,
  });
  return response.data.data;
};

import { ensureGetDashboardData } from "@/services/dashboard/queries/useGetDashboardData";
import { type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") || undefined;

  try {
    await ensureGetDashboardData({ filter });
    return null;
  } catch (error: any) {
    throw error;
  }
}

import { ensureListInventories } from "@/services/inventory/queries/useGetInventories";
import { type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const search = searchParams.get("search") || undefined;

  const limit = 10;
  const offset = (page - 1) * limit;

  // We default to PURCHASE for pre-fetching in the loader
  try {
    await ensureListInventories("PURCHASE", {
      limit,
      offset,
      search,
    });

    return null;
  } catch (error: any) {
    throw error;
  }
}

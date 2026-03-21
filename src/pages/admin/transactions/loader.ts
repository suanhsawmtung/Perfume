import { ensureListTransactions } from "@/services/transaction/queries/useGetTransactions";
import type { TransactionDirection, TransactionTypeEnum } from "@/types/transaction.type";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const pageParam = searchParams.get("page");
  let page = 1;

  if (pageParam !== null) {
    const parsedPage = Number(pageParam);
    if (Number.isNaN(parsedPage) || parsedPage < 0) {
      const cleanUrl = new URL("/admin/transactions", request.url);
      const searchParam = searchParams.get("search");
      const typeParam = searchParams.get("type");
      const directionParam = searchParams.get("direction");
      
      if (searchParam) cleanUrl.searchParams.set("search", searchParam);
      if (typeParam) cleanUrl.searchParams.set("type", typeParam);
      if (directionParam) cleanUrl.searchParams.set("direction", directionParam);
      
      return redirect(cleanUrl.toString());
    }
    page = parsedPage;
  }

  const searchParam = searchParams.get("search");
  const search =
    typeof searchParam === "string" && searchParam.trim().length > 0
      ? searchParam.trim()
      : undefined;

  const typeParam = searchParams.get("type");
  const type = typeParam || undefined;

  const directionParam = searchParams.get("direction");
  const direction = directionParam || undefined;

  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    await ensureListTransactions({
      limit,
      offset,
      search,
      type: type as TransactionTypeEnum,
      direction: direction as TransactionDirection,
    });

    return null;
  } catch (error: any) {
    throw error;
  }
}

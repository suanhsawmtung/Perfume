import { DEFAULT_LIMIT } from "@/services/product-rating/api";
import { ensureListProductRatings } from "@/services/product-rating/queries/useGetListProductRatings";
import { ensureListProductRatingSummary } from "@/services/product-rating/queries/useGetListProductRatingSummary";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const pathname = url.pathname;

  const pageParam = searchParams.get("page");
  let page = 1;

  if (pageParam !== null) {
    const parsedPage = Number(pageParam);
    if (Number.isNaN(parsedPage) || parsedPage < 1) {
      const cleanUrl = new URL(pathname, request.url);
      const searchParam = searchParams.get("search");
      if (searchParam) {
        cleanUrl.searchParams.set("search", searchParam);
      }
      return redirect(cleanUrl.toString());
    }
    page = parsedPage;
  }

  const searchParam = searchParams.get("search");
  const search =
    typeof searchParam === "string" && searchParam.trim().length > 0
      ? searchParam.trim()
      : undefined;

  const offset = (page - 1) * DEFAULT_LIMIT;

  try {
    if (pathname.endsWith("/summary")) {
      await ensureListProductRatingSummary({
        offset,
        search,
        limit: DEFAULT_LIMIT,
      });
    } else {
      await ensureListProductRatings({
        offset,
        search,
        limit: DEFAULT_LIMIT,
      });
    }

    return null;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Response("Invalid query parameters", { status: 400 });
    }
    throw error;
  }
}

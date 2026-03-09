import { DEFAULT_LIMIT } from "@/services/review/api";
import { ensureListReviews } from "@/services/review/queries/useGetReviews";

import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const pageParam = searchParams.get("page");
  let page = 1;

  if (pageParam !== null) {
    const parsedPage = Number(pageParam);
    if (Number.isNaN(parsedPage) || parsedPage < 1) {
      const cleanUrl = new URL("/admin/reviews", request.url);
      ["search", "status", "user", "product"].forEach(param => {
        const value = searchParams.get(param);
        if (value) cleanUrl.searchParams.set(param, value);
      });
      return redirect(cleanUrl.toString());
    }
    page = parsedPage;
  }

  const search = searchParams.get("search") || undefined;
  const statusParam = searchParams.get("status");
  const status = (statusParam === "publish" || statusParam === "unpublish") ? statusParam : undefined;
  const user = searchParams.get("user") || undefined;
  const product = searchParams.get("product") || undefined;

  const offset = (page - 1) * DEFAULT_LIMIT;

  try {
    await ensureListReviews({
      offset,
      search,
      limit: DEFAULT_LIMIT,
      status,
      user,
      product,
    });

    return null;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Response("Invalid query parameters", { status: 400 });
    }
    throw error;
  }
}

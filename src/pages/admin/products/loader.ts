import { DEFAULT_LIMIT } from "@/services/product/api";
import { ensureListProducts } from "@/services/product/queries/useGetProducts";
import { isConcentration, isGender } from "@/lib/utils";

import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

// Loader for products list page - fetches all products with pagination
// Uses page parameter from URL (page 1, 2, 3, ...)
// If page is invalid or not a number, redirects to remove it from URL
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // Parse page parameter
  const pageParam = searchParams.get("page");
  let page = 1;

  if (pageParam !== null) {
    const parsedPage = Number(pageParam);
    if (Number.isNaN(parsedPage) || parsedPage < 0) {
      // Invalid page parameter - redirect to remove it from URL
      const cleanUrl = new URL("/admin/products", request.url);
      const searchParam = searchParams.get("search");
      if (searchParam) {
        cleanUrl.searchParams.set("search", searchParam);
      }
      return redirect(cleanUrl.toString());
    }
    page = parsedPage;
  }

  // Parse search parameter
  const searchParam = searchParams.get("search");
  const search =
    typeof searchParam === "string" && searchParam.trim().length > 0
      ? searchParam.trim()
      : undefined;

  // Parse brand parameter
  const brandParam = searchParams.get("brand");
  const brand =
    typeof brandParam === "string" && brandParam.trim().length > 0
      ? brandParam.trim()
      : undefined;

  // Parse gender parameter
  const genderParam = searchParams.get("gender");
  const gender = isGender(genderParam) ? genderParam : undefined;

  // Parse concentration parameter
  const concentrationParam = searchParams.get("concentration");
  const concentration = isConcentration(concentrationParam)
    ? concentrationParam
    : undefined;

  // Parse boolean parameters
  const parseBoolean = (value: string | null) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
  };

  const isActive = parseBoolean(searchParams.get("isActive"));
  const isLimited = parseBoolean(searchParams.get("isLimited"));

  // Convert page to offset (page 1 = offset 0, page 2 = offset 10, etc.)
  const offset = (page - 1) * DEFAULT_LIMIT;

  try {
    await ensureListProducts({
      offset,
      search,
      limit: DEFAULT_LIMIT,
      brand,
      gender,
      concentration,
      isActive,
      isLimited,
    });

    return null;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Response("Invalid query parameters", { status: 400 });
    }
    throw error;
  }
}

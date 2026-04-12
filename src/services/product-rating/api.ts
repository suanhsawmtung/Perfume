import api from "@/lib/api";
import type {
  ProductRatingListResult,
  ProductRatingQueryParams,
  ProductRatingSummaryListResult,
} from "@/types/product-rating.type";

export const DEFAULT_LIMIT = 10;

export async function fetchProductRatings(
  options: ProductRatingQueryParams
): Promise<ProductRatingListResult> {
  const { offset = 0, search, limit = 10, product, user } = options;

  const queryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(product && { product }),
    ...(user && { user }),
  };

  const response = await api.get("/admin/product-ratings", {
    params: queryParams,
  });

  return response.data?.data || { items: [], currentPage: 0, totalPages: 0, pageSize: 10 };
}

export async function fetchProductRatingSummary(
  options: ProductRatingQueryParams
): Promise<ProductRatingSummaryListResult> {
  const { offset = 0, search, limit = 10, product } = options;

  const queryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(product && { product }),
  };

  const response = await api.get("/admin/product-ratings/summary", {
    params: queryParams,
  });

  return response.data?.data || { summaries: [], currentPage: 0, totalPages: 0, pageSize: 10 };
}

import { queryClient } from "@/lib/query-client";
import type { ProductRatingQueryParams, ProductRatingSummaryListResult } from "@/types/product-rating.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProductRatingSummary } from "../api";
import { productRatingQueryKeys } from "../key";

export function useListProductRatingSummary(
  params: ProductRatingQueryParams,
): UseSuspenseQueryResult<ProductRatingSummaryListResult, Error> {
  return useSuspenseQuery<ProductRatingSummaryListResult, Error>({
    queryKey: productRatingQueryKeys.summaryList(params),
    queryFn: () => fetchProductRatingSummary(params),
  });
}

export async function ensureListProductRatingSummary(
  params: ProductRatingQueryParams,
): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: productRatingQueryKeys.summaryList(params),
    queryFn: () => fetchProductRatingSummary(params),
  });
}

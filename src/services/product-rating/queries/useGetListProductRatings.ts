import { queryClient } from "@/lib/query-client";
import type { ProductRatingListResult, ProductRatingQueryParams } from "@/types/product-rating.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProductRatings } from "../api";
import { productRatingQueryKeys } from "../key";

export function useListProductRatings(
  params: ProductRatingQueryParams,
): UseSuspenseQueryResult<ProductRatingListResult, Error> {
  return useSuspenseQuery<ProductRatingListResult, Error>({
    queryKey: productRatingQueryKeys.list(params),
    queryFn: () => fetchProductRatings(params),
  });
}

export async function ensureListProductRatings(
  params: ProductRatingQueryParams,
): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: productRatingQueryKeys.list(params),
    queryFn: () => fetchProductRatings(params),
  });
}

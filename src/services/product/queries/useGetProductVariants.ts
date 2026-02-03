import { queryClient } from "@/lib/query-client";
import type { ProductVariantsSummaryType } from "@/types/product.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProductVariants } from "../api";
import { productQueryKeys } from "../key";

export function useGetProductVariants(
  slug: string,
): UseSuspenseQueryResult<ProductVariantsSummaryType, Error> {
  return useSuspenseQuery<ProductVariantsSummaryType, Error>({
    queryKey: productQueryKeys.variants(slug),
    queryFn: () => fetchProductVariants(slug),
  });
}

export async function ensureProductVariants(slug: string): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: productQueryKeys.variants(slug),
    queryFn: () => fetchProductVariants(slug),
  });
}

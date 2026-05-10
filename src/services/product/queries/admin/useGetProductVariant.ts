import { queryClient } from "@/lib/query-client";
import type { ProductVariantDetailType } from "@/types/product.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchAdminProductVariant } from "../../api";
import { productQueryKeys } from "../../key";

export function useGetProductVariant(
  slug: string,
  variantSlug: string,
): UseSuspenseQueryResult<ProductVariantDetailType, Error> {
  return useSuspenseQuery<ProductVariantDetailType, Error>({
    queryKey: productQueryKeys.admin.variantDetail(slug, variantSlug),
    queryFn: () => fetchAdminProductVariant(slug, variantSlug),
  });
}

export async function ensureProductVariant(
  slug: string,
  variantSlug: string,
): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: productQueryKeys.admin.variantDetail(slug, variantSlug),
    queryFn: () => fetchAdminProductVariant(slug, variantSlug),
  });
}

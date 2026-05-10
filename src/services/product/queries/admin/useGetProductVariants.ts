import { queryClient } from "@/lib/query-client";
import type { AdminProductDetailType } from "@/types/product.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchAdminProductVariants } from "../../api";
import { productQueryKeys } from "../../key";

export function useGetProductVariants(
  slug: string,
): UseSuspenseQueryResult<AdminProductDetailType, Error> {
  return useSuspenseQuery<AdminProductDetailType, Error>({
    queryKey: productQueryKeys.admin.variants(slug),
    queryFn: () => fetchAdminProductVariants(slug),
  });
}

export async function ensureProductVariants(slug: string): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: productQueryKeys.admin.variants(slug),
    queryFn: () => fetchAdminProductVariants(slug),
  });
}

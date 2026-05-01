import { queryClient } from "@/lib/query-client";
import type { AdminProductDetailType } from "@/types/product.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProduct } from "../api";
import { productQueryKeys } from "../key";

export function useGetProduct(
  slug: string,
): UseSuspenseQueryResult<AdminProductDetailType, Error> {
  return useSuspenseQuery<AdminProductDetailType, Error>({
    queryKey: productQueryKeys.detail(slug),
    queryFn: () => fetchProduct(slug),
  });
}

export async function ensureProduct(slug: string): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: productQueryKeys.detail(slug),
    queryFn: () => fetchProduct(slug),
  });
}

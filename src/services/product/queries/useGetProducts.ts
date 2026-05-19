import { queryClient } from "@/lib/query-client";
import type { ProductCardType, ProductListResult } from "@/types/product.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { productQueryKeys, type ProductListQueryOptions } from "../key";

export function useListProducts(
  params: ProductListQueryOptions,
): UseSuspenseQueryResult<ProductListResult<ProductCardType>, Error> {
  const {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isLimited,
  } = params;

  const listOptions: ProductListQueryOptions = {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isLimited,
  };

  return useSuspenseQuery<ProductListResult<ProductCardType>, Error>({
    queryKey: productQueryKeys.list(listOptions),
    queryFn: () => fetchProducts(listOptions),
  });
}

export async function ensureListProducts(
  params: ProductListQueryOptions,
): Promise<void> {
  const {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isLimited,
  } = params;

  const listOptions: ProductListQueryOptions = {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isLimited,
  };

  await queryClient.ensureQueryData({
    queryKey: productQueryKeys.list(listOptions),
    queryFn: () => fetchProducts(listOptions),
  });
}

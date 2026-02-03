import { queryClient } from "@/lib/query-client";
import type { ProductListResult } from "@/types/product.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { productQueryKeys, type ProductListQueryOptions } from "../key";

type UseListProductsParams = ProductListQueryOptions & {
  offset: number;
};

export function useListProducts(
  params: UseListProductsParams,
): UseSuspenseQueryResult<ProductListResult, Error> {
  const {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  } = params;

  const listOptions: ProductListQueryOptions = {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  };

  return useSuspenseQuery<ProductListResult, Error>({
    queryKey: productQueryKeys.list(listOptions),
    queryFn: () => fetchProducts(listOptions),
  });
}

export async function ensureListProducts(
  params: UseListProductsParams,
): Promise<void> {
  const {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  } = params;

  const listOptions: ProductListQueryOptions = {
    offset,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  };

  await queryClient.ensureQueryData({
    queryKey: productQueryKeys.list(listOptions),
    queryFn: () => fetchProducts(listOptions),
  });
}

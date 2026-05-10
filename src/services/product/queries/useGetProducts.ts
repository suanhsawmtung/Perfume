import { queryClient } from "@/lib/query-client";
import type { ProductCardType, ProductListResult } from "@/types/product.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { productQueryKeys, type ProductListQueryOptions } from "../key";

type UseListProductsParams = Omit<ProductListQueryOptions, "offset"> & {
  page?: number;
};

export function useListProducts(
  params: UseListProductsParams,
): UseSuspenseQueryResult<ProductListResult<ProductCardType>, Error> {
  const {
    page = 1,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  } = params;

  const listOptions: UseListProductsParams = {
    page,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  };

  return useSuspenseQuery<ProductListResult<ProductCardType>, Error>({
    queryKey: productQueryKeys.list({ ...listOptions, offset: (page - 1) * (limit || 8) } as any),
    queryFn: () => fetchProducts(listOptions),
  });
}

export async function ensureListProducts(
  params: UseListProductsParams,
): Promise<void> {
  const {
    page = 1,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  } = params;

  const listOptions: UseListProductsParams = {
    page,
    search,
    limit,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  };

  await queryClient.ensureQueryData({
    queryKey: productQueryKeys.list({ ...listOptions, offset: (page - 1) * (limit || 8) } as any),
    queryFn: () => fetchProducts(listOptions),
  });
}

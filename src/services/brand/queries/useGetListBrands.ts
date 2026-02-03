import { queryClient } from "@/lib/query-client";
import type { BrandListResult } from "@/types/brand.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchBrands } from "../api";
import { brandQueryKeys } from "../key";

interface UseListBrandsParams {
  offset: number;
  search?: string;
  limit?: number;
}

export function useListBrands(
  params: UseListBrandsParams,
): UseSuspenseQueryResult<BrandListResult, Error> {
  const { offset, search, limit } = params;

  return useSuspenseQuery<BrandListResult, Error>({
    queryKey: brandQueryKeys.list({ offset, search, limit }),
    queryFn: () => fetchBrands({ offset, search, limit }),
  });
}

export async function ensureListBrands(
  params: UseListBrandsParams,
): Promise<void> {
  const { offset, search, limit } = params;

  await queryClient.ensureQueryData({
    queryKey: brandQueryKeys.list({ offset, search, limit }),
    queryFn: () => fetchBrands({ offset, search, limit }),
  });
}

import { queryClient } from "@/lib/query-client";
import type { BrandListType } from "@/types/brand.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchBrand } from "../api";
import { brandQueryKeys } from "../key";

export function useBrand(
  slug: string,
): UseSuspenseQueryResult<BrandListType, Error> {
  return useSuspenseQuery<BrandListType, Error>({
    queryKey: brandQueryKeys.detail(slug),
    queryFn: () => fetchBrand(slug),
  });
}

export async function ensureBrand(slug: string): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: brandQueryKeys.detail(slug),
    queryFn: () => fetchBrand(slug),
  });
}

import { queryClient } from "@/lib/query-client";
import type { BrandType } from "@/types/brand.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchBrand } from "../api";
import { brandQueryKeys } from "../key";

export function useBrand(
  slug: string,
): UseSuspenseQueryResult<BrandType, Error> {
  return useSuspenseQuery<BrandType, Error>({
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

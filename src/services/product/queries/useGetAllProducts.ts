import type { CommonProductResult } from "@/types/product.type";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchAllProducts } from "../api";
import { productQueryKeys } from "../key";

export function useGetAllProducts(
  limit?: number,
  cursor?: number,
  enabled = true,
): UseQueryResult<CommonProductResult, Error> {
  return useQuery<CommonProductResult, Error>({
    queryKey: productQueryKeys.all,
    queryFn: () => fetchAllProducts(limit, cursor),
    enabled,
  });
}

import type { CommonProductResult } from "@/types/product.type";
import {
    useInfiniteQuery,
    type InfiniteData,
    type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { fetchAllProducts } from "../api";
import { productQueryKeys } from "../key";

export function useGetInfiniteProducts(
  limit = 20,
  enabled = true,
): UseInfiniteQueryResult<InfiniteData<CommonProductResult, number | undefined>, Error> {
  return useInfiniteQuery({
    queryKey: [...productQueryKeys.all, "infinite", { limit }],
    queryFn: ({ pageParam }) => fetchAllProducts(limit, pageParam as number | undefined),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled,
  });
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBrandSelectOptions } from "../api";
import { brandQueryKeys } from "../key";
import type { CursorPaginationResultT, SelectOptionT } from "@/types";

export function useGetInfiniteBrands(search: string) {
  return useInfiniteQuery<CursorPaginationResultT<SelectOptionT>>({
    queryKey: brandQueryKeys.selectOptions(search),
    queryFn: ({ pageParam }) =>
      fetchBrandSelectOptions({
        search,
        cursor: pageParam as number | null,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 30_000,
  });
}

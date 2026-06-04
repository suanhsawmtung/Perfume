import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../api";
import { userQueryKeys } from "../key";
import type { CursorPaginationResultT, SelectOptionT } from "@/types";

export function useGetInfiniteUsers(limit = 20, enabled = true) {
  return useInfiniteQuery<CursorPaginationResultT<SelectOptionT>>({
    queryKey: [...userQueryKeys.all, "infinite", { limit }],
    queryFn: ({ pageParam }) => fetchAllUsers(limit, pageParam as number | null),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled,
  });
}

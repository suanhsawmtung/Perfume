import type { CommonUserResult } from "@/types/user.type";
import {
    useInfiniteQuery,
    type InfiniteData,
    type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { fetchAllUsers } from "../api";
import { userQueryKeys } from "../key";

export function useGetInfiniteUsers(
  limit = 20,
  enabled = true,
): UseInfiniteQueryResult<InfiniteData<CommonUserResult, number | undefined>, Error> {
  return useInfiniteQuery({
    queryKey: [...userQueryKeys.all, "infinite", { limit }],
    queryFn: ({ pageParam }) => fetchAllUsers(limit, pageParam as number | undefined),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled,
  });
}

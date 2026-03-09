import type { CommonUserResult } from "@/types/user.type";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchAllUsers } from "../api";
import { userQueryKeys } from "../key";

export function useGetAllUsers(
  limit?: number,
  cursor?: number,
  enabled = true,
): UseQueryResult<CommonUserResult, Error> {
  return useQuery<CommonUserResult, Error>({
    queryKey: userQueryKeys.all,
    queryFn: () => fetchAllUsers(limit, cursor),
    enabled,
  });
}

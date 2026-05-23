import { queryClient } from "@/lib/query-client";
import type { MyProfileT } from "@/types/profile";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProfile } from "../api";
import { profileQueryKeys } from "../key";

export function useGetProfile(): UseSuspenseQueryResult<MyProfileT, Error> {
  return useSuspenseQuery<MyProfileT, Error>({
    queryKey: profileQueryKeys.detail(),
    queryFn: () => fetchProfile(),
  });
}

export async function ensureProfile(): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: profileQueryKeys.detail(),
    queryFn: () => fetchProfile(),
  });
}

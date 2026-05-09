import { queryClient } from "@/lib/query-client";
import type { Gender } from "@/stores/preference.store";
import type { HomeData } from "@/types/home.type";
import {
    useSuspenseQuery,
    type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchHomeData } from "../api";
import { homeQueryKeys } from "../key";

export function useHomeData(
  gender?: Gender | null,
): UseSuspenseQueryResult<HomeData, Error> {
  return useSuspenseQuery<HomeData, Error>({
    queryKey: homeQueryKeys.data(gender),
    queryFn: () => fetchHomeData(gender),
  });
}

export async function ensureHomeData(params: {
  gender?: Gender | null;
}): Promise<void> {
  const { gender } = params;

  await queryClient.ensureQueryData({
    queryKey: homeQueryKeys.data(gender),
    queryFn: () => fetchHomeData(gender),
  });
}

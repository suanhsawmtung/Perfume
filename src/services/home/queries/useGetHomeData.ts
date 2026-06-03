import { queryClient } from "@/lib/query-client";
import type { Gender } from "@/stores/preference.store";
import type { HomeDataT } from "@/types/home.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchHomeData } from "../api";
import { homeQueryKeys } from "../key";

export function useHomeData(
  params: {
    gender?: Gender | null;
    userId?: number | null;
  },
): UseSuspenseQueryResult<HomeDataT, Error> {
  return useSuspenseQuery<HomeDataT, Error>({
    queryKey: homeQueryKeys.data(params),
    queryFn: () => fetchHomeData(params.gender),
  });
}

export async function ensureHomeData(params: {
  gender?: Gender | null;
  userId?: number | null;
}): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: homeQueryKeys.data(params),
    queryFn: () => fetchHomeData(params.gender),
  });
}

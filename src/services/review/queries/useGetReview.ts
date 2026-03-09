import { queryClient } from "@/lib/query-client";
import type { ReviewListType } from "@/types/review.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchReview } from "../api";
import { reviewQueryKeys } from "../key";

export function useGetReview(
  id: number,
): UseSuspenseQueryResult<ReviewListType, Error> {
  return useSuspenseQuery<ReviewListType, Error>({
    queryKey: reviewQueryKeys.detail(id),
    queryFn: () => fetchReview(id),
  });
}

export async function ensureGetReview(id: number): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: reviewQueryKeys.detail(id),
    queryFn: () => fetchReview(id),
  });
}

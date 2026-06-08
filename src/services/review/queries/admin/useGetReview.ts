import { queryClient } from "@/lib/query-client";
import type { ReviewListType } from "@/types/review.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchAdminReview } from "../../api";
import { reviewQueryKeys } from "../../key";

export function useGetReview(
  id: number,
): UseSuspenseQueryResult<ReviewListType, Error> {
  return useSuspenseQuery<ReviewListType, Error>({
    queryKey: reviewQueryKeys.admin.detail(id),
    queryFn: () => fetchAdminReview(id),
  });
}

export async function ensureGetReview(id: number): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: reviewQueryKeys.admin.detail(id),
    queryFn: () => fetchAdminReview(id),
  });
}

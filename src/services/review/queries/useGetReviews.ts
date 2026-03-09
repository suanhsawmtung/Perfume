import { queryClient } from "@/lib/query-client";
import type { ReviewListResult } from "@/types/review.type";
import {
    useSuspenseQuery,
    type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchReviews } from "../api";
import { reviewQueryKeys } from "../key";

interface UseListReviewsParams {
  offset: number;
  search?: string;
  limit?: number;
  status?: string;
  user?: string;
  product?: string;
}

export function useListReviews(
  params: UseListReviewsParams,
): UseSuspenseQueryResult<ReviewListResult, Error> {
  const { offset, search, limit, status, user, product } = params;

  return useSuspenseQuery<ReviewListResult, Error>({
    queryKey: reviewQueryKeys.list({ offset, search, limit, status, user, product }),
    queryFn: () => fetchReviews({ offset, search, limit, status, user, product }),
  });
}

export async function ensureListReviews(
  params: UseListReviewsParams,
): Promise<void> {
  const { offset, search, limit, status, user, product } = params;

  await queryClient.ensureQueryData({
    queryKey: reviewQueryKeys.list({ offset, search, limit, status, user, product }),
    queryFn: () => fetchReviews({ offset, search, limit, status, user, product }),
  });
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReviews } from "../api";
import type { CursorPaginationResultT } from "@/types";
import { reviewQueryKeys } from "../key";
import type { ReviewQueryParams, ReviewType } from "@/types/review.type";

export function useGetInfiniteReviews(
    userId: number,
    params: ReviewQueryParams,
) {
    return useInfiniteQuery<CursorPaginationResultT<ReviewType>>({
        queryKey: reviewQueryKeys.list(userId, params),
        queryFn: ({ pageParam }) =>
            fetchReviews({
                cursor: pageParam as number | null,
                limit: params.limit,
                search: params.search,
                status: params.status
            }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        staleTime: 30_000,
    });
}

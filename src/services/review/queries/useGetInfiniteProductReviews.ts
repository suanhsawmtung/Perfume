import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductReviews } from "../api";
import type { CursorPaginationResultT } from "@/types";
import { reviewQueryKeys } from "../key";
import type { ProductReviewType, ReviewQueryParams } from "@/types/review.type";

export function useGetInfiniteProductReviews(
    productId: number,
    params: ReviewQueryParams,
) {
    return useInfiniteQuery<CursorPaginationResultT<ProductReviewType>>({
        queryKey: reviewQueryKeys.productList(productId, params),
        queryFn: ({ pageParam }) =>
            fetchProductReviews(productId, {
                cursor: pageParam as number | null,
                limit: params.limit,
            }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        staleTime: 30_000,
    });
}

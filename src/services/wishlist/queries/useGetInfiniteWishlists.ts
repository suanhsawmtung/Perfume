import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchWishlists } from "../api";
import type { WishlistQueryParams, WishlistType } from "@/types/wishlist.type";
import type { CursorPaginationResultT } from "@/types";
import { wishlistQueryKeys } from "../key";

export function useGetInfiniteWishlists(
    userId: number,
    params: WishlistQueryParams,
) {
    return useInfiniteQuery<CursorPaginationResultT<WishlistType>>({
        queryKey: wishlistQueryKeys.list(userId, params),
        queryFn: ({ pageParam }) =>
            fetchWishlists({
                cursor: pageParam as number | null,
                limit: params.limit,
                search: params.search,
            }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        staleTime: 30_000,
    });
}

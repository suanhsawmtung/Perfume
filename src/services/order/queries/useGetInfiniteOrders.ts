import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api";
import type { OrderQueryParams, OrderType } from "@/types/order.type";
import type { CursorPaginationResultT } from "@/types";
import { orderQueryKeys } from "../key";

export function useGetInfiniteOrders(
    userId: number,
    params: OrderQueryParams,
) {
    return useInfiniteQuery<CursorPaginationResultT<OrderType>>({
        queryKey: orderQueryKeys.list(userId, params),
        queryFn: ({ pageParam }) =>
            fetchOrders({
                cursor: pageParam as number | null,
                limit: params.limit,
                condition: params.condition,
                search: params.search,
            }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        staleTime: 30_000,
    });
}

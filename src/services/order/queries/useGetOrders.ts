import { queryClient } from "@/lib/query-client";
import {
    useSuspenseQuery,
    type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import type { OrderListResult, OrderQueryParams, OrderType } from "@/types/order.type";
import { fetchOrders } from "../api";
import { orderQueryKeys } from "@/services/order/key";
import type { CursorPaginationResultT } from "@/types";

export function useListOrders(
    userId: number,
    params: OrderQueryParams,
): UseSuspenseQueryResult<CursorPaginationResultT<OrderType>, Error> {
    const {
        cursor,
        search,
        limit,
        condition
    } = params;

    const listOptions: OrderQueryParams = {
        cursor,
        search,
        limit,
        condition
    };

    return useSuspenseQuery<CursorPaginationResultT<OrderType>, Error>({
        queryKey: orderQueryKeys.list(userId, listOptions),
        queryFn: () => fetchOrders(listOptions),
    });
}

export async function ensureListOrders(
    userId: number,
    params: OrderQueryParams,
): Promise<void> {
    const {
        cursor,
        search,
        condition,
        limit,
    } = params;

    const listOptions: OrderQueryParams = {
        cursor,
        search,
        condition,
        limit,
    };

    await queryClient.ensureQueryData({
        queryKey: orderQueryKeys.list(userId, listOptions),
        queryFn: () => fetchOrders(listOptions),
    });
}

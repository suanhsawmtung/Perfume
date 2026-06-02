import { queryClient } from "@/lib/query-client";
import {
    useSuspenseQuery,
    type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import type { OrderListResult, OrderQueryParams, OrderType } from "@/types/order.type";
import { fetchOrders } from "../api";
import { orderQueryKeys } from "@/services/order/key";

export function useListOrders(
    userId: number,
    params: OrderQueryParams,
): UseSuspenseQueryResult<OrderListResult<OrderType>, Error> {
    const {
        offset,
        search,
        limit,
        condition
    } = params;

    const listOptions: OrderQueryParams = {
        offset,
        search,
        limit,
        condition
    };

    return useSuspenseQuery<OrderListResult<OrderType>, Error>({
        queryKey: orderQueryKeys.list(userId, listOptions),
        queryFn: () => fetchOrders(listOptions),
    });
}

export async function ensureListOrders(
    userId: number,
    params: OrderQueryParams,
): Promise<void> {
    const {
        offset,
        search,
        condition,
        limit,
    } = params;

    const listOptions: OrderQueryParams = {
        offset,
        search,
        condition,
        limit,
    };

    await queryClient.ensureQueryData({
        queryKey: orderQueryKeys.list(userId, listOptions),
        queryFn: () => fetchOrders(listOptions),
    });
}

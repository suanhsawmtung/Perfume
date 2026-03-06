import { queryClient } from "@/lib/query-client";
import type { OrderListResult, OrderQueryParams } from "@/types/order.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchOrders } from "../api";
import { orderQueryKeys } from "../key";

export function useListOrders(
  params: OrderQueryParams,
): UseSuspenseQueryResult<OrderListResult, Error> {
  const { offset, search, limit, status, paymentStatus, source } = params;

  return useSuspenseQuery<OrderListResult, Error>({
    queryKey: orderQueryKeys.list({ offset, search, limit, status, paymentStatus, source }),
    queryFn: () => fetchOrders({ offset, search, limit, status, paymentStatus, source }),
  });
}

export async function ensureListOrders(
  params: OrderQueryParams,
): Promise<void> {
  const { offset, search, limit, status, paymentStatus, source } = params;

  await queryClient.ensureQueryData({
    queryKey: orderQueryKeys.list({ offset, search, limit, status, paymentStatus, source }),
    queryFn: () => fetchOrders({ offset, search, limit, status, paymentStatus, source }),
  });
}


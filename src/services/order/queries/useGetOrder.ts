import { queryClient } from "@/lib/query-client";
import type { OrderDetailType } from "@/types/order.type";
import {
    useSuspenseQuery,
    type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchOrder } from "../api";
import { orderQueryKeys } from "../key";

export function useGetOrder(
  code: string,
): UseSuspenseQueryResult<OrderDetailType, Error> {
  return useSuspenseQuery<OrderDetailType, Error>({
    queryKey: orderQueryKeys.detail(code),
    queryFn: () => fetchOrder(code),
  });
}

export async function ensureOrder(code: string): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: orderQueryKeys.detail(code),
    queryFn: () => fetchOrder(code),
  });
}

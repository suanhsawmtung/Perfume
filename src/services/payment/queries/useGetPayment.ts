import { queryClient } from "@/lib/query-client";
import type { PaymentType } from "@/types/payment.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { getPayment } from "../api";
import { paymentQueryKeys } from "../key";

export function useGetPayment(
  id: number
): UseSuspenseQueryResult<PaymentType, Error> {
  return useSuspenseQuery<PaymentType, Error>({
    queryKey: paymentQueryKeys.detail(id),
    queryFn: () => getPayment(id),
  });
}

export async function ensurePayment(id: number): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: paymentQueryKeys.detail(id),
    queryFn: () => getPayment(id),
  });
}

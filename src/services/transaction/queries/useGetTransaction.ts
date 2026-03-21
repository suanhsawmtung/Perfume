import { queryClient } from "@/lib/query-client";
import { getTransaction } from "@/services/transaction/api";
import { transactionQueryKeys } from "@/services/transaction/key";
import type { TransactionType } from "@/types/transaction.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";

export function useGetTransaction(
  id: number
): UseSuspenseQueryResult<TransactionType, Error> {
  return useSuspenseQuery<TransactionType, Error>({
    queryKey: transactionQueryKeys.detail(id),
    queryFn: () => getTransaction(id),
  });
}

export async function ensureTransaction(id: number): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: transactionQueryKeys.detail(id),
    queryFn: () => getTransaction(id),
  });
}

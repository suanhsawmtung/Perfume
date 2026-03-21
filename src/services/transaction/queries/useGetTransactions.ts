import { queryClient } from "@/lib/query-client";
import { listTransactions } from "@/services/transaction/api";
import { transactionQueryKeys } from "@/services/transaction/key";
import type { TransactionListResult, TransactionQueryParams } from "@/types/transaction.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";

export function useListTransactions(
  params: TransactionQueryParams
): UseSuspenseQueryResult<TransactionListResult, Error> {
  return useSuspenseQuery<TransactionListResult, Error>({
    queryKey: transactionQueryKeys.list(params),
    queryFn: () => listTransactions(params),
  });
}

export async function ensureListTransactions(params: TransactionQueryParams): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: transactionQueryKeys.list(params),
    queryFn: () => listTransactions(params),
  });
}

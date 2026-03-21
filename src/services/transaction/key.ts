import type { TransactionQueryParams } from "@/types/transaction.type";

export const transactionQueryKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionQueryKeys.all, "list"] as const,
  list: (params: TransactionQueryParams) => [...transactionQueryKeys.lists(), params] as const,
  details: () => [...transactionQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...transactionQueryKeys.details(), id] as const,
};

import { queryClient } from "@/lib/query-client";
import { deleteTransaction } from "@/services/transaction/api";
import { transactionQueryKeys } from "@/services/transaction/key";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTransactionMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all });
      toast.success(response.message || "Transaction deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete transaction"
      );
    },
  });
};

import { orderQueryKeys } from "@/services/order/key";
import type { RefundFormValues } from "@/types/refund.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createRefund } from "../api";
import { refundQueryKeys } from "../key";

export function useCreateRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RefundFormValues) => createRefund(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: refundQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
      toast.success("Refund created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create refund");
    },
  });
}

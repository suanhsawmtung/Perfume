import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { voidPayment } from "../api";
import { paymentQueryKeys } from "../key";

export const useVoidPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => voidPayment(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all });
      toast.success(data.message || "Payment voided successfully.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to void payment.");
    },
  });
};

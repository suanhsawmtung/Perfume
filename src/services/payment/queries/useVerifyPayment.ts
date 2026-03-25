import { orderQueryKeys } from "@/services/order/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyPayment } from "../api";
import { paymentQueryKeys } from "../key";

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { 
      id: number; 
      data: { status: "SUCCESS" | "FAILED" } 
    }) => verifyPayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
      toast.success("Payment status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update payment status");
    },
  });
}

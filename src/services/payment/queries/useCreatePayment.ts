import { orderQueryKeys } from "@/services/order/key";
import type { PaymentFormValues } from "@/types/payment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPayment } from "../api";
import { paymentQueryKeys } from "../key";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentFormValues) => createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
      toast.success("Payment created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create payment");
    },
  });
}

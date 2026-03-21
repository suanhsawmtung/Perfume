import { queryClient } from "@/lib/query-client";
import { refundQueryKeys } from "@/services/refund/key";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { voidRefund } from "../api";

export const useVoidRefundMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => voidRefund(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: refundQueryKeys.all });
      toast.success(response.message || "Refund voided successfully");
      navigate("/admin/refunds");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to void refund");
    },
  });
};

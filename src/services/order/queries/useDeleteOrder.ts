import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteOrder } from "../api";
import { orderQueryKeys } from "../key";

export const useDeleteOrderMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: { code: string }) => deleteOrder(params),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: orderQueryKeys.detail(variables.code),
      });

      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      toast.success("Order deleted successfully!");
      navigate("/admin/orders");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete order"
      );
    },
  });
};

import { dashboardKeys } from "@/services/dashboard/key";
import { homeQueryKeys } from "@/services/home/key";
import { inventoryQueryKeys } from "@/services/inventory/key";
import { orderQueryKeys } from "@/services/order/key";
import { productQueryKeys } from "@/services/product/key";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { placeOrder } from "../api";

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.authUser);

  return useMutation({
    mutationFn: ({ data }: { data: FormData }) => {
      if (!user) throw new Error("Unauthorized");
      return placeOrder(data);
    },
    onSuccess: () => {
      if (!user) return;
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: inventoryQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: homeQueryKeys.all,
      });
      toast.success("Order placed successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to place order");
    },
  });
}

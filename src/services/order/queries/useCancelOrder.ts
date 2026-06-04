import { orderQueryKeys } from "@/services/order/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cancelOrder } from "../api";
import type { CancelOrderValues } from "@/types/order.type";
import { useAuthStore } from "@/stores/auth.store";
import { productQueryKeys } from "@/services/product/key";
import { inventoryQueryKeys } from "@/services/inventory/key";
import { dashboardKeys } from "@/services/dashboard/key";
import { homeQueryKeys } from "@/services/home/key";

export function useCancelOrder() {
    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.authUser)

    return useMutation({
        mutationFn: ({ code, data }: { code: string; data: CancelOrderValues }) => {
            if (!user) throw new Error("Unauthorized")
            return cancelOrder(code, data)
        },
        onSuccess: () => {
            if (!user) return
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
            toast.success("Order cancelled successfully")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to cancel order")
        },
    })
}

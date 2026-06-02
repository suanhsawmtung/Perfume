import { orderQueryKeys } from "@/services/order/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cancelOrder } from "../api";
import type { CancelOrderValues } from "@/types/order.type";
import { useAuthStore } from "@/stores/auth.store";

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
            queryClient.invalidateQueries({ queryKey: orderQueryKeys.lists(user.id) })
            toast.success("Order cancelled successfully")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to cancel order")
        },
    })
}

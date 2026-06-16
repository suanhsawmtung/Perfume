import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReview } from "../api";
import { useAuthStore } from "@/stores/auth.store";
import { productQueryKeys } from "@/services/product/key";
import type { CreateReviewParams } from "@/types/review.type";
import { reviewQueryKeys } from "../key";

export function useCreateReview() {
    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.authUser)

    return useMutation({
        mutationFn: ({ productId, data }: { productId: number; data: CreateReviewParams }) => {
            if (!user) throw new Error("Unauthorized")
            return createReview(productId, data)
        },
        onSuccess: () => {
            if (!user) return
            queryClient.invalidateQueries({
                queryKey: reviewQueryKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: productQueryKeys.all,
            });

            toast.success("Review created successfully")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create review")
        },
    })
}

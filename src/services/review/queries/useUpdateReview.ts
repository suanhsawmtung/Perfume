import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateReview } from "../api";
import { useAuthStore } from "@/stores/auth.store";
import { productQueryKeys } from "@/services/product/key";
import type { UpdateReviewParams } from "@/types/review.type";
import { reviewQueryKeys } from "../key";

export function useUpdateReview() {
    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.authUser)

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateReviewParams }) => {
            if (!user) throw new Error("Unauthorized")
            return updateReview(id, data)
        },
        onSuccess: () => {
            if (!user) return
            queryClient.invalidateQueries({
                queryKey: reviewQueryKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: productQueryKeys.all,
            });

            toast.success("Review updated successfully")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update review")
        },
    })
}

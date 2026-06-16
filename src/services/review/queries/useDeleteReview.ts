import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteReview } from "../api";
import { reviewQueryKeys } from "../key";
import { productQueryKeys } from "@/services/product/key";

export const useDeleteReviewMutation = () => {
    return useMutation({
        mutationFn: ({ id, productId }: { id: number, productId: number }) => deleteReview({ id, productId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: reviewQueryKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: productQueryKeys.all,
            });

            toast.success("Review deleted successfully!");
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to delete review"
            );
        },
    });
};

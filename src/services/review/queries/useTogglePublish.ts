import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleReviewPublish } from "../api";
import { reviewQueryKeys } from "../key";
import { homeQueryKeys } from "@/services/home/key";

export function useToggleReviewPublish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleReviewPublish,
    onSuccess: (response) => {
      // Invalidate all review lists to reflect status change
      queryClient.invalidateQueries({ queryKey: reviewQueryKeys.lists });
      // Also invalidate details if any
      queryClient.invalidateQueries({ queryKey: reviewQueryKeys.details });

      queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });

      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to toggle publish status");
    },
  });
}

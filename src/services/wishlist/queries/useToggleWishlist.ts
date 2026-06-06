import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleWishlist } from "../api";
import { wishlistQueryKeys } from "../key";
import { homeQueryKeys } from "@/services/home/key";

export function useToggleWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleWishlist,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: wishlistQueryKeys.all });
            queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });

            toast.success(response.data.message);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update wishlist");
        },
    });
}

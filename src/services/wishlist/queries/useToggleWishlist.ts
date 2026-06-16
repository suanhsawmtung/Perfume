import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleWishlist } from "../api";
import { wishlistQueryKeys } from "../key";
import { homeQueryKeys } from "@/services/home/key";
import type { productQueryKeys } from "@/services/product/key";
import type { ProductDetailType } from "@/types/product.type";
import { profileQueryKeys } from "@/services/profile/key";

export function useToggleWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: {
            id: number,
            action: "add" | "remove",
            queryKey: ReturnType<
                typeof productQueryKeys.detail
            >;
        }) => toggleWishlist(params),

        onMutate: async (params) => {
            console.log("hello")
            await queryClient.cancelQueries({
                queryKey: params.queryKey,
            });

            const previousProduct = queryClient.getQueryData(params.queryKey);

            queryClient.setQueryData(params.queryKey, (old: ProductDetailType) => {
                if (!old) return old;

                return {
                    ...old,
                    isWishlist: !old.isWishlist,
                };
            });

            return { previousProduct };
        },

        onSuccess: (response, params) => {
            queryClient.invalidateQueries({ queryKey: wishlistQueryKeys.all });
            queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });
            queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });

            queryClient.invalidateQueries({ queryKey: params.queryKey });

            toast.success(response.data.message);
        },

        onError: (error: any, params, context) => {
            queryClient.setQueryData(
                params.queryKey,
                context?.previousProduct
            );

            toast.error(error.response?.data?.message || "Failed to update wishlist");
        },

        onSettled: (_data, _err, params) => {
            queryClient.invalidateQueries({
                queryKey: params.queryKey,
            });
        },
    });
}

import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteProductVariant } from "../api";
import { productQueryKeys } from "../key";

export const useDeleteVariantMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: { productSlug: string; variantSlug: string }) =>
      deleteProductVariant(params),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: productQueryKeys.detail(variables.productSlug),
      });

      queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });

      toast.success("Variant deleted successfully!");
      navigate(`/admin/products/${variables.productSlug}/variants`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete variant");
    },
  });
};

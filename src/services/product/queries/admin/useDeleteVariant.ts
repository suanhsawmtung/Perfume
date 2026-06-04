import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteProductVariant } from "../../api";
import { productQueryKeys } from "../../key";
import { orderQueryKeys } from "@/services/order/key";
import { dashboardKeys } from "@/services/dashboard/key";

export const useDeleteVariantMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: { productSlug: string; variantSlug: string }) =>
      deleteProductVariant(params),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: productQueryKeys.admin.detail(variables.productSlug),
      });

      queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      toast.success("Variant deleted successfully!");
      navigate(`/admin/products/${variables.productSlug}/variants`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete variant");
    },
  });
};

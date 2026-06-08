import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteProduct } from "../../api";
import { productQueryKeys } from "../../key";
import { homeQueryKeys } from "@/services/home/key";
import { dashboardKeys } from "@/services/dashboard/key";
import { brandQueryKeys } from "@/services/brand/key";

export const useDeleteProductMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: { slug: string }) => deleteProduct(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productQueryKeys.admin.detail(variables.slug),
      });

      queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: homeQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: brandQueryKeys.all,
      });

      toast.success("Product deleted successfully!");
      navigate("/admin/products");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete product",
      );
    },
  });
};

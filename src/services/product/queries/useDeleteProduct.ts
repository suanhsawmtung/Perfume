import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteProduct } from "../api";
import { productQueryKeys } from "../key";

export const useDeleteProductMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: { slug: string }) => deleteProduct(params),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: productQueryKeys.detail(variables.slug),
      });

      queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
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

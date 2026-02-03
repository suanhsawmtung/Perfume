import { queryClient } from "@/lib/query-client";
import { deleteBrand } from "@/services/brand/api";
import { brandQueryKeys } from "@/services/brand/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

// Action for deleting a brand
export async function action({ params }: ActionFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Brand slug is required", { status: 400 });
  }

  try {
    const response = await deleteBrand({ slug });

    queryClient.removeQueries({
      queryKey: brandQueryKeys.detail(slug),
    });

    await queryClient.invalidateQueries({
      queryKey: brandQueryKeys.lists,
    });

    // Show success toast
    toast.success(response.message || "Brand deleted successfully");

    return redirect("/admin/brands");
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to delete brand");
      return { error: errorData?.message || "Failed to delete brand" };
    }
    throw error;
  }
}

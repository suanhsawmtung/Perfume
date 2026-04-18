import { queryClient } from "@/lib/query-client";
import { updateBrand } from "@/services/brand/api";
import { brandQueryKeys } from "@/services/brand/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

// Action for updating a brand
export async function action({ request, params }: ActionFunctionArgs) {
  const { slug } = params;
  const formData = await request.formData();

  if (!slug) {
    throw new Response("Brand slug is required", { status: 400 });
  }

  const name = formData.get("name") as string;

  if (!name || name.trim().length === 0) {
    toast.error("Brand name is required");
    return { error: "Brand name is required" };
  }

  try {
    const response = await updateBrand({ slug, name });

    await queryClient.invalidateQueries({
      queryKey: brandQueryKeys.detail(slug),
    });

    await queryClient.invalidateQueries({
      queryKey: brandQueryKeys.lists,
    });

    // Show success toast
    toast.success(response.message || "Brand updated successfully");

    return redirect(`/admin/brands`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to update brand");
      return { error: errorData?.message || "Failed to update brand" };
    }
    throw error;
  }
}

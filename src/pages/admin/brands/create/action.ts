import { queryClient } from "@/lib/query-client";
import { createBrand } from "@/services/brand/api";
import { brandQueryKeys } from "@/services/brand/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

// Action for creating a brand
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;

  if (!name || name.trim().length === 0) {
    toast.error("Brand name is required");
    return { error: "Brand name is required" };
  }

  try {
    const response = await createBrand({ name });

    // Show success toast
    toast.success(response.message || "Brand created successfully");

    await queryClient.invalidateQueries({
      queryKey: brandQueryKeys.all,
    });

    // Redirect to brands list page
    return redirect("/admin/brands");
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to create brand");
      return { error: errorData?.message || "Failed to create brand" };
    }
    throw error;
  }
}

import { queryClient } from "@/lib/query-client";
import { createProductVariant } from "@/services/product/api";
import { productQueryKeys } from "@/services/product/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

// Action for creating a product variant
export async function action({ request, params }: ActionFunctionArgs) {
  const { slug } = params;
  const formData = await request.formData();

  if (!slug) {
    throw new Response("Product slug is required", { status: 400 });
  }

  const size = formData.get("size") as string;
  const price = formData.get("price") as string;
  const images = formData.getAll("images");

  if (!size || size.trim().length === 0) {
    toast.error("Size is required");
    return { error: "Size is required" };
  }

  if (!price || price.trim().length === 0) {
    toast.error("Price is required");
    return { error: "Price is required" };
  }

  if (!images || images.length === 0) {
    toast.error("At least one image is required as the primary product image");
    return {
      error: "At least one image is required as the primary product image",
    };
  }

  if (images.length > 4) {
    toast.error("You can upload up to 4 images");
    return { error: "You can upload up to 4 images" };
  }

  try {
    const response = await createProductVariant(slug, formData);

    await queryClient.invalidateQueries({
      queryKey: productQueryKeys.variants(slug),
    });

    await queryClient.invalidateQueries({
      queryKey: productQueryKeys.detail(slug),
    });

    toast.success(response.message || "Product variant created successfully");

    return redirect(`/admin/products/${slug}/variants`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to create product variant");
      return {
        error: errorData?.message || "Failed to create product variant",
      };
    }
    throw error;
  }
}

import { queryClient } from "@/lib/query-client";
import { updateProduct } from "@/services/product/api";
import { productQueryKeys } from "@/services/product/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

// Action for updating a product
export async function action({ request, params }: ActionFunctionArgs) {
  const { slug } = params;
  const formData = await request.formData();

  if (!slug) {
    throw new Response("Product slug is required", { status: 400 });
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const concentration = formData.get("concentration") as string;
  const gender = formData.get("gender") as string;
  const brandId = formData.get("brandId") as string;
  const isActive = formData.get("isActive") as string | null;
  const isLimited = formData.get("isLimited") as string | null;
  const releasedYear = formData.get("releasedYear") as string | null;

  if (!name || name.trim().length === 0) {
    toast.error("Name is required");
    return { error: "Name is required" };
  }

  if (!description || description.trim().length === 0) {
    toast.error("Description is required");
    return { error: "Description is required" };
  }

  if (!concentration || concentration.trim().length === 0) {
    toast.error("Concentration is required");
    return { error: "Concentration is required" };
  }

  if (!gender || gender.trim().length === 0) {
    toast.error("Gender is required");
    return { error: "Gender is required" };
  }

  if (!brandId || brandId.trim().length === 0) {
    toast.error("Brand is required");
    return { error: "Brand is required" };
  }

  try {
    const response = await updateProduct(slug, {
      name,
      description,
      concentration: concentration as any,
      gender: gender as any,
      brandId,
      isActive: isActive ? isActive === "true" : undefined,
      isLimited: isLimited ? isLimited === "true" : undefined,
      releasedYear:
        releasedYear && releasedYear.trim().length > 0
          ? Number(releasedYear)
          : undefined,
    });

    await queryClient.invalidateQueries({
      queryKey: productQueryKeys.detail(slug),
    });

    await queryClient.invalidateQueries({
      queryKey: productQueryKeys.all,
    });

    toast.success(response.message || "Product updated successfully");

    return redirect(`/admin/products/${slug}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to update product");
      return { error: errorData?.message || "Failed to update product" };
    }
    throw error;
  }
}

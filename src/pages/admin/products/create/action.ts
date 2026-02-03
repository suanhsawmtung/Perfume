import { queryClient } from "@/lib/query-client";
import { createProduct } from "@/services/product/api";
import { productQueryKeys } from "@/services/product/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

// Action for creating a product
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
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
    const response = await createProduct({
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
      queryKey: productQueryKeys.all,
    });

    toast.success(response.message || "Product created successfully");

    return redirect("/admin/products");
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to create product");
      return { error: errorData?.message || "Failed to create product" };
    }
    throw error;
  }
}

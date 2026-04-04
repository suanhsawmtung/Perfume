import { queryClient } from "@/lib/query-client";
import { createInventory } from "@/services/inventory/api";
import { inventoryQueryKeys } from "@/services/inventory/key";
import { inventorySchema } from "@/validations/inventory.validation";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData.entries());

  try {
    const validated = inventorySchema.parse(rawData);
    
    const response = await createInventory({
      productVariantId: Number(validated.productVariantId),
      type: validated.type,
      quantity: Number(validated.quantity),
      unitCost: validated.type === "PURCHASE" ? Number(validated.unitCost) : undefined,
    });

    await queryClient.invalidateQueries({
      queryKey: inventoryQueryKeys.all,
    });

    toast.success(response.message || "Inventory record created successfully");

    return redirect("/admin/inventories");
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to create inventory record");
      return { error: errorData?.message || "Failed to create inventory record" };
    }
    throw error;
  }
}

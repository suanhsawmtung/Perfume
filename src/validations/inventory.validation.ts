import { z } from "zod";

export const inventoryBaseSchema = z.object({
  productId: z.string().optional(),
  productVariantId: z.coerce.number().min(1, "Product variant is required"),
  type: z.enum([
    "PURCHASE",
    "SALE",
    "DAMAGED",
    "ADJUSTMENT_IN",
    "ADJUSTMENT_OUT",
    "RETURN_FROM_CUSTOMER",
    "RETURN_TO_SUPPLIER",
  ]),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitCost: z.coerce.number().optional(),
});

export const inventorySchema = inventoryBaseSchema.refine(
  (data) => {
    if (data.type === "PURCHASE") {
      return data.unitCost && data.unitCost > 0;
    }
    return true;
  },
  {
    message: "Unit cost is required for purchases",
    path: ["unitCost"],
  }
);

export type InventoryFormValues = z.infer<typeof inventoryBaseSchema>;

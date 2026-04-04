import type { InventoryType } from "@/types/inventory.type";

export const INVENTORY_TYPES: { label: string; value: InventoryType }[] = [
  { label: "Purchase", value: "PURCHASE" },
  { label: "Sale", value: "SALE" },
  { label: "Damaged", value: "DAMAGED" },
  { label: "Adjustment In", value: "ADJUSTMENT_IN" },
  { label: "Adjustment Out", value: "ADJUSTMENT_OUT" },
  { label: "Return From Customer", value: "RETURN_FROM_CUSTOMER" },
  { label: "Return To Supplier", value: "RETURN_TO_SUPPLIER" },
];
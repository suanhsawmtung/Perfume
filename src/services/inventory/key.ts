import type { InventoryQueryParams } from "@/types/inventory.type";

export const inventoryQueryKeys = {
  all: ["inventories"] as const,
  lists: () => [...inventoryQueryKeys.all, "list"] as const,
  list: (type: string, params: InventoryQueryParams) =>
    [...inventoryQueryKeys.lists(), type, params] as const,
};

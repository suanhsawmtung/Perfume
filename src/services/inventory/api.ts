import api from "@/lib/api";
import { type CreateInventoryParams, type InventoryListResult, type InventoryQueryParams } from "@/types/inventory.type.ts";

export const DEFAULT_LIMIT = 10;

export const listInventories = async (
  type: string,
  params: InventoryQueryParams
): Promise<InventoryListResult> => {
  const response = await api.get(`/admin/inventories/${type}`, {
    params,
  });

  return response.data.data;
};

export const createInventory = async (params: CreateInventoryParams) => {
  const response = await api.post("/admin/inventories", params);
  return response.data;
};

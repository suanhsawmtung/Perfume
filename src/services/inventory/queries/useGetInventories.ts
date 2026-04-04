import { useQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT, listInventories } from "../api";
import { inventoryQueryKeys } from "../key";
import { type InventoryQueryParams } from "@/types/inventory.type.ts";
import { queryClient } from "@/lib/query-client";

export const useListInventories = (type: string, params: InventoryQueryParams) => {
  return useQuery({
    queryKey: inventoryQueryKeys.list(type, params),
    queryFn: () => listInventories(type, { limit: DEFAULT_LIMIT, ...params }),
    placeholderData: (previousData) => previousData,
  });
};

export const ensureListInventories = async (type: string, params: InventoryQueryParams) => {
  return queryClient.ensureQueryData({
    queryKey: inventoryQueryKeys.list(type, params),
    queryFn: () => listInventories(type, { limit: DEFAULT_LIMIT, ...params }),
  });
};

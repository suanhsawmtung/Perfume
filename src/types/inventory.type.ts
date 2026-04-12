import type { VariantSource } from "./product.type";

export type InventoryType =
  | "PURCHASE"
  | "SALE"
  | "DAMAGED"
  | "ADJUSTMENT_IN"
  | "ADJUSTMENT_OUT"
  | "RETURN_FROM_CUSTOMER"
  | "RETURN_TO_SUPPLIER";

export type InventoryItem = {
  id: number;
  productVariantId: number;
  type: InventoryType;
  quantity: number;
  unitCost: string | null;
  totalCost: string | null;
  createdById: number | null;
  createdAt: string;
  updatedAt: string;
  productVariant: {
    sku: string;
    slug: string;
    size: string;
    source: VariantSource;
    product: {
      name: string;
    };
  };
  createdBy: {
    username: string;
    firstName: string;
    lastName: string;
  } | null;
};

export interface InventoryListResult {
  items: InventoryItem[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface InventoryQueryParams {
  limit?: number;
  offset?: number;
  search?: string;
}

export type CreateInventoryParams = {
  productVariantId: number | string;
  type: InventoryType;
  quantity: number | string;
  unitCost?: number | string;
};

export type InventoryActionResult = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

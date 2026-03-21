import type { typeSchema } from "@/validations/common.validation";
import type z from "zod";
import type { ProductListType } from "./product.type";

export type ProductTypeType = {
  id: number;
  name: string;
  slug: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  _count: {
    products: number;
  };
};

export interface TypeListResult {
  types: ProductListType[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface TypeQueryParams {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface CreateTypeParams {
  name: string;
}

export interface CreateTypeResponse {
  success: boolean;
  message: string;
  data: {
    type: ProductListType;
  };
}

export interface UpdateTypeParams {
  slug: string;
  name: string;
}

export interface UpdateTypeResponse {
  success: boolean;
  message: string;
  data: {
    type: ProductListType;
  };
}

export interface DeleteTypeParams {
  slug: string;
}

export interface DeleteTypeResponse {
  success: boolean;
  message: string;
}

export type TypeFormValues = z.infer<typeof typeSchema>;

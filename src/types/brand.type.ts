import type { brandSchema } from "@/validations/common.validation";
import type z from "zod";

export type BrandType = {
  id: number;
  name: string;
  slug: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
};

export type BrandListType = {
  id: number;
  name: string;
  slug: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
  _count: {
    products: number;
  };
};

export interface BrandListResult {
  items: BrandListType[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface BrandQueryParams {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface CreateBrandParams {
  name: string;
}

export interface CreateBrandResponse {
  success: boolean;
  message: string;
  data: BrandListType;
}

export interface UpdateBrandParams {
  slug: string;
  name: string;
}

export interface UpdateBrandResponse {
  success: boolean;
  message: string;
  data: BrandListType;
}

export interface DeleteBrandParams {
  slug: string;
}

export interface DeleteBrandResponse {
  success: boolean;
  message: string;
}

export type BrandFormValues = z.infer<typeof brandSchema>;

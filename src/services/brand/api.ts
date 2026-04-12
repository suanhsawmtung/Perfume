import api from "@/lib/api";
import type {
  BrandListResult,
  BrandListType,
  BrandQueryParams,
  CreateBrandParams,
  CreateBrandResponse,
  DeleteBrandParams,
  DeleteBrandResponse,
  UpdateBrandParams,
  UpdateBrandResponse
} from "@/types/brand.type";

export const DEFAULT_LIMIT = 10;

export async function fetchBrands(options: {
  offset?: number;
  search?: string;
  limit?: number;
}): Promise<BrandListResult> {
  const { offset = 0, search, limit = 10 } = options;

  const queryParams: BrandQueryParams = {
    limit,
    offset,
    ...(search && { search }),
  };

  const response = await api.get("/admin/brands", {
    params: queryParams,
  });

  // Backend returns: { success: true, data: { brands, currentPage, totalPages, pageSize }, message: null }
  return {
    items: response.data?.data?.items || [],
    currentPage: response.data?.data?.currentPage || 0,
    totalPages: response.data?.data?.totalPages || 0,
    pageSize: response.data?.data?.pageSize || 10,
  };
}

export async function fetchBrand(slug: string): Promise<BrandListType> {
  const response = await api.get(`/admin/brands/${slug}`);

  // Backend returns: { success: true, data: { brand }, message: null }
  return response.data?.data;
}

export async function createBrand(
  params: CreateBrandParams,
): Promise<CreateBrandResponse> {
  const response = await api.post("/admin/brands", {
    name: params.name.trim(),
  });

  // Backend returns: { success: true, data: { brand }, message: string }
  return response.data;
}

export async function updateBrand(
  params: UpdateBrandParams,
): Promise<UpdateBrandResponse> {
  const response = await api.patch(`/admin/brands/${params.slug}`, {
    name: params.name.trim(),
  });

  // Backend returns: { success: true, data: { brand }, message: string }
  return response.data;
}

export async function deleteBrand(
  params: DeleteBrandParams,
): Promise<DeleteBrandResponse> {
  const response = await api.delete(`/admin/brands/${params.slug}`);

  // Backend returns: { success: true, message: string }
  return response.data;
}

import api from "@/lib/api";
import type {
  CategoryListResult,
  CategoryListType,
  CategoryQueryParams,
  CommonCategoryType,
  CreateCategoryParams,
  CreateCategoryResponse,
  DeleteCategoryParams,
  DeleteCategoryResponse,
  UpdateCategoryParams,
  UpdateCategoryResponse
} from "@/types/category.type";
import type { FetchSelectPageResult } from "@/types/select-option.type";

export const DEFAULT_LIMIT = 10;

export async function fetchCategories(options: {
  offset?: number;
  search?: string;
  limit?: number;
}): Promise<CategoryListResult> {
  const { offset = 0, search, limit = 10 } = options;

  const queryParams: CategoryQueryParams = {
    limit,
    offset,
    ...(search && { search }),
  };

  const response = await api.get("/admin/categories", {
    params: queryParams,
  });

  // Backend returns: { success: true, data: { categories, currentPage, totalPages, pageSize }, message: null }
  return {
    items: response.data?.data?.items || [],
    currentPage: response.data?.data?.currentPage || 0,
    totalPages: response.data?.data?.totalPages || 0,
    pageSize: response.data?.data?.pageSize || 10,
  };
}

export async function fetchCategory(slug: string): Promise<CategoryListType> {
  const response = await api.get(`/admin/categories/${slug}`);

  // Backend returns: { success: true, data: { category }, message: null }
  return response.data?.data;
}

export async function createCategory(
  params: CreateCategoryParams,
): Promise<CreateCategoryResponse> {
  const response = await api.post("/admin/categories", {
    name: params.name.trim(),
  });

  // Backend returns: { success: true, data: { category }, message: string }
  return response.data;
}

export async function updateCategory(
  params: UpdateCategoryParams,
): Promise<UpdateCategoryResponse> {
  const response = await api.patch(`/admin/categories/${params.slug}`, {
    name: params.name.trim(),
  });

  // Backend returns: { success: true, data: { category }, message: string }
  return response.data;
}

export async function deleteCategory(
  params: DeleteCategoryParams,
): Promise<DeleteCategoryResponse> {
  const response = await api.delete(`/admin/categories/${params.slug}`);

  // Backend returns: { success: true, message: string }
  return response.data;
}

export async function fetchAllCategories(): Promise<CommonCategoryType[]> {
  const response = await api.get("/categories");

  return response.data?.data || [];
}

export async function fetchCategorySelectOptions(params: {
  search: string;
  cursor: number | null;
}): Promise<FetchSelectPageResult> {
  const { search, cursor } = params;

  const response = await api.get("/categories/select-options", {
    params: {
      search,
      limit: 15,
      ...(cursor && { cursor }),
    },
  });

  // Backend returns: { success: true, data: { items: [{ id, name, slug }], nextCursor }, message: null }
  return response.data?.data;
}

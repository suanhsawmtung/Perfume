import api from "@/lib/api";
import type { CursorPaginationResultT } from "@/types";
import type {
  CreateReviewParams,
  ProductReviewType,
  ReviewListResult,
  ReviewListType,
  ReviewQueryParams,
  ReviewType,
  ToggleReviewPublishResponse,
  UpdateReviewParams
} from "@/types/review.type";

export const ADMIN_DEFAULT_LIMIT = 10;
export const DEFAULT_LIMIT = 10;

export async function fetchReviews(params: ReviewQueryParams): Promise<CursorPaginationResultT<ReviewType>> {
  const { cursor, search, status, limit = DEFAULT_LIMIT } = params;
  const queryParams: ReviewQueryParams = {
    limit,
    cursor,
    ...(search && { search }),
    ...(status && { status: status }),
  };

  const response = await api.get("/reviews", {
    params: queryParams
  });

  return response.data?.data;
}

export async function fetchProductReviews(productId: number, params: ReviewQueryParams): Promise<CursorPaginationResultT<ProductReviewType>> {
  const { cursor, limit = DEFAULT_LIMIT } = params;
  const queryParams: ReviewQueryParams = {
    limit,
    cursor,
  };

  const response = await api.get(`/products/${productId}/reviews`, {
    params: queryParams
  });

  return response.data?.data;
}

export async function fetchAdminReviews(options: {
  offset?: number;
  search?: string;
  limit?: number;
  status?: string;
  user?: string;
  product?: string;
}): Promise<ReviewListResult> {
  const { offset = 0, search, limit = ADMIN_DEFAULT_LIMIT, status, user, product } = options;
  const queryParams: ReviewQueryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(status && { status: status as any }),
    ...(user && { user }),
    ...(product && { product }),
  };

  const response = await api.get("/admin/reviews", {
    params: queryParams,
  });

  return {
    items: response.data?.data?.items || [],
    currentPage: response.data?.data?.currentPage || 0,
    totalPages: response.data?.data?.totalPages || 0,
    pageSize: response.data?.data?.pageSize || 10,
  };
}

export async function fetchAdminReview(id: number): Promise<ReviewListType> {
  const response = await api.get(`/admin/reviews/${id}`);
  return response.data?.data;
}

export async function toggleReviewPublish(id: number): Promise<ToggleReviewPublishResponse> {
  const response = await api.patch(`/admin/reviews/${id}/toggle-publish`);
  return response.data;
}

export async function createReview(productId: number, params: CreateReviewParams): Promise<ReviewType> {
  const response = await api.post(`/products/${productId}/reviews`, params);
  return response.data?.data;
}

export async function updateReview(id: number, productId: number, params: UpdateReviewParams): Promise<ReviewType> {
  const response = await api.patch(`/products/${productId}/reviews/${id}`, params);
  return response.data?.data;
}

export async function deleteReview({ id, productId }: { id: number, productId: number }): Promise<ReviewType> {
  const response = await api.delete(`/products/${productId}/reviews/${id}`);
  return response.data?.data;
}


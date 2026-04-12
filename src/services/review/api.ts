import api from "@/lib/api";
import type {
  ReviewListResult,
  ReviewListType,
  ReviewQueryParams,
  ToggleReviewPublishResponse
} from "@/types/review.type";

export const DEFAULT_LIMIT = 10;

export async function fetchReviews(options: {
  offset?: number;
  search?: string;
  limit?: number;
  status?: string;
  user?: string;
  product?: string;
}): Promise<ReviewListResult> {
  const { offset = 0, search, limit = 10, status, user, product } = options;
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

export async function fetchReview(id: number): Promise<ReviewListType> {
  const response = await api.get(`/admin/reviews/${id}`);
  return response.data?.data;
}

export async function toggleReviewPublish(id: number): Promise<ToggleReviewPublishResponse> {
  const response = await api.patch(`/admin/reviews/${id}/toggle-publish`);
  return response.data;
}

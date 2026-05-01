export type ReviewListType = {
  id: number;
  rating: number;
  content: string | null;
  isPublish: boolean;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    image: string | null;
  };
  product: {
    id: number;
    name: string;
    slug: string;
  };
};

export interface ReviewListResult {
  items: ReviewListType[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface ReviewQueryParams {
  limit?: number;
  offset?: number;
  search?: string;
  status?: "publish" | "unpublish";
  user?: string;
  product?: string;
}

export interface ToggleReviewPublishResponse {
  success: boolean;
  message: string;
  data: ReviewListType;
}

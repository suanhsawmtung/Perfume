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
  cursor?: number | null;
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

export type ReviewType = {
  id: number;
  rating: number;
  content: string | null;
  isPublish: boolean;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    slug: string;
    brand: string;
    image: string | null;
  }
}

export type ProductReviewType = {
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
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image: string | null;
    emailVerifiedAt: string | null;
  }
}

export type CreateReviewParams = {
  rating: number;
  content?: string;
};

export type UpdateReviewParams = {
  rating: number;
  content?: string;
};

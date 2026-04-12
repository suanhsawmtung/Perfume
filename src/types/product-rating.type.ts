export type ProductRatingType = {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    username: string;
  };
  product: {
    id: number;
    name: string;
    slug: string;
    brand: {
      name: string;
    };
  };
};

export type ProductRatingSummaryType = {
  id: number;
  name: string;
  slug: string;
  rating: number;
  ratingCount: number;
  brand: {
    name: string;
  };
};

export interface ProductRatingListResult {
  items: ProductRatingType[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface ProductRatingSummaryListResult {
  items: ProductRatingSummaryType[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface ProductRatingQueryParams {
  limit?: number;
  offset?: number;
  search?: string;
  product?: string;
  user?: string;
}

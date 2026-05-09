import type { PostStatus, PostType } from "./post.type";

export interface HomeProductVariantType {
  price: number;
  discount: number;
  stock: number;
  reserved: number;
  images: {
    path: string;
  }[];
}

export interface HomeProductType {
  id: number;
  name: string;
  slug: string;
  concentration: string;
  gender: string;
  description: string;
  rating: number;
  ratingCount: number;
  brand: {
    name: string;
    slug: string;
  };
  variants: HomeProductVariantType[];
}

export interface HomePostType {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  authorId: number;
  categoryId: number;
  status: PostStatus;
  publishedAt: string | null; // ISO date string, nullable
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  author: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
  };
  category: {
    id: number;
    slug: string;
    name: string;
  };
};

export type HomeReviewType = {
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
    emailVerifiedAt: string | null;
  };
  product: {
    id: number;
    name: string;
    slug: string;
  };
};

export interface HomeData {
  bestSellerProducts: HomeProductType[];
  productsForYou: HomeProductType[];
  latestReviews: HomeReviewType[];
  latestPosts: PostType[];
}

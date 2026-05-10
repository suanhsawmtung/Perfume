import type { PostStatus } from "./post.type";
import type { ProductCardType } from "./product.type";

export type HomeProductType = ProductCardType;

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
    username: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface HomeReviewType {
  id: number;
  content: string | null;
  rating: number;
  isPublish: boolean;
  userId: number;
  productId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    username: string;
    email: string;
    image: string | null;
    emailVerifiedAt: string | null;
  };
  product: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface HomeDataT {
  bestSellerProducts: HomeProductType[];
  productsForYou: HomeProductType[];
  latestReviews: HomeReviewType[];
  latestPosts: HomePostType[];
}

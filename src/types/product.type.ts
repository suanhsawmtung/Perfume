import type { ProductFilterFormSchema, productSchema } from "@/validations/product.validation";
import type z from "zod";

// Product enums (based on backend $Enums)
export type Concentration = "EDC" | "EDT" | "EDP" | "PARFUM";
export type Gender = "MALE" | "FEMALE" | "UNISEX";

export interface ProductType {
  id: number;
  name: string;
  slug: string;
  concentration: Concentration;
  gender: Gender;
  description: string;
  rating: string;
  ratingCount: number;
  isActive: boolean;
  isLimited: boolean;
  releasedYear: number;
  brandId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProductCardType {
  id: number;
  name: string;
  slug: string;
  rating: number | null;
  ratingCount: number;
  gender: Gender;
  concentration: Concentration;
  isLimited: boolean;
  brand: {
    name: string;
    slug: string;
  };
  image: string | null;
  primaryVariant: {
    price: number;
    discount: number;
    stock: number;
    reserved: number;
  };
}

// Product type from backend response
export interface ProductListType extends ProductType {
  brand: {
    name: string;
  };
  _count: {
    variants: number;
  };
}

// Product list query parameters
export interface ProductQueryParams {
  limit: number;
  offset: number;
  search?: string;
  brandSlug?: string;
  gender?: Gender;
  concentration?: Concentration;
  isActive?: boolean;
  isLimited?: boolean;
}

// Product list result from API
export interface ProductListResult<T = ProductListType> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

// Product variant image
export interface ProductVariantImage {
  path: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariantType {
  id: number;
  slug: string;
  productId: number;
  sku: string;
  size: number;
  price: number;
  discount: number;
  stock: number;
  reserved: number;
  totalCost: number;
  isPrimary: boolean;
  isActive: boolean;
  images: ProductVariantImage[];
}

export interface ProductVariantDetailType {
  id: number;
  slug: string;
  productId: number;
  sku: string;
  size: number;
  price: number;
  discount: number;
  stock: number;
  reserved: number;
  totalCost: number;
  isPrimary: boolean;
  isActive: boolean;
  images: ProductVariantImage[];
  product: {
    id: number;
    slug: string;
    name: string;
    brand: {
      name: string;
    };
  };
}

export interface AdminProductDetailType {
  id: number;
  slug: string;
  name: string;
  description: string;
  concentration: Concentration;
  gender: Gender;
  releasedYear: number | null;
  isActive: boolean;
  isLimited: boolean;
  rating: string;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
  brand: {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  variants: ProductVariantType[];
  _count: {
    variants: number;
    reviews: number;
  };
}

export interface ProductDetailType {
  id: number;
  name: string;
  slug: string;
  description: string;
  gender: Gender;
  concentration: Concentration;
  isLimited: boolean;
  rating: number | null;
  ratingCount: number;
  brand: string;
  releasedYear: number | null;
  variants: {
    id: number;
    size: number;
    slug: string;
    stock: number;
    reserved: number;
  }[];
  isWishlist: boolean;
  canReview: boolean;
  hasReviewed: boolean;
  selectedVariant: {
    id: number;
    slug: string;
    size: number;
    price: number;
    discount: number;
    stock: number;
    reserved: number;
    isPrimary: boolean;
    images: {
      path: string;
      isPrimary: boolean;
      order: number;
    }[];
  };
}

export interface CreateProductParams {
  name: string;
  description: string;
  concentration: Concentration;
  gender: Gender;
  brandId: string;
  isActive?: boolean;
  isLimited?: boolean;
  releasedYear?: number;
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  data: ProductType;
}

export interface UpdateProductParams {
  name: string;
  description: string;
  concentration: Concentration;
  gender: Gender;
  brandId: string;
  isActive?: boolean;
  isLimited?: boolean;
  releasedYear?: number;
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  data: ProductType;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export interface CreateProductVariantResponse {
  success: boolean;
  message: string;
  data: ProductVariantType;
}

export interface DeleteProductVariantResponse {
  success: boolean;
  message: string;
}

export type ProductFilterFormValues = z.infer<typeof ProductFilterFormSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;

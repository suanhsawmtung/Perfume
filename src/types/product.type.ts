// Product enums (based on backend $Enums)
export type Concentration = "EDC" | "EDT" | "EDP" | "PARFUM";
export type Gender = "MALE" | "FEMALE" | "UNISEX";
export type VariantSource = "ORIGINAL" | "DECANT";

// Product type from backend response
export interface ProductType {
  slug: string;
  name: string;
  brand: {
    name: string;
  };
  _count: {
    variants: number;
  };
  concentration: Concentration;
  gender: Gender;
  rating: number;
  isActive: boolean;
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
export interface ProductListResult {
  products: ProductType[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface ProductVariantImage {
  path: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariantInventory {
  id: number;
  productVariantId: number;
  quantity: number;
  reserved: number;
}

export interface ProductVariantType {
  id: number;
  slug: string;
  productId: number;
  sku: string;
  size: number;
  source: VariantSource;
  price: number;
  discount: number;
  stock: number;
  isPrimary: boolean;
  isActive: boolean;
  images: ProductVariantImage[];
  inventories: ProductVariantInventory[];
}

export interface ProductVariantSummaryType {
  id: number;
  slug: string;
  productId: number;
  sku: string;
  size: number;
  source: VariantSource;
  price: number;
  discount: number;
  stock: number;
  isPrimary: boolean;
  isActive: boolean;
  inventories: ProductVariantInventory[];
}

export interface ProductVariantDetailType {
  id: number;
  slug: string;
  productId: number;
  sku: string;
  size: number;
  source: VariantSource;
  price: number;
  discount: number;
  stock: number;
  isPrimary: boolean;
  isActive: boolean;
  images: ProductVariantImage[];
  inventories: ProductVariantInventory[];
  product: {
    id: number;
    slug: string;
  };
}

export interface ProductDetailType {
  id: number;
  name: string;
  slug: string;
  concentration: Concentration;
  gender: Gender;
  description: string;
  rating: number;
  ratingCount: number;
  isActive: boolean;
  isLimited: boolean;
  releasedYear: number | null;
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
    wishlists: number;
    ratings: number;
    orders: number;
    variants: number;
  };
}

export interface ProductVariantsSummaryType {
  name: string;
  slug: string;
  brand: {
    name: string;
  };
  variants: ProductVariantSummaryType[];
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
  data: {
    product: ProductDetailType;
  };
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
  data: {
    product: ProductDetailType;
  };
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export interface CreateProductVariantResponse {
  success: boolean;
  message: string;
  data: {
    variant: ProductVariantType;
  };
}

export interface DeleteProductVariantResponse {
  success: boolean;
  message: string;
}

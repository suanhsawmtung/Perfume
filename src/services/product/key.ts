import type { Concentration, Gender } from "@/types/product.type";

export type ProductListQueryOptions = {
  offset?: number;
  search?: string;
  limit?: number;
  brand?: string;
  gender?: Gender;
  concentration?: Concentration;
  isActive?: boolean;
  isLimited?: boolean;
};

export const productQueryKeys = {
  all: ["products"] as const,

  lists: ["products", "list"] as const,

  list: (options: ProductListQueryOptions) =>
    ["products", "list", options] as const,

  detail: (slug: string) => ["products", "detail", slug] as const,

  variants: (slug: string) => ["products", "variants", slug] as const,

  variantDetail: (slug: string, variantSlug: string) =>
    ["products", "variants", slug, variantSlug] as const,
};

import type { ProductRatingQueryParams } from "@/types/product-rating.type";

export const productRatingQueryKeys = {
  all: ["product-ratings"] as const,
  lists: () => [...productRatingQueryKeys.all, "list"] as const,
  list: (params: ProductRatingQueryParams) =>
    [...productRatingQueryKeys.lists(), params] as const,
  summaries: () => [...productRatingQueryKeys.all, "summary"] as const,
  summaryList: (params: ProductRatingQueryParams) =>
    [...productRatingQueryKeys.summaries(), params] as const,
};

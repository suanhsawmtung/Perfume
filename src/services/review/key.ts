import type { ReviewQueryParams } from "@/types/review.type";

export const reviewQueryKeys = {
  all: ["reviews"] as const,

  admin: {
    lists: ["reviews", "list"] as const,

    list: (options: {
      offset?: number;
      search?: string;
      limit?: number;
      status?: string;
      user?: string;
      product?: string;
    }) => ["reviews", "list", options] as const,

    details: ["reviews", "detail"] as const,
    detail: (id: number) => ["reviews", "detail", id] as const,
  },

  lists: (userId: number) => ["reviews", "list", userId] as const,

  list: (userId: number, options: ReviewQueryParams) =>
    ["reviews", "list", userId, options] as const,
};

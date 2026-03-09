export const reviewQueryKeys = {
  all: ["reviews"] as const,

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
};

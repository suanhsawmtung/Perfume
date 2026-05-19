import type { PostStatus } from "@/types/post.type";

export type PostListQueryOptions = {
  offset?: number;
  search?: string;
  limit?: number;
  category?: string;
  status?: PostStatus;
};

export const postQueryKeys = {
  all: ["posts"] as const,

  admin: {
    lists: ["posts", "admin", "list"] as const,

    list: (options: PostListQueryOptions) =>
      ["posts", "admin", "list", options] as const,

    detail: (slug: string) =>
      ["posts", "admin", "detail", slug] as const,
  },

  lists: ["posts", "list"] as const,

  list: (options: PostListQueryOptions) =>
    ["posts", "list", options] as const,

  detail: (slug: string) =>
    ["posts", "detail", slug] as const,
};

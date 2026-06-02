import type { OrderQueryParams } from "@/types/order.type";

export const orderQueryKeys = {
  all: ["orders"] as const,

  admin: {
    lists: ["orders", "admin", "list"] as const,

    list: (options: OrderQueryParams) =>
      ["orders", "admin", "list", options] as const,

    detail: (code: string) => ["orders", "admin", "detail", code] as const,
  },

  lists: (userId: number) => ["orders", "list", userId] as const,

  list: (userId: number, options: OrderQueryParams) =>
    ["orders", "list", userId, options] as const,
};

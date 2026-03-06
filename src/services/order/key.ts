import type { OrderQueryParams } from "@/types/order.type";

export const orderQueryKeys = {
  all: ["orders"] as const,

  lists: ["orders", "list"] as const,

  list: (options: OrderQueryParams) =>
    ["orders", "list", options] as const,

  detail: (code: string) => ["orders", "detail", code] as const,
};

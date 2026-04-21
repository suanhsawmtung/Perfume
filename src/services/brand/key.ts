export const brandQueryKeys = {
  all: ["brands"] as const,

  lists: ["brands", "list"] as const,

  list: (options: { offset?: number; search?: string; limit?: number }) =>
    ["brands", "list", options] as const,

  detail: (slug: string) => ["brands", "detail", slug] as const,
  selectOptions: (search?: string) => ["brands", "select-options", { search }] as const,
};

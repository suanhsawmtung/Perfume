export const profileQueryKeys = {
  all: ["profile"] as const,
  detail: (userId: number) => ["profile", "detail", userId] as const,
};
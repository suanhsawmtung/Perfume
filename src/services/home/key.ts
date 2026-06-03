import type { Gender } from "@/stores/preference.store";

export const homeQueryKeys = {
  all: ["home"] as const,
  data: ({
    gender,
    userId,
  }: {
    gender?: Gender | null;
    userId?: number | null;
  }) => ["home", "data", { gender, userId }] as const,
};

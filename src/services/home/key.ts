import type { Gender } from "@/stores/preference.store";

export const homeQueryKeys = {
  all: ["home"] as const,
  data: (gender?: Gender | null) => ["home", "data", { gender }] as const,
};

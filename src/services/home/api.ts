import api from "@/lib/api";
import type { Gender } from "@/stores/preference.store";
import type { HomeData } from "@/types/home.type";

export async function fetchHomeData(gender?: Gender | null): Promise<HomeData> {
  const response = await api.get("/home", {
    params: {
      ...(gender && { gender }),
    },
  });

  // Backend returns: { success: true, data: { ... }, message: null }
  return response.data?.data;
}

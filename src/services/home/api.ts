import api from "@/lib/api";
import type { Gender } from "@/stores/preference.store";
import type { HomeDataT } from "@/types/home.type";

export async function fetchHomeData(gender?: Gender | null): Promise<HomeDataT> {
  const response = await api.get("/home", {
    params: {
      ...(gender && { gender }),
    },
  });

  return response.data?.data;
}

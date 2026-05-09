import { ensureHomeData } from "@/services/home/queries/useGetHomeData";
import { usePreferenceStore } from "@/stores/preference.store";

export async function loader() {
  const gender = usePreferenceStore.getState().gender;

  try {
    await ensureHomeData({ gender });
    return null;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Response("Invalid query parameters", { status: 400 });
    }
    throw error;
  }
}

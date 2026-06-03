import { ensureHomeData } from "@/services/home/queries/useGetHomeData";
import { useAuthStore } from "@/stores/auth.store";
import { usePreferenceStore } from "@/stores/preference.store";

export async function loader() {
  const gender = usePreferenceStore.getState().gender;
  const user = useAuthStore.getState().authUser;
  const params = {
    gender,
    userId: user?.id ?? null,
  };

  try {
    await ensureHomeData(params);
    return params;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Response("Invalid query parameters", { status: 400 });
    }
    throw error;
  }
}

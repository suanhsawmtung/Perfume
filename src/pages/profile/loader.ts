import { ensureProfile } from "@/services/profile/queries/useGetProfile";
import { useAuthStore } from "@/stores/auth.store";
import { redirect } from "react-router";

export async function loader() {
  try {
    const user = useAuthStore.getState().authUser;
    if (!user) {
      return redirect("/sign-in");
    }
    await ensureProfile(user.id);
    return { userId: user.id };
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Response("Unauthorized", { status: 401 });
    }
    throw error;
  }
}

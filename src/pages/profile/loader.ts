import { ensureProfile } from "@/services/profile/queries/useGetProfile";

export async function loader() {
  try {
    await ensureProfile();
    return null;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Response("Unauthorized", { status: 401 });
    }
    throw error;
  }
}

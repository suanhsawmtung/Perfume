import { useAuthStore } from "@/stores/auth.store";
import { redirect } from "react-router";

export async function loader() {
    try {
        const user = useAuthStore.getState().authUser;
        if (!user) {
            return redirect("/sign-in");
        }
        return null;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Response("Unauthorized", { status: 401 });
        }
        throw error;
    }
}

import { redirect } from "react-router";
import { useAuthStore } from "@/stores/auth.store";

export async function loader() {
    const user = useAuthStore.getState().authUser;

    if (!user) {
        return redirect("/sign-in");
    }

    return null;
}


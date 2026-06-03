import { DEFAULT_LIMIT } from "@/services/order/api";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { ensureListOrders } from "@/services/order/queries/useGetOrders";
import { useAuthStore } from "@/stores/auth.store";

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const user = useAuthStore.getState().authUser;

    if (!user) {
        return redirect("/sign-in")
    }

    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || undefined;
    const condition = searchParams.get("condition") || undefined;

    const offset = (page - 1) * DEFAULT_LIMIT;

    const params = {
        offset,
        condition,
        search,
        limit: DEFAULT_LIMIT,
    };

    try {
        await ensureListOrders(user.id, params);
        return { params };
    } catch (error: any) {
        if (error.response?.status === 400) {
            throw new Response("Invalid query parameters", { status: 400 });
        }
        throw error;
    }
}

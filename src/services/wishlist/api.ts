import api from "@/lib/api";
import type { CursorPaginationResultT } from "@/types";
import type { ToggleWishlistResponseT, WishlistQueryParams } from "@/types/wishlist.type";

export const DEFAULT_LIMIT = 8;

export async function fetchWishlists(
    params: WishlistQueryParams
): Promise<CursorPaginationResultT<any>> {
    const { cursor, search, limit = DEFAULT_LIMIT } = params;
    const queryParams: WishlistQueryParams = {
        limit,
        cursor,
        ...(search && { search }),
    };

    const response = await api.get("/wishlists", {
        params: queryParams
    });

    return response.data?.data;
}

export async function addToWishlist(id: number): Promise<ToggleWishlistResponseT> {
    const response = await api.post(`/wishlists/${id}`);
    return response.data;
}

export async function removeFromWishlist(id: number): Promise<ToggleWishlistResponseT> {
    const response = await api.delete(`/wishlists/${id}`);
    return response.data;
}

export async function toggleWishlist({ id, action }: { id: number; action: "add" | "remove" }): Promise<ToggleWishlistResponseT> {
    if (action === "add") {
        return addToWishlist(id);
    } else {
        return removeFromWishlist(id);
    }
}
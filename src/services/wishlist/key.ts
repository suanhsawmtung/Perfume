import type { WishlistQueryParams } from "@/types/wishlist.type";

export const wishlistQueryKeys = {
    all: ["wishlists"] as const,

    lists: (userId: number) => ["wishlists", "list", userId] as const,

    list: (userId: number, options: WishlistQueryParams) =>
        ["wishlists", "list", userId, options] as const,
};

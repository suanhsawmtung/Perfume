export interface WishlistQueryParams {
    limit?: number;
    cursor?: number | null;
    search?: string;
}

export interface WishlistType {
    id: number;
    createdAt: Date;
    product: {
        id: number;
        name: string;
        slug: string;
        brand: string;
        image: string | null;
        price: number;
        discount: number;
        primaryVariantId: number | null;
        primaryVariantSlug: string | null;
    }
}

export interface ToggleWishlistResponseT {
    success: boolean;
    message: string;
    data: {
        isAdded: boolean;
        message: string;
    };
}
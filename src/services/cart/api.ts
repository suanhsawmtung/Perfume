import api from "@/lib/api";
import { useCartStore, type CartStorageItem } from "@/stores/cart.store";
import type { CartItemType } from "@/types/cart.type";

export async function fetchCartItems(items: CartStorageItem[]): Promise<CartItemType[]> {
    if (items.length === 0) return [];

    const response = await api.post("/cart/items", { items });

    const data = (response.data?.data || []) as CartItemType[];

    const cartItems = data.map((item) => {
        return {
            productVariantId: item.id,
            quantity: item.quantity,
        }
    });

    useCartStore.setState(() => ({
        items: cartItems,
    }));

    return data;
}
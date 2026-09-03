import { useGetCartItems } from "@/services/cart/queries/useGetCartItems";
import { useCartStore } from "@/stores/cart.store";
import { useMemo } from "react";

export function useCart() {
    const {
        items: orderItems,
    } = useCartStore();

    const { data: cartItems = [], isPending } = useGetCartItems(orderItems);

    const itemMap = useMemo(
        () => new Map(cartItems.map(item => [item.id, item])),
        [cartItems]
    );

    const subtotal = orderItems.reduce((acc, item) => {
        const cartItem = itemMap.get(item.productVariantId);
        if (!cartItem) return acc;
        return acc + (cartItem.price * item.quantity);
    }, 0);

    return {
        itemMap,
        isPending,
        subtotal,
    }
}
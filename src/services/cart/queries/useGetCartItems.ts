import {
    useQuery,
    type UseQueryResult,
} from "@tanstack/react-query";
import { fetchCartItems } from "../api";
import { cartQueryKeys } from "../key";
import type { CartItemType } from "@/types/cart.type";
import { type CartStorageItem } from "@/stores/cart.store";

export function useGetCartItems(items: CartStorageItem[]): UseQueryResult<CartItemType[], Error> {
    return useQuery<CartItemType[], Error>({
        queryKey: cartQueryKeys.lists,
        queryFn: () => fetchCartItems(items),
    });
}

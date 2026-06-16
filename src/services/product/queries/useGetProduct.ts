import { queryClient } from "@/lib/query-client";
import {
    useSuspenseQuery,
    type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchProduct } from "../api";
import { productQueryKeys } from "../key";
import type { ProductDetailType } from "@/types/product.type";

export function useGetProduct(
    slug: string,
    params: {
        variant: string | null;
    }
): UseSuspenseQueryResult<ProductDetailType, Error> {
    return useSuspenseQuery<ProductDetailType, Error>({
        queryKey: productQueryKeys.detail(slug, params),
        queryFn: () => fetchProduct(slug, params),
    });
}

export async function ensureProduct(slug: string, params: { variant: string | null }): Promise<void> {
    await queryClient.ensureQueryData({
        queryKey: productQueryKeys.detail(slug, params),
        queryFn: () => fetchProduct(slug, params),
    });
}

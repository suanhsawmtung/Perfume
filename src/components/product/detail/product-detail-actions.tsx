import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { productQueryKeys } from "@/services/product/key";
import { useToggleWishlist } from "@/services/wishlist/queries/useToggleWishlist";
import { useCartStore } from "@/stores/_cart.store";
import type { ProductDetailType } from "@/types/product.type";
import { Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export function ProductDetailActions({
    product
}: {
    product: ProductDetailType
}) {
    const [quantity, setQuantity] = useState(1)
    const [cartAnimation, setCartAnimation] = useState(false)

    const { addItem, setIsOpen } = useCartStore();

    const isDisabled = (product.selectedVariant.stock - product.selectedVariant.reserved) < 1;

    const handleAddToCart = () => {
        addItem({
            id: String(product.id),
            name: product.name,
            brand: product.brand,
            price: product.selectedVariant.price,
            image: product.selectedVariant.images[0].path,
            size: `${product.selectedVariant.size}ml`,
        })
        setCartAnimation(true)
        setTimeout(() => {
            setCartAnimation(false)
            setIsOpen(true)
        }, 600)
    }

    return (
        <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center rounded-md border border-border">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isDisabled}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className={cn(
                    "w-10 sm:w-12 text-center",
                    isDisabled && "cursor-not-allowed opacity-50"
                )}>
                    {quantity}
                </span>
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isDisabled || quantity >= product.selectedVariant.stock}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <Button
                className={cn(
                    "flex-1 transition-all duration-300 space-x-1 sm:space-x-2",
                    cartAnimation && "scale-95 bg-amber-600 hover:bg-green-600",
                    isDisabled && "cursor-not-allowed"
                )}
                size="lg"
                onClick={handleAddToCart}
                disabled={isDisabled}
                variant={isDisabled ? "secondary" : "default"}
            >
                {cartAnimation ? (
                    <>
                        <Check className="h-4 w-4 animate-bounce" />
                        Added!
                    </>
                ) : (
                    <>
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                    </>
                )}
            </Button>

            <ToggleWishlistButton product={product} />
        </div>
    );
}

export const ToggleWishlistButton = ({ product }: { product: ProductDetailType }) => {
    const toggleWishlistMutation = useToggleWishlist();
    const [searchParams] = useSearchParams();

    const handleToggleWishlist = () => {
        toggleWishlistMutation.mutate({
            id: product.id,
            action: product.isWishlist ? "remove" : "add",
            queryKey: productQueryKeys.detail(product.slug, {
                variant: searchParams.get("variant") || null,
            }),
        })
    }

    return (
        <Button
            key={product.isWishlist ? "wishlisted" : "not-wishlisted"}
            variant="outline"
            size="lg"
            className={cn(
                "shrink-0 transition-all duration-300",
                product.isWishlist && "border-red-500 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 dark:bg-red-950 dark:hover:bg-red-900",
            )}
            onClick={handleToggleWishlist}
        >
            <Heart
                className={cn(
                    "h-4 w-4 transition-all",
                    product.isWishlist && "fill-red-500 animate-bounce-once",
                )}
            />
        </Button>
    );
}
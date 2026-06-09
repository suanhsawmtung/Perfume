import { Link } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ImageOff, Loader2, ShoppingBag, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WishlistType } from "@/types/wishlist.type";
import { useCartStore } from "@/stores/cart.store";
import { useToggleWishlist } from "@/services/wishlist/queries/useToggleWishlist";

export function WishlistCard({
    wishlist
}: {
    wishlist: WishlistType
}) {
    const { addItem, setIsOpen } = useCartStore();
    const { mutate: toggleWishlist, isPending } = useToggleWishlist();

    const handleAddToCart = () => {
        if (wishlist.product.primaryVariantId) {
            addItem({
                id: wishlist.product.primaryVariantId,
                quantity: 1,
            });
            setIsOpen(true);
        }
    };

    const handleRemoveFromWishlist = () => {
        toggleWishlist({ id: wishlist.product.id, action: "remove" });
    };

    return (
        <Card key={wishlist.id} className="group overflow-hidden pt-0">
            <div className="relative aspect-square overflow-hidden bg-secondary/50">
                <Link to={`/products/${wishlist.product.slug}`}>
                    {wishlist.product.image ? (
                        <img
                            src={wishlist.product.image}
                            alt={wishlist.product.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-secondary">
                            <ImageOff className="h-8 w-8 text-muted-foreground" />
                        </div>
                    )}
                </Link>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-3 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={handleRemoveFromWishlist}
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Trash2 className="size-4" />
                    )}
                </Button>
            </div>
            <CardContent className="px-4">
                <p className="text-xs text-muted-foreground">{wishlist.product.brand}</p>
                <Link to={`/products/${wishlist.product.slug}`}>
                    <h3 className="mt-1 font-medium hover:underline line-clamp-1">
                        {wishlist.product.name}
                    </h3>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                    {wishlist.product.discount ? (
                        <>
                            <p className="font-semibold">
                                {wishlist.product.discount} MMK
                            </p>
                            <p className="text-muted-foreground text-sm line-through">
                                {wishlist.product.price} MMK
                            </p>
                        </>
                    ) : (
                        <p className="font-semibold">{wishlist.product.price} MMK</p>
                    )}
                </div>
                <Button
                    className={cn(
                        "mt-4 w-full transition-all",
                    )}
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={!wishlist.product.primaryVariantId}
                >
                    <>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                    </>
                </Button>
            </CardContent>
        </Card>
    )
}
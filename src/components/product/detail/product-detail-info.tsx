import { Button } from "@/components/ui/button"
import { RatingDisplay } from "@/components/shared/rating"
import { Link } from "react-router";
import type { ProductDetailType } from "@/types/product.type";

export function ProductDetailInfo({ product }: { product: ProductDetailType }) {
    return (
        <div className="space-y-2 w-full flex flex-col">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
                {product.brand}
            </span>
            <h1 className="font-serif text-3xl font-medium md:text-4xl">
                {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <RatingDisplay rating={product.rating || 0} size={16} />
                </div>
                <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.ratingCount || 0} reviews)
                </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
                {product.selectedVariant.discount > 0 ? (
                    <>
                        <span className="text-3xl font-semibold">{product.selectedVariant.discount} MMK</span>
                        <span className="text-lg text-muted-foreground line-through">
                            {product.selectedVariant.price} MMK
                        </span>
                    </>
                ) : (
                    <span className="text-3xl font-semibold">{product.selectedVariant.price} MMK</span>
                )}
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-6">
                {product.description}
            </p>

            <div className="mt-6 w-full flex justify-between gap-2 sm:gap-4 border-y border-border/50 py-6">
                <div className="w-1/3">
                    <div className="w-fit mr-auto md:mx-auto space-y-1">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            Concentration
                        </p>
                        <p className="text-sm font-medium">{product.concentration}</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="w-fit mx-auto text-center space-y-1">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            Released
                        </p>
                        <p className="text-sm font-medium">{product.releasedYear || "-"}</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="w-fit mx-auto space-y-1 text-end">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            Edition
                        </p>
                        <p className="text-sm font-medium">
                            {product.isLimited ? "Limited" : "Standard"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mt-6">
                <p className="text-sm font-medium">Size: {product.selectedVariant.size} ml</p>
                <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                        <Link
                            key={variant.id}
                            to={`/products/${product.slug}?variant=${variant.slug}`}
                        >
                            <Button
                                variant={
                                    product.selectedVariant.id === variant.id
                                        ? "default"
                                        : "outline"
                                }
                                className="border-foreground"
                            >
                                {variant.size} ml
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
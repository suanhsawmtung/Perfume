import { cn, formatPrice } from "@/lib/utils";
import type { HomeProductType } from "@/types/home.type";
import { Image as ImageIcon, Star } from "lucide-react";
import { Link } from "react-router";

export function ProductCard({
  product,
}: {
  product: HomeProductType;
}) {
  const rating = product.rating || 0;

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/20">
            <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isLimited && (
            <span className="bg-foreground px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
              Limited
            </span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.brand.name}
        </p>
        <h3 className="mt-1 font-medium text-foreground line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3 w-3",
                i < Math.floor(rating)
                  ? "fill-foreground text-foreground"
                  : "fill-muted text-muted"
              )}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            ({product.ratingCount} ratings)
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">{
            product.primaryVariant.discount > 0
              ? formatPrice(product.primaryVariant.discount)
              : formatPrice(product.primaryVariant.price)
            } 
          </span>
          {product.primaryVariant.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.primaryVariant.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

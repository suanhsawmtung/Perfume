import { EmptyState } from "@/components/profile/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatImagePath, formatPrice } from "@/lib/utils";
import type { MyProfileT } from "@/types/profile";
import { Heart } from "lucide-react";
import { Link } from "react-router";

interface WishlistItemProps {
  product: MyProfileT["wishlist"][number];
}

export function WishlistItem({ product }: WishlistItemProps) {
  return (
    <Link to={`/products/${product.slug}`} className="group">
      <div className="bg-secondary/50 relative aspect-square overflow-hidden rounded-lg">
        <img
          src={
            product.image
              ? formatImagePath(product.image, "product")
              : "placeholder.jpg"
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <p className="mt-2 line-clamp-1 text-sm font-medium">{product.name}</p>
      <p className="text-muted-foreground text-sm">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}

export function ProfileWishlistCard({
  wishlistProducts,
}: {
  wishlistProducts: MyProfileT["wishlist"];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Wishlist</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/profile/wishlists">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {wishlistProducts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {wishlistProducts.map((product) => (
              <WishlistItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="Wishlist is empty"
            description="Save items you love to your wishlist and they'll appear here."
            buttonText="Browse Products"
            buttonHref="/products"
          />
        )}
      </CardContent>
    </Card>
  );
}

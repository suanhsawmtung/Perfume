import { Link } from "react-router"
import { formatImagePath, formatPrice } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/profile/empty-state"
import { Heart } from "lucide-react"

type WishProduct = {
  id: number
  name: string
  image: string | null
  price: number
  discount: number
}

interface WishlistItemProps {
  product: WishProduct
}

export function WishlistItem({ product }: WishlistItemProps) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/50">
        <img
          src={product.image ? formatImagePath(product.image, "product") : "placeholder.jpg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-sm font-medium line-clamp-1">{product.name}</p>
      <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
    </Link>
  )
}

export function ProfileWishlistCard({ wishlistProducts }: { wishlistProducts: WishProduct[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Wishlist</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/profile/wishlist">View All</Link>
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
  )
}

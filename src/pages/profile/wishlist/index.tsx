import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { products } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/stores/cart.store"
import { useWishlistStore } from "@/stores/wishlist.store"
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { addItem, setIsOpen } = useCartStore()
  const [addedIds, setAddedIds] = useState<string[]>([])

  const handleAddToCart = (item: typeof items[0]) => {
    const product = products.find((p) => p.id === item.id)
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: product.size,
      })
      setAddedIds((prev) => [...prev, item.id])
      setTimeout(() => {
        setAddedIds((prev) => prev.filter((id) => id !== item.id))
        setIsOpen(true)
      }, 600)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <ContentWrapper className="py-8">
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-medium">My Wishlist</h1>
          <p className="mt-2 text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-secondary/50">
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-3 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <Link to={`/products/${item.id}`}>
                    <h3 className="mt-1 font-medium hover:underline line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="mt-2 font-semibold">${item.price}</p>
                  <Button
                    className={cn(
                      "mt-4 w-full transition-all",
                      addedIds.includes(item.id) && "bg-green-600 hover:bg-green-600"
                    )}
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    {addedIds.includes(item.id) ? (
                      "Added!"
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-secondary p-6">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Start adding your favorite fragrances to your wishlist by clicking
                the heart icon on any product.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </ContentWrapper>
    </div>
  )
}

import { ProductCard } from "@/components/product/product-card"
import { ReviewCard } from "@/components/shared/review-card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { getProductById, products, reviews } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/stores/cart.store"
import { useWishlistStore } from "@/stores/wishlist.store"
import {
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingBag,
  Star,
  Truck
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"

export default function ProductDetailPage() {
  const { productId } = useParams();

  if (!productId) {
    throw new Response("Not Found", { status: 404 });
  }

  const product = getProductById(productId);

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"description" | "notes" | "reviews">(
    "description"
  )
  const [cartAnimation, setCartAnimation] = useState(false)
  const [wishlistAnimation, setWishlistAnimation] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const { addItem, setIsOpen } = useCartStore()
  const { toggleItem, hasItem } = useWishlistStore()
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (product) {
      setIsWishlisted(hasItem(product.id))
    }
  }, [product, hasItem]);


  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const productReviews = reviews.filter((r) =>
    r.product.toLowerCase().includes(product.name.toLowerCase().split(" ")[0])
  )

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: product.size,
    })
    setCartAnimation(true)
    setTimeout(() => {
      setCartAnimation(false)
      setIsOpen(true)
    }, 600)
  }

  const handleToggleWishlist = () => {
    const added = toggleItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    })
    setIsWishlisted(added)
    setWishlistAnimation(true)
    setTimeout(() => setWishlistAnimation(false), 500)
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setReviewSubmitted(true)
    setTimeout(() => {
      setReviewDialogOpen(false)
      setTimeout(() => setReviewSubmitted(false), 300)
    }, 1500)
  }

  return (
    <div className="min-h-screen">
      <ContentWrapper className="py-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-foreground">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden bg-secondary/50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute left-4 top-4 bg-foreground px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-background">
                New
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </span>
            <h1 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating)
                        ? "fill-foreground text-foreground"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium">Size: {product.size}</p>
              <div className="flex gap-3">
                <Button variant="outline" className="border-foreground">
                  {product.size}
                </Button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-md border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className={cn(
                  "flex-1 transition-all duration-300",
                  cartAnimation && "scale-95 bg-green-600 hover:bg-green-600"
                )}
                size="lg"
                onClick={handleAddToCart}
              >
                {cartAnimation ? (
                  <>
                    <Check className="mr-2 h-4 w-4 animate-bounce" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "shrink-0 transition-all duration-300",
                  isWishlisted && "border-red-500 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 dark:bg-red-950 dark:hover:bg-red-900",
                  wishlistAnimation && "scale-125"
                )}
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all",
                    isWishlisted && "fill-red-500",
                    wishlistAnimation && "animate-pulse"
                  )}
                />
              </Button>

              <Button variant="outline" size="icon" className="shrink-0">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/50 pt-8">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders $100+</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-xs font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30 Day Policy</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-xs font-medium">Authentic</p>
                <p className="text-xs text-muted-foreground">100% Genuine</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border/50 pt-16">
          <div className="flex gap-8 border-b border-border/50">
            {(["description", "notes", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 text-sm font-medium capitalize transition-colors",
                  activeTab === tab
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "notes" ? "Fragrance Notes" : tab}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "notes" && product.notes && (
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="font-medium">Top Notes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The initial impression of the fragrance
                  </p>
                  <ul className="mt-4 space-y-2">
                    {product.notes.top.map((note) => (
                      <li
                        key={note}
                        className="text-sm text-muted-foreground"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Middle Notes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The heart of the fragrance
                  </p>
                  <ul className="mt-4 space-y-2">
                    {product.notes.middle.map((note) => (
                      <li
                        key={note}
                        className="text-sm text-muted-foreground"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Base Notes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The lasting foundation
                  </p>
                  <ul className="mt-4 space-y-2">
                    {product.notes.base.map((note) => (
                      <li
                        key={note}
                        className="text-sm text-muted-foreground"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {product.reviewCount} reviews
                  </p>
                  <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Write a Review</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                      </DialogHeader>
                      {reviewSubmitted ? (
                        <div className="flex flex-col items-center gap-4 py-8">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground">
                            <Check className="h-8 w-8 text-background" />
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">Thank you!</p>
                            <p className="text-sm text-muted-foreground">
                              Your review has been submitted.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Rating</Label>
                            <div className="mt-2 flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setReviewRating(star)}
                                  className="transition-transform hover:scale-110"
                                >
                                  <Star
                                    className={cn(
                                      "h-6 w-6 transition-colors",
                                      star <= reviewRating
                                        ? "fill-foreground text-foreground"
                                        : "fill-muted text-muted hover:fill-muted-foreground hover:text-muted-foreground"
                                    )}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea
                              id="review"
                              placeholder="Share your experience with this fragrance..."
                              required
                              rows={4}
                              className="mt-1 resize-none"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setReviewDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">Submit Review</Button>
                          </div>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {(productReviews.length > 0 ? productReviews : reviews.slice(0, 4)).map(
                    (review, index) => (
                      <ReviewCard key={index} {...review} />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-border/50 pt-16">
            <h2 className="font-serif text-2xl font-medium">You May Also Like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}



import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SheetFooter } from "@/components/ui/sheet"
import { useCartStore } from "@/stores/cart.store"
import {
    CreditCard,
    Minus,
    Plus,
    ShoppingBag,
    Trash2
} from "lucide-react"
import { Link } from "react-router"

export function CartView() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotal, 
    setStep, 
    setIsOpen
   } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <div className="rounded-full bg-secondary p-6">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="font-medium">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add some fragrances to get started
          </p>
        </div>
        <Link to="/products">
          <Button onClick={() => setIsOpen(false)}>Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border border-border/50 p-3"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary/50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <p className="font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SheetFooter className="border-t border-border/50">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">${getTotal().toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-muted-foreground">
              {getTotal() >= 100 ? "Free" : "$10.00"}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-semibold">
              ${(getTotal() + (getTotal() >= 100 ? 0 : 10)).toFixed(2)}
            </span>
          </div>
          <Button className="w-full" size="lg" onClick={() => setStep("checkout")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
        </div>
      </SheetFooter>
    </>
  )
}
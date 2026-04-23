import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart.store"
import {
    Check,
    Package
} from "lucide-react"

export function SuccessView() {
  const { setIsOpen, setStep } = useCartStore()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground">
        <Check className="h-10 w-10 text-background" />
      </div>
      <div>
        <h3 className="text-xl font-semibold">Order Confirmed!</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border/50 px-4 py-3">
        <Package className="h-5 w-5 text-muted-foreground" />
        <div className="text-left">
          <p className="text-sm font-medium">Estimated Delivery</p>
          <p className="text-xs text-muted-foreground">3-5 Business Days</p>
        </div>
      </div>
      <Button
        className="mt-4"
        onClick={() => {
          setStep("cart")
          setIsOpen(false)
        }}
      >
        Continue Shopping
      </Button>
    </div>
  )
}
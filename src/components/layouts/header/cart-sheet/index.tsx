import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { useCartStore, type CheckoutStep } from "@/stores/cart.store"
import { CartView } from "./cart-view"
import { CheckoutView } from "./checkout-view"
import { SuccessView } from "./success-view"

export function CartSheet() {
  const { isOpen, setIsOpen, step, getItemCount } = useCartStore()

  const titles: Record<CheckoutStep, string> = {
    cart: `Shopping Cart (${getItemCount()})`,
    checkout: "Checkout",
    success: "Order Complete",
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{titles[step]}</SheetTitle>
        </SheetHeader>
        {step === "cart" && <CartView />}
        {step === "checkout" && <CheckoutView />}
        {step === "success" && <SuccessView />}
      </SheetContent>
    </Sheet>
  )
}
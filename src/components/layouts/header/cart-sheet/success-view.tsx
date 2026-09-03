import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart.store";
import { Check, Package } from "lucide-react";

export function SuccessView() {
  const { setIsOpen, setStep } = useCartStore();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="bg-foreground flex h-20 w-20 items-center justify-center rounded-full">
        <Check className="text-background h-10 w-10" />
      </div>
      <div>
        <h3 className="text-xl font-semibold">Order Confirmed!</h3>
        <p className="text-muted-foreground mt-2">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>
      <div className="border-border/50 flex items-center gap-2 rounded-lg border px-4 py-3">
        <Package className="text-muted-foreground h-5 w-5" />
        <div className="text-left">
          <p className="text-sm font-medium">Estimated Delivery</p>
          <p className="text-muted-foreground text-xs">3-5 Business Days</p>
        </div>
      </div>
      <Button
        className="mt-4 cursor-pointer"
        onClick={() => {
          setStep("cart");
          setIsOpen(false);
        }}
      >
        Continue Shopping
      </Button>
    </div>
  );
}

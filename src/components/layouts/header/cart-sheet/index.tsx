import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/orders/useCart";
import { useCartStore, type CheckoutStep } from "@/stores/cart.store";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/validations/checkout.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CartView } from "./cart-view";
import { CheckoutView } from "./checkout-view";
import { CustomerInfoView } from "./customer-info-view";
import { SuccessView } from "./success-view";

export function CartSheet() {
  const { isOpen, setIsOpen, step } = useCartStore();

  const titles: Record<CheckoutStep, string> = {
    cart: `Shopping Cart`,
    info: "Customer Contact Info",
    checkout: "Checkout",
    success: "Order Complete",
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="flex h-screen w-full flex-col sm:max-w-md"
        aria-describedby="hello"
      >
        <SheetHeader>
          <SheetTitle>{titles[step]}</SheetTitle>
        </SheetHeader>

        <CheckoutForm />
      </SheetContent>
    </Sheet>
  );
}

export const CheckoutForm = () => {
  const { step, items } = useCartStore();

  const { itemMap, isPending, subtotal } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      customerNotes: "",
      items,
      image: undefined,
    },
  });

  useEffect(() => {
    form.setValue("items", items, { shouldValidate: true });
  }, [form, items]);

  return (
    <>
      {step === "cart" && (
        <CartView itemMap={itemMap} isPending={isPending} subtotal={subtotal} />
      )}

      {items.length > 0 && (
        <>
          {step !== "success" && step !== "cart" && (
            <Form {...form}>
              <form className="flex h-full flex-col justify-between">
                {step === "info" && (
                  <CustomerInfoView subtotal={subtotal} form={form} />
                )}
                {step === "checkout" && (
                  <CheckoutView form={form} subtotal={subtotal} />
                )}
              </form>
            </Form>
          )}
        </>
      )}

      {step === "success" && <SuccessView />}
    </>
  );
};

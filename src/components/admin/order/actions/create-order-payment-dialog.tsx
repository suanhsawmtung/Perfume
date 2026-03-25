import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useState } from "react";
import { CreateOrderPaymentForm } from "../form/create-order-payment-form";

interface CreateOrderPaymentDialogProps {
  orderCode: string;
  children: React.ReactNode;
}

export function CreateOrderPaymentDialog({
  orderCode,
  children,
}: CreateOrderPaymentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogWrapper
      title={`Create Payment for Order ${orderCode}`}
      close={() => setOpen(false)}
      onOpenChange={setOpen}
      open={open}
      triggerContent={children}
      className="w-full lg:min-w-2xl"
    >
      <CreateOrderPaymentForm
        orderCode={orderCode}
        onClose={() => setOpen(false)}
      />
    </DialogWrapper>
  );
}

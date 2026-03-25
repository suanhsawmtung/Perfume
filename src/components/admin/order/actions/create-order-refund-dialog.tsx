import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useState } from "react";
import { CreateOrderRefundForm } from "../form/create-order-refund-form";

interface CreateOrderRefundDialogProps {
  orderCode: string;
  children: React.ReactNode;
}

export function CreateOrderRefundDialog({
  orderCode,
  children,
}: CreateOrderRefundDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogWrapper
      title={`Create Refund for Order ${orderCode}`}
      close={() => setOpen(false)}
      onOpenChange={setOpen}
      open={open}
      triggerContent={children}
      className="w-full lg:min-w-2xl"
    >
      <CreateOrderRefundForm 
        orderCode={orderCode} 
        onClose={() => setOpen(false)}
      />
    </DialogWrapper>
  );
}

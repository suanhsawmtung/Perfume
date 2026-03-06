import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useState } from "react";
import { OrderFilterForm } from "../form/order-filter-form";

interface OrderFilterDialogProps {
  children: React.ReactNode;
}

export function OrderFilterDialog({ children }: OrderFilterDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogWrapper
      title="Filter Orders"
      close={() => setOpen(false)}
      onOpenChange={() => setOpen((prev) => !prev)}
      open={open}
      triggerContent={children}
    >
      <OrderFilterForm close={() => setOpen(false)} />
    </DialogWrapper>
  );
}

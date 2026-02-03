import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useState } from "react";
import { ProductFilterForm } from "../form/product-filter-form";

interface ProductFilterDialogProps {
  children: React.ReactNode;
}

export function ProductFilterDialog({ children }: ProductFilterDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogWrapper
      title="Filter Products"
      close={() => setOpen(false)}
      onOpenChange={() => setOpen((prev) => !prev)}
      open={open}
      triggerContent={children}
    >
      <ProductFilterForm close={() => setOpen(false)} />
    </DialogWrapper>
  );
}

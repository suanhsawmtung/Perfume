import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useState } from "react";
import { TransactionFilterForm } from "../form/transaction-filter-form";

interface TransactionFilterDialogProps {
  children: React.ReactNode;
}

export function TransactionFilterDialog({ children }: TransactionFilterDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogWrapper
      title="Filter Transactions"
      close={() => setOpen(false)}
      onOpenChange={() => setOpen((prev) => !prev)}
      open={open}
      triggerContent={children}
    >
      <TransactionFilterForm close={() => setOpen(false)} />
    </DialogWrapper>
  );
}

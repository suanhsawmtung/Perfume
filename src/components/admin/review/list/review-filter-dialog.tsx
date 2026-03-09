import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useState } from "react";
import { ReviewFilterForm } from "../form/review-filter-form";

interface ReviewFilterDialogProps {
  children: React.ReactNode;
}

export function ReviewFilterDialog({ children }: ReviewFilterDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogWrapper
      title="Filter Reviews"
      close={() => setOpen(false)}
      onOpenChange={() => setOpen((prev) => !prev)}
      open={open}
      triggerContent={children}
    >
      <ReviewFilterForm close={() => setOpen(false)} />
    </DialogWrapper>
  );
}

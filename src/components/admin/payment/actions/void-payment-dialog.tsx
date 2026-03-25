import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useVoidPayment } from "@/services/payment/queries/useVoidPayment";
import type { PaymentType } from "@/types/payment.type";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeletePaymentDialogProps {
  payment: PaymentType;
  children: React.ReactNode;
}

export function VoidPaymentDialog({
  payment,
  children,
}: DeletePaymentDialogProps) {
  const voidPaymentMutation = useVoidPayment();
  const [open, setOpen] = useState(false);

  const handleVoid = () => {
    voidPaymentMutation.mutate(payment.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      title="Void Payment"
      close={() => setOpen(false)}
      triggerContent={children}
    >
      <div className="space-y-6">
        {payment.status === "SUCCESS" ? (
          <p className="text-muted-foreground text-sm">
            Are you sure you want to void the payment for order{" "}
            <span className="text-foreground font-semibold">
              &quot;{payment?.order?.code}&quot;
            </span>
            ? This action cannot be undone.
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Only SUCCESS payment can be voided.
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={voidPaymentMutation.isPending}
          >
            {payment.status === "SUCCESS" ? "Cancel" : "Close"}
          </Button>
          {payment.status === "SUCCESS" && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleVoid}
              disabled={voidPaymentMutation.isPending}
            >
              {voidPaymentMutation.isPending && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Void
            </Button>
          )}
        </div>
      </div>
    </DialogWrapper>
  );
}

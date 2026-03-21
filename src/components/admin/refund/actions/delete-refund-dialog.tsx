import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useVoidRefundMutation } from "@/services/refund/queries/useVoidRefund";
import type { RefundType } from "@/types/refund.type";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface VoidRefundDialogProps {
  refund: RefundType;
  children: React.ReactNode;
}

export function VoidRefundDialog({
  refund,
  children,
}: VoidRefundDialogProps) {
  const voidRefundMutation = useVoidRefundMutation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (voidRefundMutation.isSuccess) {
      setOpen(false);
    }
  }, [voidRefundMutation.isSuccess]);

  const handleVoid = () => {
    voidRefundMutation.mutate(refund.id);
  };

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      title="Void Refund"
      close={() => setOpen(false)}
      triggerContent={children}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to void the refund for order{" "}
          <span className="text-foreground font-semibold">
            &quot;{refund.order?.code}&quot;
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={voidRefundMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleVoid}
            disabled={voidRefundMutation.isPending}
          >
            {voidRefundMutation.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Void
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
}

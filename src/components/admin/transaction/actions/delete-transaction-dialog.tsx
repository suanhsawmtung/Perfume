import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { formatPrice } from "@/lib/utils";
import { useDeleteTransactionMutation } from "@/services/transaction/queries/useDeleteTransaction";
import type { TransactionType } from "@/types/transaction.type";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DeleteTransactionDialogProps {
  transaction: TransactionType;
  children: React.ReactNode;
}

export function DeleteTransactionDialog({
  transaction,
  children,
}: DeleteTransactionDialogProps) {
  const deleteTransactionMutation = useDeleteTransactionMutation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (deleteTransactionMutation.isSuccess) {
      setOpen(false);
    }
  }, [deleteTransactionMutation.isSuccess]);

  const handleDelete = () => {
    deleteTransactionMutation.mutate(transaction.id);
  };

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      title="Delete Transaction"
      close={() => setOpen(false)}
      triggerContent={children}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete this transaction:{" "}
          <span className="text-foreground font-semibold">
            &quot;{transaction.type} - {formatPrice(transaction.amount)}&quot;
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteTransactionMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteTransactionMutation.isPending}
          >
            {deleteTransactionMutation.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Delete
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
}

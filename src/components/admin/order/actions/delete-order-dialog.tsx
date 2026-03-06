import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useDeleteOrderMutation } from "@/services/order/queries/useDeleteOrder";
import type { OrderType } from "@/types/order.type";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DeleteOrderDialogProps {
  order: OrderType;
  children: React.ReactNode;
}

export function DeleteOrderDialog({
  order,
  children,
}: DeleteOrderDialogProps) {
  const deleteOrderMutation = useDeleteOrderMutation();
  const [open, setOpen] = useState(false);
  const isCustomerOrder = order.source === "CUSTOMER";

  // Close dialog on successful deletion
  useEffect(() => {
    if (deleteOrderMutation.isSuccess) {
      setOpen(false);
    }
  }, [deleteOrderMutation.isSuccess]);

  const handleDelete = () => {
    if (isCustomerOrder) {
      toast.error("Orders created by customers are not allowed to be deleted.");
      return;
    }
    deleteOrderMutation.mutate({ code: order.code });
  };

  return (
    <DialogWrapper
      title={isCustomerOrder ? "Cannot Delete Order" : "Delete Order"}
      close={() => setOpen(false)}
      onOpenChange={setOpen}
      open={open}
      triggerContent={children}
    >
      <div className="space-y-6">
        {isCustomerOrder ? (
          <p className="text-muted-foreground text-sm">
            Order
            <span className="text-foreground font-semibold">
              "{order.code}"
            </span>
            was created by a customer and is not allowed to be deleted. Only admin-created orders can be deleted.
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete order{" "}
            <span className="text-foreground font-semibold">
              "{order.code}"
            </span>
            ? This action cannot be undone.
          </p>
        )}

        <div className="flex justify-end gap-2">
          {isCustomerOrder ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={deleteOrderMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteOrderMutation.isPending}
              >
                {deleteOrderMutation.isPending && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </DialogWrapper>
  );
}

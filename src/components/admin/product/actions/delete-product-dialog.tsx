import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useDeleteProductMutation } from "@/services/product/queries/useDeleteProduct";
import type { ProductType } from "@/types/product.type";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DeleteProductDialogProps {
  product: ProductType;
  children: React.ReactNode;
}

export function DeleteProductDialog({
  product,
  children,
}: DeleteProductDialogProps) {
  const deleteProductMutation = useDeleteProductMutation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (deleteProductMutation.isSuccess) {
      setOpen(false);
    }
  }, [deleteProductMutation.isSuccess]);

  const handleDelete = () => {
    deleteProductMutation.mutate({ slug: product.slug });
  };

  return (
    <DialogWrapper
      title="Delete Product"
      close={() => setOpen(false)}
      onOpenChange={setOpen}
      open={open}
      triggerContent={children}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete the product{" "}
          <span className="text-foreground font-semibold">
            &quot;{product.name}&quot;
          </span>
          ? Related product variants will also be deleted. This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteProductMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Delete
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
}

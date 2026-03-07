import { Button } from "@/components/ui/button";
import type { BrandListType } from "@/types/brand.type";
import { Loader2 } from "lucide-react";
import { Form, useNavigate, useNavigation } from "react-router";

interface DeleteBrandDialogProps {
  brand: BrandListType;
  cancelUrl?: string;
}

export function DeleteBrandDialog({
  brand,
  cancelUrl = "/admin/brands",
}: DeleteBrandDialogProps) {
  const hasProducts = brand._count.products > 0;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-6">
      {hasProducts ? (
        <p className="text-muted-foreground text-sm">
          Brand{" "}
          <span className="text-foreground font-semibold">
            &quot;{brand.name}&quot;
          </span>{" "}
          cannot be deleted because it is currently associated with{" "}
          <span className="text-foreground font-semibold">
            {brand._count.products}
          </span>{" "}
          product(s). Please remove all associated products before deleting this
          brand.
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete the brand{" "}
          <span className="text-foreground font-semibold">
            &quot;{brand.name}&quot;
          </span>
          ? This action cannot be undone.
        </p>
      )}

      <Form method="POST">
        <div className="flex justify-end gap-2">
          {hasProducts ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(cancelUrl)}
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(cancelUrl)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                Delete
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
}

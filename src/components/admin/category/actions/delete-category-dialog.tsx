import { Button } from "@/components/ui/button";
import type { CategoryListType } from "@/types/category.type";
import { Loader2 } from "lucide-react";
import { Form, useNavigate, useNavigation } from "react-router";

interface DeleteCategoryDialogProps {
  category: CategoryListType;
  cancelUrl?: string;
}

export function DeleteCategoryDialog({
  category,
  cancelUrl = "/admin/categories",
}: DeleteCategoryDialogProps) {
  const hasPosts = category._count.posts > 0;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-6">
      {hasPosts ? (
        <p className="text-muted-foreground text-sm">
          Category{" "}
          <span className="text-foreground font-semibold">
            &quot;{category.name}&quot;
          </span>{" "}
          cannot be deleted because it is currently associated with{" "}
          <span className="text-foreground font-semibold">
            {category._count.posts}
          </span>{" "}
          post(s). Please remove all associated posts before deleting this
          category.
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete the category{" "}
          <span className="text-foreground font-semibold">
            &quot;{category.name}&quot;
          </span>
          ? This action cannot be undone.
        </p>
      )}

      <Form method="POST">
        <div className="flex justify-end gap-2">
          {hasPosts ? (
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

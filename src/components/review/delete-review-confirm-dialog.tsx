import * as React from "react"
import { AlertTriangle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDeleteReviewMutation } from "@/services/review/queries/useDeleteReview"
import { type ReviewType } from "@/types/review.type"

type DeleteReviewConfirmDialogProps = {
    review: ReviewType
    title?: string
    description?: React.ReactNode
    confirmLabel?: string
    cancelLabel?: string
    variant?: "default" | "destructive"
    children: React.ReactNode
}

export function DeleteReviewConfirmDialog({
    review,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "destructive",
    children,
}: DeleteReviewConfirmDialogProps) {
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const deleteReviewMutation = useDeleteReviewMutation();
    const isDeleting = deleteReviewMutation.isPending;

    const handleDelete = () => {
        deleteReviewMutation.mutate({
            id: review.id,
            productId: review.product.id
        }, {
            onSuccess: () => {
                setIsConfirmOpen(false);
            },
        });
    };

    return (
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-md">
                <DialogHeader>
                    <div
                        className={cn(
                            "mb-2 flex h-11 w-11 items-center justify-center rounded-full",
                            variant === "destructive"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-secondary text-foreground"
                        )}
                    >
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsConfirmOpen(false)}
                        disabled={isDeleting}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={variant === "destructive" ? "destructive" : "default"}
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

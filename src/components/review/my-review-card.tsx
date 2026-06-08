import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { CheckCircle2, Clock, ImageIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import type { ReviewType } from "@/types/review.type";
import { StarRating } from "@/components/shared/star-rating";
import { EditReviewForm } from "./edit-review-form";
import { DeleteReviewConfirmDialog } from "./delete-review-confirm-dialog";

interface MyReviewCardProps {
    review: ReviewType;
    editingId: number | null;
    setEditingId: (id: number | null) => void;
}

export function MyReviewCard({
    review,
    editingId,
    setEditingId,
}: MyReviewCardProps) {
    return (
        <Card
            key={review.id}
            className={cn(
                "overflow-hidden transition-all duration-300"
            )}
        >
            <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                    {/* Product Image */}
                    <Link
                        to={`/products/${review.product.slug}`}
                        className="shrink-0"
                    >
                        <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-secondary/50">
                            {review.product.image ? (
                                <img
                                    src={review.product.image}
                                    alt={review.product.name || "Product image"}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                                    <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">
                                    {review.product.brand}
                                </p>
                                <Link to={`/products/${review.product.slug}`}>
                                    <h3 className="truncate font-medium hover:underline">
                                        {review.product.name}
                                    </h3>
                                </Link>
                            </div>
                            {/* Status Badge */}
                            <span
                                className={cn(
                                    "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                                    review.isPublish
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                                )}
                            >
                                {review.isPublish ? (
                                    <CheckCircle2 className="h-3 w-3" />
                                ) : (
                                    <Clock className="h-3 w-3" />
                                )}
                                {review.isPublish ? "Published" : "Pending"}
                            </span>
                        </div>

                        {editingId === review.id ? (
                            /* Edit Form */
                            <div className="mt-4">
                                <EditReviewForm
                                    review={review}
                                    setEditingId={setEditingId}
                                />
                            </div>
                        ) : (
                            /* Review Display */
                            <>
                                <div className="mt-2 flex items-center gap-2">
                                    <StarRating rating={review.rating} />
                                    <span className="text-xs text-muted-foreground">
                                        {formatDate(review.createdAt)}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                    {review.content}
                                </p>
                                {!review.isPublish && (
                                    <div className="mt-4 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setEditingId(review.id)}
                                        >
                                            <Pencil className="mr-1.5 h-3.5 w-3.5" />
                                            Edit
                                        </Button>
                                        <DeleteReviewConfirmDialog
                                            review={review}
                                            title="Delete Review"
                                            description="Are you sure you want to delete this review? This action cannot be undone."
                                            confirmLabel="Delete"
                                            cancelLabel="Cancel"
                                            variant="destructive"
                                            triggerContent={
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                >
                                                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                                    Delete
                                                </Button>
                                            }
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
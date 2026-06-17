import { BadgeCheck, CheckCircle, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingDisplay } from "@/components/shared/rating";
import { DEFAULT_LIMIT } from "@/services/review/api"
import { useGetInfiniteProductReviews } from "@/services/review/queries/useGetInfiniteProductReviews";
import { formatDate, formatImagePath, formatName } from "@/lib/utils";
import { WriteReviewDialog } from "./write-review-dialog";

export function ProductReviews({ productId, canReview, hasReviewed }: { productId: number, canReview: boolean, hasReviewed: boolean }) {

    const params = {
        limit: DEFAULT_LIMIT,
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useGetInfiniteProductReviews(productId, params);

    const reviews = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between mx-auto max-w-3xl">
                <p className="text-sm text-muted-foreground">
                    {data?.pages[0].totalCount ?? 0} reviews
                </p>
                {hasReviewed ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        You've reviewed this product
                    </div>

                ) : (
                    <WriteReviewDialog
                        productId={productId}
                        canReview={canReview}
                    />
                )
                }
            </div >
            <div className="mx-auto max-w-3xl divide-y divide-border/50">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="p-6 space-y-6 text-center">
                        <MessageSquare className="h-8 w-8 text-muted-foreground" />
                        <h2 className="text-xl font-semibold">No reviews found</h2>
                    </div>
                ) : (
                    <>
                        {reviews.map(review => (
                            <div key={review.id} className="flex gap-4 py-6 first:pt-0">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium uppercase text-foreground overflow-hidden">
                                    {review.user.image ? (
                                        <img
                                            src={formatImagePath(review.user.image, "user")}
                                            alt={
                                                formatName({
                                                    firstName: review.user.firstName,
                                                    lastName: review.user.lastName,
                                                    username: review.user.username
                                                })
                                            }
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                                            <User className="h-5 w-5 text-muted-foreground/30" />
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span className="font-medium">
                                            {
                                                formatName({
                                                    firstName: review.user.firstName,
                                                    lastName: review.user.lastName,
                                                    username: review.user.username
                                                })
                                            }
                                        </span>
                                        {review.user.emailVerifiedAt && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                <BadgeCheck className="h-3.5 w-3.5 text-foreground" />
                                                Verified
                                            </span>
                                        )}
                                        <span className="text-xs text-muted-foreground">
                                            · {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-0.5">
                                        <RatingDisplay rating={review.rating} size={16} />
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {review.content}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {hasNextPage && (
                            <div className="mt-8 flex justify-center">
                                <Button
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    variant="outline"
                                    className="w-full max-w-xs"
                                >
                                    {isFetchingNextPage ? "Loading more..." : "Load more orders"}
                                </Button>
                            </div>
                        )}
                    </>
                )
                }
            </div >
        </div >
    )
}
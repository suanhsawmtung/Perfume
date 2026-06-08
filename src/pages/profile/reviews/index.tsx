import { Button } from "@/components/ui/button"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { useState } from "react"
import { Link, useSearchParams } from "react-router"
import { DEFAULT_LIMIT } from "@/services/review/api"
import { SearchInput } from "@/components/shared/search-input"
import { useAuthStore } from "@/stores/auth.store"
import { useGetInfiniteReviews } from "@/services/review/queries/useGetInfiniteReviews"
import { SearchTabGroup } from "@/components/shared/search-tab-group"
import { Card, CardContent } from "@/components/ui/card"
import { MyReviewCard } from "@/components/review/my-review-card"

export default function OrderHistoryPage() {
    const [searchParams] = useSearchParams()
    const user = useAuthStore.getState().authUser;

    if (!user) {
        throw new Response("Unauthorized", { status: 401 });
    }

    const [editingId, setEditingId] = useState<number | null>(null)

    const search = searchParams.get("search") || undefined;
    const statusParam = searchParams.get("status");
    const status = !statusParam
        ? undefined
        : statusParam === "published"
            ? "publish" as "publish" | "unpublish"
            : statusParam === "pending"
                ? "unpublish" as "publish" | "unpublish"
                : undefined;

    const params = {
        status,
        search,
        limit: DEFAULT_LIMIT,
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useGetInfiniteReviews(user.id, params)

    const reviews = data?.pages.flatMap((page) => page.items) ?? []

    return (
        <div className="min-h-screen bg-secondary/20">
            <ContentWrapper className="py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-end gap-4">
                    <div className="space-y-2">
                        <Link
                            to="/profile"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Profile
                        </Link>
                        <h1 className="mt-2 font-serif text-3xl font-medium">My Reviews</h1>
                        {reviews.length > 0 && (
                            <p className="text-muted-foreground">
                                View and track {reviews.length} of {data?.pages[0].totalCount} reviews
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 w-full md:w-auto">
                        <SearchTabGroup
                            paramKey="status"
                            defaultValue="all"
                            options={[
                                { label: "All", value: "all" },
                                { label: "Published", value: "published" },
                                { label: "Pending", value: "pending" },
                            ]}
                        />
                        <SearchInput
                            placeholder="Enter your review content..."
                            className="w-full md:w-72 h-10"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : reviews.length === 0 ? (
                        <Card className="py-16">
                            <CardContent className="flex flex-col items-center justify-center text-center">
                                <div className="rounded-full bg-secondary p-6">
                                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h2 className="mt-6 text-xl font-semibold">No reviews found</h2>
                                <p className="mt-2 max-w-sm text-muted-foreground">
                                    {status === "publish"
                                        ? "You have no published reviews yet."
                                        : status === "unpublish"
                                            ? "You have no unpublished reviews yet."
                                            : "You haven't written any reviews yet. Share your thoughts on products you've purchased."}
                                </p>
                                <Button className="mt-6" asChild>
                                    <Link to="/products">Browse Products</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {reviews.map((review) => (
                                <MyReviewCard
                                    key={review.id}
                                    review={review}
                                    editingId={editingId}
                                    setEditingId={setEditingId}
                                />
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
                    )}
                </div>
            </ContentWrapper>
        </div >
    )
}

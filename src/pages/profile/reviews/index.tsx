import { MyReviewCard } from "@/components/review/my-review-card";
import { SearchInput } from "@/components/shared/search-input";
import { SearchTabGroup } from "@/components/shared/search-tab-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContentWrapper from "@/components/wrapper/content-wrapper";
import { getMyReviewsDocumentTitle } from "@/lib/utils";
import { DEFAULT_LIMIT } from "@/services/review/api";
import { useGetInfiniteReviews } from "@/services/review/queries/useGetInfiniteReviews";
import { useAuthStore } from "@/stores/auth.store";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function OrderHistoryPage() {
  const [searchParams] = useSearchParams();
  const user = useAuthStore.getState().authUser;

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const [editingId, setEditingId] = useState<number | null>(null);

  const search = searchParams.get("search") || undefined;
  const statusParam = searchParams.get("status");
  const status = !statusParam
    ? undefined
    : statusParam === "published"
      ? ("publish" as "publish" | "unpublish")
      : statusParam === "pending"
        ? ("unpublish" as "publish" | "unpublish")
        : undefined;

  const params = {
    status,
    search,
    limit: DEFAULT_LIMIT,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteReviews(user.id, params);

  const reviews = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    document.title = getMyReviewsDocumentTitle({ status });
  }, [status]);

  return (
    <div className="bg-secondary/20 min-h-screen">
      <ContentWrapper className="py-8">
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Link
              to="/profile"
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
            <h1 className="mt-2 font-serif text-3xl font-medium">My Reviews</h1>
            {reviews.length > 0 && (
              <p className="text-muted-foreground">
                View and track {reviews.length} of {data?.pages[0].totalCount}{" "}
                reviews
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-4 md:w-auto lg:flex-row">
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
              className="h-10 w-full md:w-72"
            />
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          ) : reviews.length === 0 ? (
            <Card className="py-16">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <div className="bg-secondary rounded-full p-6">
                  <MessageSquare className="text-muted-foreground h-8 w-8" />
                </div>
                <h2 className="mt-6 text-xl font-semibold">No reviews found</h2>
                <p className="text-muted-foreground mt-2 max-w-sm">
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
                    {isFetchingNextPage
                      ? "Loading more..."
                      : "Load more orders"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
}

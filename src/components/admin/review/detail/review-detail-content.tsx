import { RatingDisplay } from "@/components/shared/rating";
import { formatDate, formatName } from "@/lib/utils";
import type { ReviewListType } from "@/types/review.type";

export function ReviewDetailContent({ review }: { review: ReviewListType }) {
  const userName = formatName({
    firstName: review.user.firstName,
    lastName: review.user.lastName,
    username: review.user.username,
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">User</h3>
            <p className="mt-1 font-semibold text-primary">{userName}</p>
            <p className="text-sm text-muted-foreground">{review.user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
            <p className="mt-1 font-semibold text-primary">{review.product.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
            <div className="mt-1">
              <RatingDisplay rating={Number(review.rating)} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <p className="mt-1">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                review.isPublish ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {review.isPublish ? "Published" : "Unpublished"}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
            <p className="mt-1 text-primary">{formatDate(review.createdAt)}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Review Content</h3>
        <div className="mt-2 rounded-lg border bg-muted/50 p-4">
          <p className="whitespace-pre-wrap text-primary">{review.content}</p>
        </div>
      </div>
    </div>
  );
}

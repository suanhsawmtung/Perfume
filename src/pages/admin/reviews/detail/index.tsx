import { ReviewDetailContent } from "@/components/admin/review/detail/review-detail-content";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetReview } from "@/services/review/queries/useGetReview";
import { ChevronLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router";

const AdminReviewDetailPage = () => {
  const { id } = useLoaderData() as { id: number };
  const { data: review } = useGetReview(id);

  return (
    <section className="w-full">
      <AdminHeaderSection title="Review Detail" />

      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1 text-muted-foreground">
            <Link to="/admin/reviews">
              <ChevronLeft size={16} />
              Back to Reviews
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Review Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewDetailContent review={review} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminReviewDetailPage;

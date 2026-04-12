import { ReviewDetailContent } from "@/components/admin/review/detail/review-detail-content";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetReview } from "@/services/review/queries/useGetReview";
import { useLoaderData } from "react-router";

const AdminReviewDetailPage = () => {
  const { id } = useLoaderData() as { id: number };
  const { data: review } = useGetReview(id);

  return (
    <section className="w-full">
      <AdminHeaderSection title="Review Detail" />

      <div className="space-y-6">
        <BackButton to="/admin/reviews" />

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

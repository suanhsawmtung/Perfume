import { ReviewFilterBar } from "@/components/admin/review/list/review-filter-bar";
import { ReviewList } from "@/components/admin/review/list/reviews-list";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { DEFAULT_LIMIT } from "@/services/review/api";
import { useListReviews } from "@/services/review/queries/useGetReviews";
import { useSearchParams } from "react-router";

const AdminReviewsPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") ?? 1);
  const statusParam = searchParams.get("status");
  const status = (statusParam === "publish" || statusParam === "unpublish") ? statusParam : undefined;
  const user = searchParams.get("user") || "";
  const product = searchParams.get("product") || "";

  const offset = (page - 1) * DEFAULT_LIMIT;

  const { data } = useListReviews({
    offset,
    search,
    limit: DEFAULT_LIMIT,
    status,
    user,
    product,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Reviews" />

      <div className="space-y-5">
        <ReviewFilterBar />

        {data && (
          <ReviewList
            reviews={data.items}
            total={data.totalPages}
            page={data.currentPage}
            size={data.pageSize}
          />
        )}
      </div>
    </section>
  );
};

export default AdminReviewsPage;

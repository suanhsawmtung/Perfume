import { RatingsList } from "@/components/admin/product-rating/list/ratings-list";
import { SummaryList } from "@/components/admin/product-rating/list/summary-list";
import { ProductRatingTabs } from "@/components/admin/product-rating/product-rating-tabs";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { FilterBar } from "@/components/admin/shared/filter-bar";
import { DEFAULT_LIMIT } from "@/services/product-rating/api";
import { useListProductRatingSummary } from "@/services/product-rating/queries/useGetListProductRatingSummary";
import { useListProductRatings } from "@/services/product-rating/queries/useGetListProductRatings";
import { useLocation, useSearchParams } from "react-router";

const AdminProductRatingsPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") ?? 1);
  const offset = (page - 1) * DEFAULT_LIMIT;

  const isSummary = location.pathname.endsWith("/summary");
  const activeTab = isSummary ? "summary" : "detailed";

  const { data: ratingsData } = useListProductRatings({
    offset,
    search,
    limit: DEFAULT_LIMIT,
  });

  const { data: summaryData } = useListProductRatingSummary({
    offset,
    search,
    limit: DEFAULT_LIMIT,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Ratings" />

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <ProductRatingTabs activeTab={activeTab} />

          <FilterBar />
        </div>

        {activeTab === "detailed" && ratingsData && (
          <RatingsList
            ratings={ratingsData.items}
            total={ratingsData.totalPages}
            page={ratingsData.currentPage}
          />
        )}

        {activeTab === "summary" && summaryData && (
          <SummaryList
            summaries={summaryData.items}
            total={summaryData.totalPages}
            page={summaryData.currentPage}
          />
        )}
      </div>
    </section>
  );
};

export default AdminProductRatingsPage;

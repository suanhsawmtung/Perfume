import { AdminPagination } from "@/components/admin/shared/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProductRatingSummaryType } from "@/types/product-rating.type";
import { FilterTags } from "../../shared/filter-tags";
import { summaryColumns } from "./table/summary-columns";
import { DataTable } from "./table/data-table";

export const SummaryList = ({
  summaries,
  total,
  page,
}: {
  summaries: ProductRatingSummaryType[];
  total: number;
  page: number;
}) => {
  const totalPages = Math.ceil(total / 10);
  const currentPage = page;

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start gap-2 px-4 md:flex-row md:justify-between md:px-6">
        <CardTitle className="w-full text-lg font-semibold md:w-1/4 md:text-2xl">
          Product Rating Summary
        </CardTitle>

        <div className="w-full md:w-3/4">
          <FilterTags allowedFilters={{ search: true, product: true }} />
        </div>
      </CardHeader>

      <CardContent className="min-h-[600px] px-4 md:px-6">
        <DataTable columns={summaryColumns} data={summaries} />
      </CardContent>

      {totalPages > 1 && (
        <CardFooter className="px-4 md:px-6">
          <div className="w-full lg:w-1/2">
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/product-ratings/summary"
              className="flex justify-center lg:justify-start"
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

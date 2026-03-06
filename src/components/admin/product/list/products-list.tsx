import { AdminPagination } from "@/components/admin/shared/pagination";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FilterTags } from "../../shared/filter-tags";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

export function ProductList({
  products,
  total,
  page,
}: {
  products: ProductListType[];
  total?: number;
  page?: number;
  size?: number;
}) {
  const currentPage = page || 1;
  const totalPages = total || 1;

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start gap-2 px-4 md:flex-row md:justify-between md:px-6">
        <CardTitle className="w-full text-lg font-semibold md:w-1/4 md:text-2xl">
          All Products
        </CardTitle>

        <div className="w-full md:w-3/4">
          <FilterTags
            allowedFilters={{
              search: true,
              brand: true,
              gender: ["MALE", "FEMALE", "UNISEX"],
              concentration: ["EDC", "EDT", "EDP", "PARFUM"],
              isActive: ["true", "false"],
              isLimited: ["true", "false"],
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="min-h-[600px] px-4 md:px-6">
        <DataTable columns={columns} data={products} />
      </CardContent>

      {totalPages > 1 && (
        <CardFooter className="px-4 md:px-6">
          <div className="w-full lg:w-1/2">
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/products"
              className="flex justify-center lg:justify-start"
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

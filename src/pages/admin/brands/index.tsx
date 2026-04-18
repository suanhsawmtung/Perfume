import { BrandList } from "@/components/admin/brand/list/brands-list";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { CreateButton } from "@/components/admin/shared/create-button";
import { FilterBar } from "@/components/admin/shared/filter-bar";
import { DEFAULT_LIMIT } from "@/services/brand/api";
import { useListBrands } from "@/services/brand/queries/useGetListBrands";
import { Outlet, useSearchParams } from "react-router";

const AdminBrandsPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") ?? 1);

  const offset = (page - 1) * DEFAULT_LIMIT;

  const { data } = useListBrands({
    offset,
    search,
    limit: DEFAULT_LIMIT,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Brands" />

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <CreateButton text="Create Brand" to="/admin/brands/create" />

          <FilterBar />
        </div>

        {data && (
          <BrandList
            brands={data.items}
            total={data.totalPages}
            page={data.currentPage}
            size={data.pageSize}
          />
        )}

        <Outlet />
      </div>
    </section>
  );
};

export default AdminBrandsPage;

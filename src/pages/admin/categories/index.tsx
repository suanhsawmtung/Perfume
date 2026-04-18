import { CategoryList } from "@/components/admin/category/list/categories-list";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { CreateButton } from "@/components/admin/shared/create-button";
import { FilterBar } from "@/components/admin/shared/filter-bar";
import { DEFAULT_LIMIT } from "@/services/category/api";
import { useListCategories } from "@/services/category/queries/useGetListCategories";
import { Outlet, useSearchParams } from "react-router";

const AdminCategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") ?? 1);

  const offset = (page - 1) * DEFAULT_LIMIT;

  const { data } = useListCategories({
    offset,
    search,
    limit: DEFAULT_LIMIT,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Post Categories" />

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <CreateButton
            text="Create Category"
            to="/admin/categories/create"
          />

          <FilterBar />
        </div>

        {data && (
          <CategoryList
            categories={data.items}
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

export default AdminCategoriesPage;

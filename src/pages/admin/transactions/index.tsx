import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { CreateButton } from "@/components/admin/shared/create-button";
import { FilterBar } from "@/components/admin/shared/filter-bar";
import { MoreFilterButton } from "@/components/admin/shared/more-filter-button";
import { TransactionFilterDialog } from "@/components/admin/transaction/list/transaction-filter-dialog";
import { TransactionsList } from "@/components/admin/transaction/list/transaction-list";
import { isTransactionDirection, isTransactionType } from "@/lib/utils";
import { DEFAULT_LIMIT } from "@/services/transaction/api";
import { useListTransactions } from "@/services/transaction/queries/useGetTransactions";
import { useSearchParams } from "react-router";

export default function AdminTransactionsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") ?? 1);
  
  const typeParam = searchParams.get("type");
  const type = isTransactionType(typeParam) ? typeParam : undefined;

  const directionParam = searchParams.get("direction");
  const direction = isTransactionDirection(directionParam) ? directionParam : undefined;

  const offset = (page - 1) * DEFAULT_LIMIT;

  const { data } = useListTransactions({
    limit: DEFAULT_LIMIT,
    offset,
    search,
    type,
    direction,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Transactions" />

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-2">
            <CreateButton text="Create Transaction" to="/admin/transactions/create" />

            <div className="block sm:hidden">
              <TransactionFilterDialog>
                <MoreFilterButton />
              </TransactionFilterDialog>
            </div>
          </div>

          <FilterBar>
            <TransactionFilterDialog>
              <MoreFilterButton />
            </TransactionFilterDialog>
          </FilterBar>
        </div>

        {data && (
          <TransactionsList
            transactions={data.items}
            total={data.totalPages}
            page={data.currentPage}
          />
        )}
      </div>
    </section>
  );
}

import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { TransactionForm } from "@/components/admin/transaction/form/transaction-form";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTransaction } from "@/services/transaction/queries/useGetTransaction";
import { useParams } from "react-router";

export default function AdminTransactionEditPage() {
  const { id } = useParams();

  if (!id) {
    throw new Response("Transaction ID is required", { status: 400 });
  }

  const { data: transaction } = useGetTransaction(Number(id));

  return (
    <section className="w-full">
      <AdminHeaderSection title="Edit Transaction" />
      <div className="space-y-5">
        <BackButton to="/admin/transactions" />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <TransactionForm transaction={transaction} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

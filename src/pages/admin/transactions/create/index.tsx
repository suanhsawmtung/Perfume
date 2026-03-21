import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { TransactionForm } from "@/components/admin/transaction/form/transaction-form";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminTransactionCreatePage() {
  return (
    <section className="w-full">
      <AdminHeaderSection title="Create Transaction" />

      <div className="space-y-5">
        <BackButton to="/admin/transactions" />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <TransactionForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

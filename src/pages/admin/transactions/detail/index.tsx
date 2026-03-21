import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  cn,
  formatDateTime,
  formatName,
  formatPrice,
  getTransactionTypeVariant
} from "@/lib/utils";
import { useGetTransaction } from "@/services/transaction/queries/useGetTransaction";
import type {
  TransactionTypeEnum
} from "@/types/transaction.type";
import { useParams } from "react-router";

const AdminTransactionDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    throw new Response("Transaction ID is required", { status: 400 });
  }

  const { data: transaction } = useGetTransaction(Number(id));

  return (
    <section className="w-full">
      <AdminHeaderSection title="Transaction Detail" />

      <div className="space-y-5">
        <BackButton to="/admin/transactions" />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
              {/* Main Info section */}
              <div className="flex w-full flex-col gap-4">
                <div>
                  <h1 className="text-2xl font-bold lg:text-3xl">
                    Transaction #{transaction.id}
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-x-4">
                      <div className="flex min-w-32 items-center justify-between text-muted-foreground font-semibold">
                        <span>Type</span>
                        <span>-</span>
                      </div>
                      <Badge
                        variant={getTransactionTypeVariant(
                          transaction.type as TransactionTypeEnum
                        )}
                      >
                        {transaction.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div className="flex min-w-32 items-center justify-between text-muted-foreground font-semibold">
                        <span>Amount</span>
                        <span>-</span>
                      </div>
                      <div className={cn("font-semibold flex items-center gap-x-1", transaction.direction === "IN" ? "text-green-500" : "text-red-500")}>
                        <span>{transaction.direction === "IN" ? "+" : "-"}</span>
                        <span>{formatPrice(transaction.amount)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div className="flex min-w-32 items-center justify-between text-muted-foreground font-semibold">
                        <span>Created At</span>
                        <span>-</span>
                      </div>
                      <span>{formatDateTime(transaction.createdAt)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-x-4">
                      <div className="flex min-w-32 items-center justify-between text-muted-foreground font-semibold">
                        <span>Source</span>
                        <span>-</span>
                      </div>
                      <span className="font-medium text-base">
                        {transaction.source}
                      </span>
                    </div>

                    {transaction.reference && (
                      <div className="flex items-center gap-x-4">
                        <div className="flex min-w-32 items-center justify-between text-muted-foreground font-semibold">
                          <span>Reference</span>
                          <span>-</span>
                        </div>
                        <span className="font-medium">
                          {transaction.reference}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-x-4">
                      <div className="flex min-w-32 items-center justify-between text-muted-foreground font-semibold">
                        <span>Created By</span>
                        <span>-</span>
                      </div>
                      <span className="font-medium">
                        {transaction.createdBy
                          ? formatName({
                              firstName: transaction.createdBy.firstName,
                              lastName: transaction.createdBy.lastName,
                              username: transaction.createdBy.username,
                            })
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Note
                  </h3>
                  <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {transaction.note || "No note provided."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminTransactionDetailPage;

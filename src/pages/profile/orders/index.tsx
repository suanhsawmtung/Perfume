import { NoOrdersFoundCard } from "@/components/order/no-orders-found-card";
import { OrderCard } from "@/components/order/order-card";
import { PaymentProofDialog } from "@/components/order/payment-proof-dialog";
import { ReceiptSheet } from "@/components/order/receipt-sheet";
import { SearchInput } from "@/components/shared/search-input";
import { SearchTabGroup } from "@/components/shared/search-tab-group";
import { Button } from "@/components/ui/button";
import ContentWrapper from "@/components/wrapper/content-wrapper";
import { DEFAULT_LIMIT } from "@/services/order/api";
import { useGetInfiniteOrders } from "@/services/order/queries/useGetInfiniteOrders";
import { useAuthStore } from "@/stores/auth.store";
import type { OrderType } from "@/types/order.type";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function OrderHistoryPage() {
  const [searchParams] = useSearchParams();
  const user = useAuthStore.getState().authUser;

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [paymentProofOpen, setPaymentProofOpen] = useState(false);
  const [cancellingOrderCode, setCancellingOrderCode] = useState<string | null>(
    null,
  );

  const search = searchParams.get("search") || undefined;
  const condition = searchParams.get("condition") || undefined;

  const params = {
    condition,
    search,
    limit: DEFAULT_LIMIT,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteOrders(user.id, params);

  const orders = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="bg-secondary/20 min-h-screen">
      <ContentWrapper className="py-8">
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Link
              to="/profile"
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
            <h1 className="mt-2 font-serif text-3xl font-medium">
              Order History
            </h1>
            {orders.length > 0 && (
              <p className="text-muted-foreground">
                View and track {orders.length} of {data?.pages[0].totalCount}{" "}
                orders
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-4 md:w-auto lg:flex-row">
            <SearchTabGroup
              paramKey="condition"
              defaultValue="all"
              options={[
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
            <SearchInput
              placeholder="Enter your order code..."
              className="h-10 w-full md:w-72"
            />
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          ) : orders.length === 0 ? (
            <NoOrdersFoundCard />
          ) : (
            <>
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  cancellingOrderCode={cancellingOrderCode}
                  setCancellingOrderCode={setCancellingOrderCode}
                  setReceiptOpen={setReceiptOpen}
                  setPaymentProofOpen={setPaymentProofOpen}
                  setSelectedOrder={setSelectedOrder}
                />
              ))}

              {hasNextPage && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    variant="outline"
                    className="w-full max-w-xs"
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : "Load more orders"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </ContentWrapper>

      {/* Receipt Sheet */}
      <ReceiptSheet
        open={receiptOpen}
        onOpenChange={setReceiptOpen}
        order={selectedOrder}
      />

      {/* Payment Proof Dialog */}
      <PaymentProofDialog
        open={paymentProofOpen}
        onOpenChange={setPaymentProofOpen}
        selectedOrderImage={selectedOrder?.image}
        selectedOrderCode={selectedOrder?.code}
      />
    </div>
  );
}

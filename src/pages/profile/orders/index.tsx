import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { ArrowLeft, Receipt } from "lucide-react"
import { useState } from "react"
import { Link, useSearchParams } from "react-router"
import { useGetInfiniteOrders } from "@/services/order/queries/useGetInfiniteOrders"
import { DEFAULT_LIMIT } from "@/services/order/api"
import type { OrderType } from "@/types/order.type"
import { SearchInput } from "@/components/shared/search-input"
import { OrderCard } from "@/components/order/order-card"
import { useAuthStore } from "@/stores/auth.store"
import { ReceiptSheet } from "@/components/order/receipt-sheet"
import { PaymentProofDialog } from "@/components/order/payment-proof-dialog"
import { SearchTabGroup } from "@/components/shared/search-tab-group"

export default function OrderHistoryPage() {
  const [searchParams] = useSearchParams()
  const user = useAuthStore.getState().authUser;

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [receiptOpen, setReceiptOpen] = useState(false)
  const [paymentProofOpen, setPaymentProofOpen] = useState(false);
  const [cancellingOrderCode, setCancellingOrderCode] = useState<string | null>(null)

  const search = searchParams.get("search") || undefined
  const condition = searchParams.get("condition") || undefined

  const params = {
    condition,
    search,
    limit: DEFAULT_LIMIT,
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteOrders(user.id, params)

  const orders = data?.pages.flatMap((page) => page.items) ?? []

  return (
    <div className="min-h-screen bg-secondary/20">
      <ContentWrapper className="py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <Link
              to="/profile"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
            <h1 className="mt-2 font-serif text-3xl font-medium">Order History</h1>
            <p className="text-muted-foreground">
              View and track all your orders
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 w-full md:w-auto">
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
              className="w-full md:w-72 h-10"
            />
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : orders.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <Receipt className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mt-2 mb-6">You haven't placed any orders yet.</p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </Card>
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
                    {isFetchingNextPage ? "Loading more..." : "Load more orders"}
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
        selectedOrder={selectedOrder}
      />
    </div >
  )
}

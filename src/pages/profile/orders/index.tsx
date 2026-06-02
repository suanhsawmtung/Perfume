import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { ArrowLeft, Receipt } from "lucide-react"
import { useState } from "react"
import { Link, useLoaderData, useSearchParams } from "react-router"
import type { loader } from "./loader"
import { useListOrders } from "@/services/order/queries/useGetOrders"
import type { OrderType } from "@/types/order.type"
import { Pagination } from "@/components/shared/pagination"
import { SearchInput } from "@/components/shared/search-input"
import { OrderCard } from "@/components/order/order-card"
import { useAuthStore } from "@/stores/auth.store"
import { ReceiptSheet } from "@/components/order/receipt-sheet"
import { PaymentProofDialog } from "@/components/order/payment-proof-dialog"
import { SearchTabGroup } from "@/components/shared/search-tab-group"

export default function OrderHistoryPage() {
  const { params } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const user = useAuthStore.getState().authUser;

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [receiptOpen, setReceiptOpen] = useState(false)
  const [paymentProofOpen, setPaymentProofOpen] = useState(false);
  const [cancellingOrderCode, setCancellingOrderCode] = useState<string | null>(null)

  const { data } = useListOrders(user.id, params);

  const orders = data?.items ?? []
  const currentPage = data?.currentPage ?? 1
  const totalPages = data?.totalPages ?? 1

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
          {orders.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <Receipt className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mt-2 mb-6">You haven't placed any orders yet.</p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </Card>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                cancellingOrderCode={cancellingOrderCode}
                setCancellingOrderCode={setCancellingOrderCode}
                setReceiptOpen={setReceiptOpen}
                setPaymentProofOpen={setPaymentProofOpen}
                setSelectedOrder={setSelectedOrder}
              />
            ))
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  const newSearchParams = new URLSearchParams(searchParams)
                  newSearchParams.set("page", page.toString())
                  setSearchParams(newSearchParams)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              />
            </div>
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
      {/* <Dialog open={paymentProofOpen} onOpenChange={setPaymentProofOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex items-center justify-between">
              Payment Proof
              {selectedOrder && (
                <span className="text-sm font-normal text-muted-foreground">
                  #{selectedOrder.code}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="p-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary/50 flex flex-col items-center justify-center border border-muted-foreground/20">
                {selectedOrder.image ? (
                  <img
                    src={formatImagePath(selectedOrder.image, "order")}
                    alt="Payment proof"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                    <Receipt className="h-10 w-10 mb-2 opacity-50" />
                    <p className="text-sm font-medium">No Payment Slip Uploaded</p>
                    <p className="text-xs opacity-75 mt-1">Please upload proof of bank transfer payment.</p>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="font-medium">{formatPrice(selectedOrder.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">Bank Transfer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  <span className="font-medium">{selectedOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{formatDate(selectedOrder.createdAt)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}

      <PaymentProofDialog
        open={paymentProofOpen}
        onOpenChange={setPaymentProofOpen}
        selectedOrder={selectedOrder}
      />
    </div >
  )
}

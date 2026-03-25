import { PendingPaymentAlert } from "@/components/admin/order/actions/pending-payment-alert";
import OrderDetailCard from "@/components/admin/order/detail/order-detail-card";
import { OrderPaymentsList } from "@/components/admin/order/detail/order-payments-list";
import { OrderRefundsList } from "@/components/admin/order/detail/order-refunds-list";
import { OrderItemsList } from "@/components/admin/order/order-items/order-items-list";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOrder } from "@/services/order/queries/useGetOrder";
import { useParams } from "react-router";

const AdminOrderDetailPage = () => {
  const { code } = useParams();

  if (!code) {
    throw new Response("Order code is required", { status: 400 });
  }

  const { data: order } = useGetOrder(code);

  return (
    <section className="w-full">
      <AdminHeaderSection 
        title={order?.source === "CUSTOMER" ? "Customer Order Detail" : "Order Detail"} 
      />

      <div className="space-y-5">
        <BackButton to="/admin/orders" />

        <PendingPaymentAlert payments={order.payments} />

        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <h1 className="text-2xl font-bold lg:text-3xl">
                Order {order.code}
            </h1>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4 w-full lg:w-1/2 justify-start lg:ml-auto overflow-x-auto overflow-y-hidden">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="refunds">Refunds</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="w-full">
                  <OrderDetailCard order={order} />
                </div>
              </TabsContent>
              
              <TabsContent value="items">
                <div className="w-full">
                  <OrderItemsList orderItems={order.orderItems} orderCode={order.code} />
                </div>
              </TabsContent>

              <TabsContent value="payments">
                <div className="w-full">
                  <OrderPaymentsList orderCode={order.code} payments={order.payments} />
                </div>
              </TabsContent>

              <TabsContent value="refunds">
                <div className="w-full">
                  <OrderRefundsList orderCode={order.code} refunds={order.refunds} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminOrderDetailPage;

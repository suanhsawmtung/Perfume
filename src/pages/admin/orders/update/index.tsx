import { PendingPaymentAlert } from "@/components/admin/order/actions/pending-payment-alert";
import { OrderPaymentsList } from "@/components/admin/order/detail/order-payments-list";
import { OrderRefundsList } from "@/components/admin/order/detail/order-refunds-list";
import { OrderForm } from "@/components/admin/order/form/order-form";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOrder } from "@/services/order/queries/useGetOrder";
import { useParams } from "react-router";

const AdminOrderUpdatePage = () => {
  const { code } = useParams();

  if (!code) {
    throw new Response("Order code is required", { status: 400 });
  }

  const { data: order } = useGetOrder(code);
  
  return (
    <section className="w-full">
      <AdminHeaderSection 
        title={order?.source === "CUSTOMER" ? "Process Customer Order" : "Update Order"} 
      />

      <div className="space-y-5">
        <BackButton to={`/admin/orders`} />

        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <h1 className="text-2xl font-bold lg:text-3xl">
                Order {order.code}
            </h1>

            <Tabs defaultValue="fulfillment" className="w-full">
              <TabsList className="mb-4 w-full lg:w-1/2 justify-start lg:ml-auto overflow-x-auto overflow-y-hidden">
                <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="refunds">Refunds</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fulfillment">
                <div className="w-full space-y-6">
                  {order && <PendingPaymentAlert payments={order.payments} />}
                  <OrderForm order={order} />
                </div>
              </TabsContent>
              
              <TabsContent value="payments">
                <div className="w-full">
                  <OrderPaymentsList orderCode={order.code} payments={order.payments} mode="edit" />
                </div>
              </TabsContent>

              <TabsContent value="refunds">
                <div className="w-full">
                  <OrderRefundsList orderCode={order.code} refunds={order.refunds} mode="edit" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminOrderUpdatePage;

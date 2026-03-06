import OrderDetailCard from "@/components/admin/order/detail/order-detail-card";
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
      <AdminHeaderSection title="Order Detail" />

      <div className="space-y-5">
        <BackButton to="/admin/orders" />

        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <h1 className="text-2xl font-bold lg:text-3xl">
                Order {order.code}
            </h1>

            <div className="space-y-8 hidden lg:block">
              <div className="w-full">
                <OrderDetailCard order={order} />
              </div>

              <div className="w-full">
                <OrderItemsList orderItems={order.orderItems} orderCode={order.code} />
              </div>
            </div>

             <Tabs defaultValue="overview" className="w-full lg:hidden">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminOrderDetailPage;

import { OrderForm } from "@/components/admin/order/form/order-form";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";
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
      <AdminHeaderSection title="Update Order" />

      <div className="space-y-5">
        <BackButton to={`/admin/orders`} />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <OrderForm order={order} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminOrderUpdatePage;

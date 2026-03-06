import { OrderForm } from "@/components/admin/order/form/order-form";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";

const AdminOrderCreatePage = () => {
  return (
    <section className="w-full">
      <AdminHeaderSection title="Create Order" />

      <div className="space-y-5">
        <BackButton to="/admin/orders" />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <OrderForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminOrderCreatePage;

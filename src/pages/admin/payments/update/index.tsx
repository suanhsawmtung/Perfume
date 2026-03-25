import { PaymentForm } from "@/components/admin/payment/form/payment-form";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPayment } from "@/services/payment/queries/useGetPayment";
import { useParams } from "react-router";

const AdminPaymentUpdatePage = () => {
  const { id } = useParams();

  if (!id) {
    throw new Response("Payment ID is required", { status: 400 });
  }

  const paymentId = Number(id);

  if (isNaN(paymentId)) {
    throw new Response("Payment ID must be a number", { status: 400 });
  }

  const { data: payment } = useGetPayment(paymentId);

  return (
    <section className="w-full">
      <AdminHeaderSection title="Edit Payment" />

      <div className="space-y-5">
        <BackButton to="/admin/payments" />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-6">
            <PaymentForm 
              payment={payment} 
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminPaymentUpdatePage;

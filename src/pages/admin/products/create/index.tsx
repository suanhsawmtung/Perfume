import { ProductForm } from "@/components/admin/product/form/product-form";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";

const AdminProductCreatePage = () => {
  return (
    <section className="w-full">
      <AdminHeaderSection title="Create Product" />

      <div className="space-y-5">
        <BackButton to="/admin/products" />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminProductCreatePage;

import { ProductVariantForm } from "@/components/admin/product/variants/form/variant-form";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router";

const AdminProductVariantCreatePage = () => {
  const { slug } = useParams();

  if (!slug) {
    throw new Response("Product slug is required", { status: 400 });
  }

  return (
    <section className="w-full">
      <AdminHeaderSection title="Create Product Variant" />

      <div className="space-y-5">
        <BackButton to={`/admin/products/${slug}/variants`} />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <ProductVariantForm productSlug={slug} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminProductVariantCreatePage;

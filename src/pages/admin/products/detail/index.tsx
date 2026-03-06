import ProductDetailCard from "@/components/admin/product/detail/product-detail-card";
import ProductVariantsPanel from "@/components/admin/product/detail/product-variants-panel";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProduct } from "@/services/product/queries/useGetProduct";
import { useParams } from "react-router";

const AdminProductDetailPage = () => {
  const { slug } = useParams();

  if (!slug) {
    throw new Response("Product slug is required", { status: 400 });
  }

  const { data: product } = useGetProduct(slug);

  return (
    <section className="w-full">
      <AdminHeaderSection title="Product Detail" />

      <div className="space-y-5">
        <BackButton to="/admin/products" />

        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-2">
            <h1 className="text-2xl font-bold lg:text-3xl">{product.name}</h1>

            {/* <div className="bg-secondary-foreground/20 h-px w-full" /> */}

            <div className="hidden gap-8 lg:flex">
              <div className="w-1/2">
                <ProductDetailCard product={product} />
              </div>

              <div className="w-1/2">
                <ProductVariantsPanel product={product} />
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full lg:hidden">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="w-full">
                  <ProductDetailCard product={product} />
                </div>
              </TabsContent>
              <TabsContent value="variants">
                <div className="w-full">
                  <ProductVariantsPanel product={product} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminProductDetailPage;

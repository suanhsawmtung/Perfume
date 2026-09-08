import { ProductDetailActions } from "@/components/product/detail/product-detail-actions";
import { ProductDetailBenefits } from "@/components/product/detail/product-detail-benefits";
import { ProductDetailImageCarousel } from "@/components/product/detail/product-detail-image-carousel";
import { ProductDetailInfo } from "@/components/product/detail/product-detail-info";
import { ProductDetailNav } from "@/components/product/detail/product-detail-nav";
import { ProductDetailTabs } from "@/components/product/detail/product-detail-tabs";
import { AuthRequiredDialog } from "@/components/shared/auth-required-dialog";
import ContentWrapper from "@/components/wrapper/content-wrapper";
import { getProductDetailDocumentTitle } from "@/lib/utils";
import { AuthRequiredProvider } from "@/providers/auth-required-provider";
import { useGetProduct } from "@/services/product/queries/useGetProduct";
import { useEffect } from "react";
import { useLoaderData } from "react-router";

export default function ProductDetailPage() {
  const { params, slug } = useLoaderData();

  const { data: product } = useGetProduct(slug, params);

  useEffect(() => {
    document.title = product.name
      ? `${getProductDetailDocumentTitle(product.name, product.selectedVariant.size)}`
      : "Perfume | Azue Perfume";
  }, [product.name, product.selectedVariant.size]);

  return (
    <div className="min-h-screen">
      <ContentWrapper className="space-y-8 py-8">
        <ProductDetailNav productName={product.name} />

        <AuthRequiredProvider>
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            <ProductDetailImageCarousel
              images={product.selectedVariant.images}
              productName={product.name}
            />

            <div className="flex w-full flex-col space-y-8 lg:w-1/2">
              <ProductDetailInfo product={product} />

              <ProductDetailActions product={product} />

              <ProductDetailBenefits />
            </div>
          </div>

          <ProductDetailTabs product={product} />

          <AuthRequiredDialog />
        </AuthRequiredProvider>

        {/* {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-border/50 pt-16">
            <h2 className="font-serif text-2xl font-medium">You May Also Like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )} */}
      </ContentWrapper>
    </div>
  );
}

import { ProductDetailActions } from "@/components/product/detail/product-detail-actions"
import { ProductDetailBenefits } from "@/components/product/detail/product-detail-benefits"
import { ProductDetailImageCarousel } from "@/components/product/detail/product-detail-image-carousel"
import { ProductDetailInfo } from "@/components/product/detail/product-detail-info"
import { ProductDetailNav } from "@/components/product/detail/product-detail-nav"
import { ProductDetailTabs } from "@/components/product/detail/product-detail-tabs"
import { AuthRequiredDialog } from "@/components/shared/auth-required-dialog"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { AuthRequiredProvider } from "@/providers/auth-required-provider"
import { useGetProduct } from "@/services/product/queries/useGetProduct"
import { useLoaderData } from "react-router"

export default function ProductDetailPage() {
  const { params, slug } = useLoaderData();

  const { data: product } = useGetProduct(slug, params);

  return (
    <div className="min-h-screen">
      <ContentWrapper className="py-8 space-y-8">
        <ProductDetailNav productName={product.name} />

        <AuthRequiredProvider>
          <div className="flex flex-col gap-12 lg:flex-row justify-between">
            <ProductDetailImageCarousel
              images={product.selectedVariant.images}
              productName={product.name}
            />

            <div className="flex flex-col space-y-8 w-full lg:w-1/2">
              <ProductDetailInfo product={product} />

              <ProductDetailActions product={product} />

              <ProductDetailBenefits />
            </div>
          </div>

          <ProductDetailTabs
            product={product}
          />

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
  )
}



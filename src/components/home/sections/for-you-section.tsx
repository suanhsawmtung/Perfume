import { ProductCard } from "@/components/product/product-card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import type { HomeProductType } from "@/types/home.type"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { HomeSectionHeader } from "../home-section-header"

export function ForYouSection({
  products
}: {
  products: HomeProductType[]
}) {
  if (!products) {
    return null
  }

  return (
    <section className="py-20">
      <ContentWrapper>
        <HomeSectionHeader
          title="For You"
          subtitle="Curated Selection"
          linkHref="/products"
          linkLabel="View All"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          to="/products"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium hover:underline md:hidden"
        >
          View All Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </ContentWrapper>
    </section>
  )
}

import { ProductCard } from "@/components/product/product-card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { products } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

export function ForYouSection() {
  const forYouProducts = products.slice(0, 4)

  return (
    <section className="py-20">
      <ContentWrapper>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Curated Selection
            </span>
            <h2 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
              For You
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm font-medium hover:underline md:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {forYouProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
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

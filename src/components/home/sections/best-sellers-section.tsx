import { ProductCard } from "@/components/product/product-card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { products } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

export function BestSellersSection() {
  const bestSellers = products.filter((p) => p.isBestSeller)

  return (
    <section className="bg-secondary/30 py-20">
      <ContentWrapper>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Most Popular
            </span>
            <h2 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/products?sort=bestseller"
            className="hidden items-center gap-2 text-sm font-medium hover:underline md:flex"
          >
            Shop Best Sellers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <Link
          to="/products?sort=bestseller"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium hover:underline md:hidden"
        >
          Shop All Best Sellers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </ContentWrapper>
    </section>
  )
}

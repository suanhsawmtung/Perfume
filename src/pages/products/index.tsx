import { EmptyProductState } from "@/components/product/empty-product-state"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilterBar } from "@/components/product/product-filter-bar"
import { Pagination } from "@/components/shared/pagination"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { useListProducts } from "@/services/product/queries/useGetProducts"
import { useLoaderData, useSearchParams } from "react-router"
import type { loader } from "./loader"

export default function ProductsPage() {
  const { params } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams()
  
  const { data } = useListProducts(params);

  const resultText = data.items.length === 0 
    ? "Showing no products" 
    : `Showing ${data.items.length} of products`;

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/40 bg-secondary/20">
        <ContentWrapper className="py-16 text-center">
          <h1 className="font-serif text-4xl font-medium md:text-5xl">
            Our Collection
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Explore our curated selection of luxury fragrances. Each scent tells
            a unique story, crafted with the finest ingredients from around the
            world.
          </p>
        </ContentWrapper>
      </div>

      <ContentWrapper className="py-8">
        <ProductFilterBar resultText={resultText} />

        {data.items.length === 0 && (
          <EmptyProductState />
        )}

        <div
          className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {data.totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={(page) => {
                const newSearchParams = new URLSearchParams(searchParams)
                newSearchParams.set("page", page.toString())
                setSearchParams(newSearchParams)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

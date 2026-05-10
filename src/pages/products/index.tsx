import { NProductCard as ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/shared/pagination"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { cn } from "@/lib/utils"
import { useListProducts } from "@/services/product/queries/useGetProducts"
import { ChevronDown, Grid3X3, LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useLoaderData, useSearchParams } from "react-router"

const genderOptions = [
  { value: "MALE", label: "For Men" },
  { value: "FEMALE", label: "For Women" },
  { value: "UNISEX", label: "Unisex" },
]

const concentrationOptions = [
  { value: "EDC", label: "Eau de Cologne (EDC)" },
  { value: "EDT", label: "Eau de Toilette (EDT)" },
  { value: "EDP", label: "Eau de Parfum (EDP)" },
  { value: "PARFUM", label: "Parfum" },
]

export default function ProductsPage() {
  const { params } = useLoaderData() as any
  const [searchParams, setSearchParams] = useSearchParams()
  
  const { data } = useListProducts(params)
  
  const [searchQuery, setSearchQuery] = useState(params.search || "")
  const [gridCols, setGridCols] = useState<3 | 4>(4)
  const [filterOpen, setFilterOpen] = useState(false)
  const [genderOpen, setGenderOpen] = useState(true)
  const [concentrationOpen, setConcentrationOpen] = useState(true)

  // Sync local search query with params
  useEffect(() => {
    setSearchQuery(params.search || "")
  }, [params.search])

  const handleParamChange = (key: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    newSearchParams.set("page", "1") // Reset to page 1 on filter change
    setSearchParams(newSearchParams)
  }

  const toggleFilter = (key: string, value: string) => {
    const current = searchParams.get(key)
    if (current === value) {
      handleParamChange(key, null)
    } else {
      handleParamChange(key, value)
    }
  }

  const clearFilters = () => {
    setSearchParams({})
    setSearchQuery("")
  }

  const activeFilterCount = Array.from(searchParams.keys()).filter(k => k !== "page").length

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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <form 
              className="relative flex-1 md:w-64"
              onSubmit={(e) => {
                e.preventDefault()
                handleParamChange("search", searchQuery)
              }}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </form>
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-4">
                    <Collapsible open={genderOpen} onOpenChange={setGenderOpen}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                        Gender
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            genderOpen && "rotate-180"
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 pt-2">
                        <div className="space-y-3">
                          {genderOptions.map((opt) => (
                            <div key={opt.value} className="flex items-center gap-3">
                              <Checkbox
                                id={`gender-${opt.value}`}
                                checked={searchParams.get("gender") === opt.value}
                                onCheckedChange={() => toggleFilter("gender", opt.value)}
                              />
                              <Label
                                htmlFor={`gender-${opt.value}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {opt.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="border-t border-border/50" />

                    <Collapsible open={concentrationOpen} onOpenChange={setConcentrationOpen}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                        Concentration
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            concentrationOpen && "rotate-180"
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 pt-2">
                        <div className="space-y-3">
                          {concentrationOptions.map((opt) => (
                            <div key={opt.value} className="flex items-center gap-3">
                              <Checkbox
                                id={`conc-${opt.value}`}
                                checked={searchParams.get("concentration") === opt.value}
                                onCheckedChange={() => toggleFilter("concentration", opt.value)}
                              />
                              <Label
                                htmlFor={`conc-${opt.value}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {opt.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="border-t border-border/50" />

                    <div className="flex items-center gap-3 px-3 py-2">
                      <Checkbox
                        id="isLimited"
                        checked={searchParams.get("isLimited") === "true"}
                        onCheckedChange={(checked) => 
                          handleParamChange("isLimited", checked ? "true" : null)
                        }
                      />
                      <Label
                        htmlFor="isLimited"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Limited Edition Only
                      </Label>
                    </div>
                  </div>
                </div>
                <SheetFooter className="border-t border-border/50 pt-4">
                  <div className="flex w-full gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => setFilterOpen(false)}
                    >
                      Show Results
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1 md:flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGridCols(3)}
                className={cn(gridCols === 3 && "bg-secondary")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">3 columns</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGridCols(4)}
                className={cn(gridCols === 4 && "bg-secondary")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">4 columns</span>
              </Button>
            </div>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {searchParams.get("gender") && (
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleParamChange("gender", null)}
              >
                {genderOptions.find(o => o.value === searchParams.get("gender"))?.label}
                <X className="h-3 w-3" />
              </Button>
            )}
            {searchParams.get("concentration") && (
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleParamChange("concentration", null)}
              >
                {searchParams.get("concentration")}
                <X className="h-3 w-3" />
              </Button>
            )}
            {searchParams.get("isLimited") === "true" && (
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleParamChange("isLimited", null)}
              >
                Limited Edition
                <X className="h-3 w-3" />
              </Button>
            )}
            {searchParams.get("search") && (
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleParamChange("search", null)}
              >
                Search: {searchParams.get("search")}
                <X className="h-3 w-3" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        <p className="mt-4 text-sm text-muted-foreground">
          Showing {data.items.length} of products
        </p>

        <div
          className={cn(
            "mt-8 grid gap-6",
            gridCols === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-2 xl:grid-cols-4"
          )}
        >
          {data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {data.items.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              No products found matching your criteria.
            </p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear filters
            </Button>
          </div>
        )}

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

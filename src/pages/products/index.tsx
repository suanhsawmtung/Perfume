import { ProductCard } from "@/components/product/product-card"
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
import { products } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ChevronDown, Grid3X3, LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react"
import { useMemo, useState } from "react"

const categories = [
  { value: "all", label: "All Products" },
  { value: "men", label: "For Men" },
  { value: "women", label: "For Women" },
  { value: "unisex", label: "Unisex" },
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

const ITEMS_PER_PAGE = 8

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState<string>("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [gridCols, setGridCols] = useState<3 | 4>(4)
  const [filterOpen, setFilterOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [sortOpen, setSortOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (selectedSort) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return a.isNew ? -1 : 1
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, selectedCategories, selectedSort])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const toggleCategory = (value: string) => {
    if (value === "all") {
      setSelectedCategories([])
    } else {
      setSelectedCategories((prev) =>
        prev.includes(value)
          ? prev.filter((c) => c !== value)
          : [...prev.filter((c) => c !== "all"), value]
      )
    }
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSort("featured")
    setCurrentPage(1)
  }

  const activeFilterCount =
    (selectedCategories.length > 0 ? 1 : 0) + (selectedSort !== "featured" ? 1 : 0)

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
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9"
              />
            </div>
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
                    <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                        Product Type
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            categoryOpen && "rotate-180"
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 pt-2">
                        <div className="space-y-3">
                          {categories.map((cat) => (
                            <div key={cat.value} className="flex items-center gap-3">
                              <Checkbox
                                id={`cat-${cat.value}`}
                                checked={
                                  cat.value === "all"
                                    ? selectedCategories.length === 0
                                    : selectedCategories.includes(cat.value)
                                }
                                onCheckedChange={() => toggleCategory(cat.value)}
                              />
                              <Label
                                htmlFor={`cat-${cat.value}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {cat.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="border-t border-border/50" />

                    <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                        Sort By
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            sortOpen && "rotate-180"
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 pt-2">
                        <div className="space-y-3">
                          {sortOptions.map((option) => (
                            <div key={option.value} className="flex items-center gap-3">
                              <Checkbox
                                id={`sort-${option.value}`}
                                checked={selectedSort === option.value}
                                onCheckedChange={() => handleSortChange(option.value)}
                              />
                              <Label
                                htmlFor={`sort-${option.value}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
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
                      Apply
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

        {(selectedCategories.length > 0 || selectedSort !== "featured") && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {selectedCategories.map((cat) => {
              const category = categories.find((c) => c.value === cat)
              return (
                <Button
                  key={cat}
                  variant="secondary"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => toggleCategory(cat)}
                >
                  {category?.label}
                  <X className="h-3 w-3" />
                </Button>
              )
            })}
            {selectedSort !== "featured" && (
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => setSelectedSort("featured")}
              >
                {sortOptions.find((s) => s.value === selectedSort)?.label}
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
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </p>

        <div
          className={cn(
            "mt-8 grid gap-6",
            gridCols === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              No products found matching your criteria.
            </p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear filters
            </Button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

import { BlogCard } from "@/components/blog/blog-card"
import { Pagination } from "@/components/shared/pagination"
import { Button } from "@/components/ui/button"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { blogs } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"

const categories = ["All", "Guide", "Trends", "Tips", "History"]

const ITEMS_PER_PAGE = 4

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBlogs = useMemo(() => {
    return activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory)
  }, [activeCategory])

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE)
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const [featuredBlog, ...otherBlogs] = paginatedBlogs

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/40 bg-secondary/20">
        <ContentWrapper className="py-16 text-center">
          <h1 className="font-serif text-4xl font-medium md:text-5xl">
            The Journal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Discover the world of fragrance through our curated stories, guides,
            and insights from perfume experts.
          </p>
        </ContentWrapper>
      </div>

      <ContentWrapper className="py-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "rounded-full",
                activeCategory === category && "bg-secondary"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Showing {paginatedBlogs.length} of {filteredBlogs.length} articles
        </p>

        {filteredBlogs.length > 0 ? (
          <>
            {featuredBlog && currentPage === 1 && (
              <div className="mt-8">
                <BlogCard {...featuredBlog} featured />
              </div>
            )}

            {(currentPage === 1 ? otherBlogs : paginatedBlogs).length > 0 && (
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {(currentPage === 1 ? otherBlogs : paginatedBlogs).map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              No articles found in this category.
            </p>
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

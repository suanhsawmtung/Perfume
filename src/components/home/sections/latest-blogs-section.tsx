import { BlogCard } from "@/components/blog/blog-card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { blogs } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

export function LatestBlogsSection() {
  const latestBlogs = blogs.slice(0, 3)
  const [featuredBlog, ...otherBlogs] = latestBlogs

  return (
    <section className="py-20">
      <ContentWrapper>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              From the Journal
            </span>
            <h2 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
              Latest Stories
            </h2>
          </div>
          <Link
            to="/blogs"
            className="hidden items-center gap-2 text-sm font-medium hover:underline md:flex"
          >
            Read All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <BlogCard {...featuredBlog} featured />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {otherBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>

        <Link
          to="/blogs"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium hover:underline md:hidden"
        >
          Read All Stories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </ContentWrapper>
    </section>
  )
}

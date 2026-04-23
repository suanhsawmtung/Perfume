import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { blogs, getBlogById } from "@/lib/data"
import { ArrowLeft, Facebook, Link2, Twitter } from "lucide-react"
import { Link, useParams } from "react-router"

export default function BlogDetailPage() {
  const { blogId } = useParams();

  if (!blogId) {
    throw new Response("Not Found", { status: 404 });
  }

  const blog = getBlogById(blogId)

  if (!blog) {
    throw new Response("Not Found", { status: 404 });
  }

  const relatedBlogs = blogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 2)

  return (
    <div className="min-h-screen">
      <article>
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <ContentWrapper>
          <div className="relative -mt-32 mx-auto max-w-3xl">
            <Link
              to="/blogs"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>

            <div className="rounded-lg bg-background p-8 shadow-lg md:p-12">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {blog.category}
              </span>
              <h1 className="mt-4 font-serif text-3xl font-medium leading-tight text-balance md:text-4xl lg:text-5xl">
                {blog.title}
              </h1>

              <div className="mt-6 flex items-center justify-between border-b border-border/50 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary" />
                  <div>
                    <p className="text-sm font-medium">{blog.author}</p>
                    <p className="text-xs text-muted-foreground">{blog.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Link2 className="h-4 w-4" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
                {blog.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="mt-8 mb-4 font-serif text-2xl font-medium"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="mt-6 mb-3 text-lg font-medium"
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n")
                    return (
                      <ul key={index} className="my-4 list-disc pl-6 space-y-2">
                        {items.map((item, i) => (
                          <li
                            key={i}
                            className="text-muted-foreground leading-relaxed"
                          >
                            {item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p
                      key={index}
                      className="my-4 text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        </ContentWrapper>
      </article>

      {relatedBlogs.length > 0 && (
        <ContentWrapper className="py-16">
          <h2 className="font-serif text-2xl font-medium">Continue Reading</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {relatedBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </ContentWrapper>
      )}
    </div>
  )
}


import SecureContent from "@/components/blog/secure-content";
import { Button } from "@/components/ui/button";
import ContentWrapper from "@/components/wrapper/content-wrapper";
import { formatDate, formatImagePath, formatName } from "@/lib/utils";
import { useGetPost } from "@/services/post/queries/useGetPost";
import { ArrowLeft, ImageIcon, Link2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { toast } from "sonner";

export default function BlogDetailPage() {
  const { slug } = useLoaderData();

  const { data: blog } = useGetPost(slug);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Blog link copied!");
  };

  useEffect(() => {
    document.title = blog.title
      ? `${blog.title} | Azue Perfume`
      : "Article | Azue Perfume";
  }, [blog.title]);

  return (
    <div className="min-h-screen">
      <article className="mb-12">
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {blog.image ? (
            <img
              src={formatImagePath(blog.image, "post")}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-secondary/20 flex h-full w-full items-center justify-center">
              <ImageIcon className="text-muted-foreground/30 h-8 w-8" />
            </div>
          )}
          <div className="from-background via-background/20 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>

        <ContentWrapper>
          <div className="relative mx-auto -mt-32 max-w-3xl">
            <Link
              to="/blogs"
              className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>

            <div className="bg-background rounded-lg p-8 shadow-lg md:p-12">
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {blog.category.name}
              </span>
              <h1 className="mt-4 font-serif text-3xl leading-tight font-medium text-balance md:text-4xl lg:text-5xl">
                {blog.title}
              </h1>

              <div className="border-border/50 mt-6 flex items-center justify-between border-b pb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary h-10 w-10 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">
                      {formatName({
                        firstName: blog.author.firstName,
                        lastName: blog.author.lastName,
                        username: blog.author.username,
                      })}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(blog.publishedAt as string)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={copyLink}>
                    <Link2 className="h-4 w-4" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
                <SecureContent content={blog.content} />
              </div>
            </div>
          </div>
        </ContentWrapper>
      </article>
      {/* 
      {relatedBlogs.length > 0 && (
        <ContentWrapper className="py-16">
          <h2 className="font-serif text-2xl font-medium">Continue Reading</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {relatedBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </ContentWrapper>
      )} */}
    </div>
  );
}

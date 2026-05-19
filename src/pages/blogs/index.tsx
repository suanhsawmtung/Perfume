import { NBlogCard } from "@/components/blog/blog-card";
import { BlogFilterBar } from "@/components/blog/blog-filter-bar";
import { EmptyBlogState } from "@/components/blog/empty-blog-state";
import { Pagination } from "@/components/shared/pagination";
import ContentWrapper from "@/components/wrapper/content-wrapper";
import { cn } from "@/lib/utils";
import { useListPosts } from "@/services/post/queries/useGetPosts";
import { useLoaderData, useSearchParams } from "react-router";
import type { loader } from "./loader";

export default function BlogsPage() {
  const { params } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { data } = useListPosts(params);

  const isHero = data.items.length !== 2;
  const gridPosts = isHero ? data.items.slice(1) : data.items

  const gridColsClass =
    !isHero ? "md:grid-cols-2"
      : gridPosts.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-3"

  const resultText = data.total === 0 
    ? "Showing 0 articles" 
    : `Showing ${data.items.length} of ${data.total} articles`;

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
        <div className="mb-8">
          <BlogFilterBar resultText={resultText} />
        </div>

        {data.items.length === 0 ? (
          <EmptyBlogState />
        ) : (
          <div className="space-y-12">
            {isHero && (
              <div className="mt-8">
                <NBlogCard post={data.items[0]} isHero />
              </div>
            )}

            {gridPosts.length > 0 && (
              <div className={cn("grid gap-8", gridColsClass)}>
                {gridPosts.map((post) =>
                  <NBlogCard key={post.id} post={post} /> 
                )}
              </div>
            )}
          </div>
        )}

        {data.totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={(page) => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set("page", page.toString());
                setSearchParams(newSearchParams);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

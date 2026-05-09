import { cn } from "@/lib/utils"
import type { HomePostType } from "@/types/home.type"
import { NBlogCard } from "./blog-card"

interface BlogGridProps {
  posts: any[]
  columns?: 2 | 3
}

export function BlogGrid({
  posts,
  columns = 3,
}: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  const isHero = posts.length % 2 !== 0
  const gridPosts = isHero ? posts.slice(1) : posts

  const gridColsClass =
    columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3"

  return (
    <div className="mt-10 space-y-10">
      {isHero && (
        <NBlogCard post={posts[0] as HomePostType} isHero />
      )}

      {gridPosts.length > 0 && (
        <div className={cn("grid gap-8", gridColsClass)}>
          {gridPosts.map((post) =>
            <NBlogCard key={post.id} post={post as HomePostType} /> 
          )}
        </div>
      )}
    </div>
  )
}

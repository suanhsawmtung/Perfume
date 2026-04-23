// import { cn } from "@/lib/utils";
// import type { Post } from "@/types";
// import { Link } from "react-router";

// interface Props {
//   post: Post;
//   type?: "recent-section-card" | "blogs-page-card";
// }

// const BlogCard = ({ post, type = "blogs-page-card" }: Props) => {
//   return (
//     <Link to={`/blogs/${post.id}`} className="group">
//       <div className="flex flex-col gap-y-4">
//         <img
//           src={post.image}
//           className={cn(
//             "w-full",
//             type === "blogs-page-card" ? "rounded-xl" : "rounded-2xl",
//           )}
//           alt={post.title}
//         />
//         <div
//           className={cn(
//             "flex flex-col gap-y-2",
//             type === "blogs-page-card" ? "" : "px-4",
//           )}
//         >
//           <h3
//             className={cn(
//               "line-clamp-1",
//               type === "blogs-page-card"
//                 ? "text-xl font-extrabold"
//                 : "font-semibold",
//             )}
//           >
//             {post.title}
//           </h3>

//           {type === "blogs-page-card" && (
//             <h5 className={"line-clamp-3 text-base font-normal"}>
//               {post.content}
//             </h5>
//           )}

//           <div className="flex items-center gap-1 text-sm">
//             <span>by</span>
//             <span className="font-semibold">{post.author.fullName}</span>
//             <span>on</span>
//             <span className="font-semibold">{post.updatedAt}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default BlogCard;

import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  featured?: boolean
}

export function BlogCard({
  id,
  title,
  excerpt,
  image,
  category,
  date,
  author,
  featured = false,
}: BlogCardProps) {
  if (featured) {
    return (
      <Link to={`/blogs/${id}`} className="group block">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {category}
            </span>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-balance md:text-3xl">
              {title}
            </h3>
            <p className="mt-3 text-muted-foreground line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{author}</span>
              <span>·</span>
              <span>{date}</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 font-medium group-hover:underline">
              Read More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/blogs/${id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {category}
        </span>
        <h3 className="mt-2 font-semibold leading-tight text-balance line-clamp-2">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{author}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  )
}


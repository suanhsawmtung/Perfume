import { SEO } from "@/components/shared/seo";
import { baseUrl } from "@/config/env";
import { DEFAULT_BRAND_IMAGE } from "@/constants/metadata.constant";
import { formatDateTime, formatImagePath, formatName } from "@/lib/utils";
import type { PostType } from "@/types/post.type";

const FALLBACK_DESCRIPTION =
  "Discover the world of fragrance through our curated stories, helpful guides, expert insights, and inspiration for every scent lover.";

type BlogDetailSEOProps = {
  blog: PostType;
};

export function BlogDetailSEO({ blog }: BlogDetailSEOProps) {
  const title = blog.title
    ? `${blog.title} | Azue Perfume House`
    : "Article | Azue Perfume House";
  const description = blog.excerpt || FALLBACK_DESCRIPTION;
  const image = blog.image
    ? formatImagePath(blog.image, "post")
    : DEFAULT_BRAND_IMAGE;
  const canonical = `/blogs/${blog.slug}`;

  return (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      og={{ title, description, image, type: "article" }}
      twitter={{ title, description, image }}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description,
        image,
        ...(blog.publishedAt
          ? { datePublished: formatDateTime(blog.publishedAt) }
          : {}),
        author: {
          "@type": "Person",
          name: formatName({
            firstName: blog.author.firstName,
            lastName: blog.author.lastName,
            username: blog.author.username,
          }),
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}${canonical}`,
        },
      }}
    />
  );
}

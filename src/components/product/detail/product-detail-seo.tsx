import { SEO } from "@/components/shared/seo";
import { baseUrl, currency } from "@/config/env";
import { DEFAULT_BRAND_IMAGE } from "@/constants/metadata.constant";
import { formatImagePath, getProductDetailDocumentTitle } from "@/lib/utils";
import type { ProductDetailType } from "@/types/product.type";

const FALLBACK_DESCRIPTION =
  "Discover the world of fragrance through our curated stories, helpful guides, expert insights, and inspiration for every scent lover.";

type ProductDetailSEOProps = {
  product: ProductDetailType;
};

export function ProductDetailSEO({ product }: ProductDetailSEOProps) {
  const { selectedVariant } = product;
  const image = selectedVariant.images[0]
    ? formatImagePath(selectedVariant.images[0].path, "product")
    : DEFAULT_BRAND_IMAGE;
  const title = product.name
    ? getProductDetailDocumentTitle(product.name, selectedVariant.size)
    : "Perfume | Azue Perfume";
  const description = product.description || FALLBACK_DESCRIPTION;

  return (
    <SEO
      title={title}
      description={description}
      canonical={`/products/${product.slug}`}
      og={{ title, description, image, type: "product" }}
      twitter={{ title, description, image }}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description,
        image,
        brand: { "@type": "Brand", name: product.brand },
        sku: selectedVariant.sku,
        offers: {
          "@type": "Offer",
          url: `${baseUrl}/products/${product.slug}`,
          price: selectedVariant.price,
          priceCurrency: currency,
          availability:
            selectedVariant.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
      }}
    />
  );
}

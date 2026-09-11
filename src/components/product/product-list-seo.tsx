import { SEO } from "@/components/shared/seo";
import { DEFAULT_BRAND_IMAGE } from "@/constants/metadata.constant";
import { getProductListingDocumentTitle } from "@/lib/utils";
import type { Concentration, Gender } from "@/types/product.type";

const DESCRIPTION =
  "Explore our curated selection of luxury fragrances. Each scent tells a unique story, crafted with the finest ingredients from around the world.";

type ProductListSEOProps = {
  brand?: string;
  gender?: Gender;
  concentration?: Concentration;
};

export function ProductListSEO({
  brand,
  gender,
  concentration,
}: ProductListSEOProps) {
  const title = getProductListingDocumentTitle({
    brand,
    gender,
    concentration,
  });
  return (
    <SEO
      title={title}
      description={DESCRIPTION}
      canonical="/products"
      og={{
        title,
        description: DESCRIPTION,
        image: DEFAULT_BRAND_IMAGE,
        type: "website",
      }}
      twitter={{
        title,
        description: DESCRIPTION,
        image: DEFAULT_BRAND_IMAGE,
      }}
    />
  );
}

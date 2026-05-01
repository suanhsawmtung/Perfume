import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getConcentrationVariant, getGenderVariant, pluralize } from "@/lib/utils";
import type {
  AdminProductDetailType,
  Concentration,
  Gender,
} from "@/types/product.type";

type ProductDetailCardProps = {
  product: AdminProductDetailType;
};

const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
  const detailItems = [
    { label: "Brand", value: product.brand.name },
    {
      label: "Rating",
      value: `${product.rating} (${product.ratingCount} ${pluralize(product.ratingCount, "rating")})`,
    },
    {
      label: "Reviews",
      value: `${product._count.reviews} ${pluralize(product._count.reviews, "written review")}`,
    },
    { label: "Variants", value: product._count.variants },
    { label: "Release Year", value: product.releasedYear ?? "-" },
  ];

  return (
    <Card className="w-full p-3 sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 text-sm">
          {detailItems.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-x-4 sm:items-center"
            >
              <div className="flex min-w-26 items-center justify-between">
                <span className="font-semibold">{item.label}</span>
                <span className="font-semibold">-</span>
              </div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2">
          <Badge
            variant={getConcentrationVariant(
              product.concentration as Concentration,
            )}
          >
            {product.concentration}
          </Badge>

          <Badge variant={getGenderVariant(product.gender as Gender)}>
            {product.gender}
          </Badge>

          {product.isLimited && (
            <Badge variant="secondary">Limited Edition</Badge>
          )}

          <Badge variant={product.isActive ? "default" : "secondary"}>
            {product.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="prose prose-sm dark:prose-invert lg:prose-base max-w-none">
          <p>{product.description}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProductDetailCard;

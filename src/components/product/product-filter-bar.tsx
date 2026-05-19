import { ProductFilter } from "@/components/product/product-filter";
import { FilterTags } from "@/components/shared/filter-tags";
import { PRODUCT_FILTER_CONFIG } from "@/constants/product.constant";
import { useSearchParams } from "react-router";

interface ProductFilterBarProps {
  resultText: string;
}


export function ProductFilterBar({ resultText }: ProductFilterBarProps) {
  const [searchParams] = useSearchParams();
  const activeFilterCount = Array.from(searchParams.keys()).filter((k) => k !== "page").length;

  return (
    <>
      <div className="w-full flex justify-between items-center gap-2">
        <p className="text-sm text-muted-foreground md:flex hidden">
          {resultText}
        </p>

        <ProductFilter />
      </div>

      {activeFilterCount > 0 && (
        <FilterTags allowedFilters={PRODUCT_FILTER_CONFIG} />
      )}

      <div className="w-full mt-4 md:hidden text-center">
        <p className="text-sm text-muted-foreground">
          {resultText}
        </p>
      </div>
    </>
  );
}

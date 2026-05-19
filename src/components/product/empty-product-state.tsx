import { Button } from "@/components/ui/button";
import { PRODUCT_FILTER_CONFIG } from "@/constants/product.constant";
import { useSearchParams } from "react-router";

export function EmptyProductState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterKeys = Object.keys(PRODUCT_FILTER_CONFIG);
  const hasFilters = filterKeys.some((key) => searchParams.has(key));

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="py-20 text-center">
      <p className="text-muted-foreground">
        {hasFilters
          ? "No products found matching your criteria."
          : "No products found."}
      </p>
      {hasFilters && (
        <Button variant="link" onClick={clearFilters} className="mt-2">
          Clear filters
        </Button>
      )}
    </div>
  );
}

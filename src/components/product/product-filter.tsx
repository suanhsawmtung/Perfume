import { SearchInput } from "@/components/shared/search-input";
import { ProductFilterSheet } from "./product-filter-sheet";

export function ProductFilter() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end w-full md:w-auto">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 md:w-64">
          <SearchInput
            placeholder="Search fragrances..."
            className="w-full"
          />
        </div>
        
        <ProductFilterSheet />
      </div>
    </div>
  );
}

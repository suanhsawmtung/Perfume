import { SearchInput } from "@/components/shared/search-input";
import { BlogFilterSheet } from "./blog-filter-sheet";

export function BlogFilter() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end w-full md:w-auto">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 md:w-64">
          <SearchInput
            placeholder="Search articles..."
            className="w-full"
          />
        </div>
        
        <BlogFilterSheet />
      </div>
    </div>
  );
}

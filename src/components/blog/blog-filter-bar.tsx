import { BlogFilter } from "@/components/blog/blog-filter";
import { FilterTags } from "@/components/shared/filter-tags";
import { POST_FILTER_CONFIG } from "@/constants/post.constant";
import { useSearchParams } from "react-router";

interface BlogFilterBarProps {
  resultText: string;
}

export function BlogFilterBar({ resultText }: BlogFilterBarProps) {
  const [searchParams] = useSearchParams();
  const activeFilterCount = Array.from(searchParams.keys()).filter((k) => k !== "page").length;

  return (
    <>
      <div className="w-full flex justify-between items-center gap-2">
        <p className="text-sm text-muted-foreground md:flex hidden">
          {resultText}
        </p>

        <BlogFilter />
      </div>

      {activeFilterCount > 0 && (
        <FilterTags allowedFilters={POST_FILTER_CONFIG} />
      )}

      <div className="w-full mt-4 md:hidden text-center">
        <p className="text-sm text-muted-foreground">
          {resultText}
        </p>
      </div>
    </>
  );
}

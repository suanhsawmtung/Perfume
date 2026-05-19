import { Button } from "@/components/ui/button";
import { POST_FILTER_CONFIG } from "@/constants/post.constant";
import { useSearchParams } from "react-router";

export function EmptyBlogState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterKeys = Object.keys(POST_FILTER_CONFIG);
  const hasFilters = filterKeys.some((key) => searchParams.has(key));

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="py-20 text-center">
      <p className="text-muted-foreground">
        {hasFilters
          ? "No articles found matching your criteria."
          : "No articles found."}
      </p>
      {hasFilters && (
        <Button variant="link" onClick={clearFilters} className="mt-2">
          Clear filters
        </Button>
      )}
    </div>
  );
}

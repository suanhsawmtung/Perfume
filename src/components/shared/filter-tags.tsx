import { Button } from "@/components/ui/button";
import { cn, toTitleCase } from "@/lib/utils";
import { X } from "lucide-react";
import { useSearchParams } from "react-router";

export interface FilterTagsProps {
  allowedFilters?: Record<
    string,
    { allowedValues: string[]; displayComputed?: (value: string) => string }
  >;
  excludeKeys?: string[];
  className?: string;
}

const formatFilterLabel = (key: string): string => {
  return toTitleCase(key.replace("-", " "));
};

export function FilterTags({
  allowedFilters,
  excludeKeys = ["page"],
  className,
}: FilterTagsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get all filters from URL, excluding specified keys (like "page")
  const allFilters = Array.from(searchParams.entries())
    .filter(([key]) => !excludeKeys.includes(key))
    .map(([key, value]) => ({
      key,
      value,
    }));

  // Filter to only show allowed keys and validate values if provided
  const activeFilters = allowedFilters
    ? allFilters.filter((filter) => {
        const allowedConfig = allowedFilters[filter.key];

        // If key is not in allowedFilters, don't show it
        if (!allowedConfig) return false;

        // If "*", any value is allowed for this key
        if (allowedConfig.allowedValues.includes("*")) return true;

        // Otherwise, validate against allowedValues
        return allowedConfig.allowedValues.includes(filter.value);
      })
    : allFilters;

  const removeFilter = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);

    // Reset page to 1 when removing a filter
    if (newSearchParams.has("page")) {
      newSearchParams.delete("page");
    }

    setSearchParams(newSearchParams, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const getFilterLabel = (key: string, value: string): string => {
    if (allowedFilters) {
      const config = allowedFilters[key];
      if (config?.displayComputed) {
        return config.displayComputed(value);
      }
    }

    return formatFilterLabel(key) + ": " + value;
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 mt-6",
        className,
      )}
    >
      {activeFilters.map((filter) => (
        <Button
          key={filter.key}
          variant="secondary"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => removeFilter(filter.key)}
        >
          {getFilterLabel(filter.key, filter.value)}
          <X className="h-3 w-3" />
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-muted-foreground animate-in fade-in duration-200"
        onClick={clearAllFilters}
      >
        Clear all
      </Button>
    </div>
  );
}

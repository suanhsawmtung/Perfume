import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { CursorPaginationResultT, SelectOptionPageParams, SelectOptionT } from "@/types";
import { type QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDown, Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface InfiniteFilterCollapsibleProps {
  title: string;
  queryKey: QueryKey;
  onFetch: (params: SelectOptionPageParams) => Promise<CursorPaginationResultT<SelectOptionT>>;
  selectedValue: string | null;
  onToggle: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  searchPlaceholder?: string;
  className?: string;
}

export function InfiniteFilterCollapsible({
  title,
  queryKey,
  onFetch,
  selectedValue,
  onToggle,
  open,
  onOpenChange,
  searchPlaceholder = "Search...",
  className,
}: InfiniteFilterCollapsibleProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [...queryKey, { search: debouncedSearch }],
    queryFn: ({ pageParam }) =>
      onFetch({
        search: debouncedSearch,
        cursor: pageParam as number | null,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 30_000,
    enabled: open, // Only fetch when open
  });

  const items = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  const sentinelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { root: listRef.current, threshold: 0.1 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage, items.length]);

  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className={cn("w-full", className)}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors">
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pt-2">
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs focus-visible:ring-1"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div
          ref={listRef}
          className="scrollbar-hide max-h-48 space-y-3 overflow-y-auto pr-1"
        >
          {isLoading && items.length === 0 ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">
              No options found
            </p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`${title.toLowerCase()}-${item.id}`}
                    checked={selectedValue === item.slug}
                    onCheckedChange={() => onToggle(item.slug)}
                  />
                  <Label
                    htmlFor={`${title.toLowerCase()}-${item.id}`}
                    className="cursor-pointer text-sm font-normal hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Label>
                </div>
              ))}

              {hasNextPage && (
                <div
                  ref={sentinelRef}
                  className="flex items-center justify-center py-2"
                >
                  {isFetchingNextPage ? (
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Loading more...
                    </div>
                  ) : (
                    <div className="h-1" />
                  )}
                </div>
              )}

              {!hasNextPage && items.length > 0 && (
                <p className="py-2 text-center text-[10px] text-muted-foreground">
                  all loaded ✓
                </p>
              )}
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

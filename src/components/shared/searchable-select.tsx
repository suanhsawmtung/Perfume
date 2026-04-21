import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import type {
  FetchSelectPageParams,
  FetchSelectPageResult,
  SelectOption
} from "@/types/select-option.type";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchableSelectProps {
  /**
   * Unique key prefix used by TanStack Query to cache results.
   * Example: "users" → query key becomes ["users", { search }]
   */
  queryKey: string[];
  /**
   * Called by TanStack Query to fetch a page of options.
   * Receives the current search string and the cursor for the page to load.
   */
  onFetch: (params: FetchSelectPageParams) => Promise<FetchSelectPageResult>;
  /** Controlled selected value (primitive ID or slug) */
  value?: string | number | null;
  /** Initial full option object used for display before it is loaded in the infinite list */
  initialOption?: SelectOption | null;
  /** Called when the user picks an option (or clears) */
  onChange?: (option: SelectOption | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Debounce delay in ms before search query fires (default: 300) */
  debounceMs?: number;
  /** Max height of the scrollable list in px (default: 260) */
  listHeight?: number;
  /** Render a fully custom option row */
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;
}

// ─── Highlight helper ─────────────────────────────────────────────────────────

function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-[2px] px-[1px] not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SearchableSelect({
  queryKey,
  onFetch,
  value,
  initialOption,
  onChange,
  placeholder = "Search…",
  debounceMs = 300,
  listHeight = 260,
  disabled = false,
  className,
  renderOption,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // debouncedSearch drives the TanStack Query key → triggers refetch
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── TanStack Query – useInfiniteQuery ─────────────────────────────
  //
  //  • queryKey includes [queryKey, { search: debouncedSearch }] so every
  //    distinct search string gets its own cached result set.
  //  • initialPageParam: null  →  first call uses cursor: null
  //  • getNextPageParam        →  extracts nextCursor from the last page;
  //                               returns undefined to signal "no more pages"
  //  • enabled: open           →  only fetches while the dropdown is open
  //  • staleTime: 30_000       →  reuses cached pages for 30 s per search term

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [...queryKey, { search: debouncedSearch }],
    queryFn: ({ pageParam }) =>
      onFetch({ search: debouncedSearch, cursor: pageParam as number | null }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: open,
    staleTime: 30_000,
  });

  // Flatten all fetched pages into a single list
  const items = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  // ── Intersection Observer – infinite scroll sentinel ───────────────
  //
  //  A zero-height sentinel div is placed after the last item.
  //  When it scrolls into view inside the list container, fetchNextPage() fires.
  //  We reconnect the observer every time:
  //    • items.length changes  (new page arrived → sentinel moved down)
  //    • hasNextPage changes   (last page loaded → remove observer)

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const scrollContainer = listRef.current;
    if (!sentinel || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { root: scrollContainer, threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, items.length]);

  // ── Value handling ────────────────────────────────────────────────
  //
  //  Search for the full object to get the display name by:
  //    1. Looking in the already-fetched items
  //    2. Falling back to the provided initialOption if IDs match
  const selectedOption = useMemo(() => {
    if (value === null || value === undefined || value === "") return null;

    const found = items.find((i) => String(i.id) === String(value) || String(i.slug) === String(value));
    if (found) return found;

    if (initialOption && (String(initialOption.id) === String(value) || String(initialOption.slug) === String(value))) {
      return initialOption;
    }

    return null;
  }, [items, value, initialOption]);

  // Sync display value when state changes or dropdown closes
  useEffect(() => {
    if (!open) {
      setInputValue(selectedOption?.name ?? "");
    }
  }, [selectedOption, open]);

  // ── Open / Close ──────────────────────────────────────────────────

  const openDropdown = useCallback(() => {
    if (open || disabled) return;
    setOpen(true);
  }, [open, disabled]);

  const closeDropdown = useCallback(() => {
    if (!open) return;
    setOpen(false);
    setInputValue(selectedOption?.name ?? "");
    setDebouncedSearch("");
  }, [open, selectedOption]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeDropdown]);

  // Sync display value when external `value` prop changes
  useEffect(() => {
    if (!open) setInputValue(selectedOption?.name ?? "");
  }, [selectedOption, open]);

  // ── Input handlers ────────────────────────────────────────────────

  const handleFocus = () => {
    // Clear display so the user can type immediately over the selected label
    if (value) setInputValue("");
    openDropdown();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInputValue(v);

    // Debounce: only update debouncedSearch (and thus the query key) after delay
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(v), debounceMs);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeDropdown();
      (e.target as HTMLInputElement).blur();
    }
  };

  // ── Select / Clear ────────────────────────────────────────────────

  const handleSelect = (option: SelectOption) => {
    onChange?.(option);
    setInputValue(option.name);
    setDebouncedSearch("");
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    setInputValue("");
    setDebouncedSearch("");
    if (!open) openDropdown();
  };

  // ── Derived booleans ──────────────────────────────────────────────

  const isInitialLoading = isFetching && !isFetchingNextPage;
  const showClear = !!value && !open;
  const isEmpty =
    !isInitialLoading && items.length === 0 && status !== "pending";

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      {/* ── Trigger input ─────────────────────────────────────────── */}
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="pr-8"
          autoComplete="off"
          spellCheck={false}
          aria-haspopup="listbox"
          aria-expanded={open}
        />

        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
          {showClear ? (
            <button
              type="button"
              onMouseDown={handleClear}
              className="pointer-events-auto rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear selection"
            >
              <X size={13} />
            </button>
          ) : (
            <ChevronsUpDown
              size={13}
              className={cn(
                "text-muted-foreground transition-transform duration-150",
                open && "rotate-180 text-primary"
              )}
            />
          )}
        </span>
      </div>

      {/* ── Dropdown ──────────────────────────────────────────────── */}
      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+6px)] z-50",
            "rounded-lg border bg-popover shadow-xl",
            "animate-in fade-in-0 zoom-in-95 duration-150 origin-top"
          )}
        >
          {/* Scrollable list */}
          <div
            ref={listRef}
            className="overflow-y-auto p-1 scrollbar-thin"
            style={{ maxHeight: listHeight }}
          >
            {/* Initial loading */}
            {isInitialLoading && (
              <div className="flex items-center justify-center gap-2 py-8 text-xs text-muted-foreground">
                <Loader2 size={14} className="animate-spin text-primary" />
                <span>Loading…</span>
              </div>
            )}

            {/* Empty state */}
            {isEmpty && (
              <div className="py-8 text-center text-xs text-muted-foreground">
                {debouncedSearch
                  ? `No results for "${debouncedSearch}"`
                  : "No options available"}
              </div>
            )}

            {/* Option rows */}
            {items.map((item) => {
              const isSelected = String(value) === String(item.id) || String(value) === String(item.slug);
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent blur before select fires
                    handleSelect(item);
                  }}
                  className={cn(
                    "flex cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 py-2",
                    "text-sm transition-colors duration-100",
                    "hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-primary/10 text-primary"
                  )}
                >
                  {renderOption ? (
                    renderOption(item, isSelected)
                  ) : (
                    <>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">
                          <Highlighted text={item.name} query={debouncedSearch} />
                        </div>
                      </div>
                      <Check
                        size={13}
                        className={cn(
                          "flex-shrink-0 transition-opacity",
                          isSelected ? "opacity-100 text-primary" : "opacity-0"
                        )}
                      />
                    </>
                  )}
                </div>
              );
            })}

            {/*
             * Infinite scroll sentinel
             *
             * Placed after the last item whenever hasNextPage is true.
             * The IntersectionObserver (set up above) watches this element
             * inside the scroll container. When it becomes visible,
             * fetchNextPage() is called automatically.
             */}
            {hasNextPage && (
              <div
                ref={sentinelRef}
                className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground"
              >
                {isFetchingNextPage && (
                  <>
                    <Loader2 size={13} className="animate-spin text-primary" />
                    <span>Loading more…</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer: item count */}
          {!isInitialLoading && items.length > 0 && (
            <div className="flex items-center justify-between border-t px-3 py-1.5">
              <span className="font-mono text-[11px] text-muted-foreground">
                <span className="text-primary">{items.length}</span> results loaded
              </span>
              {!hasNextPage && (
                <span className="font-mono text-[11px] text-muted-foreground">
                  all loaded ✓
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Usage Example ────────────────────────────────────────────────────────────
//
// 1. Wrap your app with QueryClientProvider (once at the root):
//
//    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//    const queryClient = new QueryClient();
//
//    <QueryClientProvider client={queryClient}>
//      <App />
//    </QueryClientProvider>
//
//
// 2. Define your fetch function:
//
//    async function fetchUsers({ search, cursor }: FetchPageParams): Promise<FetchPageResult> {
//      const params = new URLSearchParams({ search, limit: "15" });
//      if (cursor) params.set("cursor", cursor);
//      const res = await fetch(`/api/users?${params}`);
//      return res.json();
//      // Expected shape: { items: SelectOption[], nextCursor: string | null, total: number }
//    }
//
//
// 3. Use the component:
//
//    function MyForm() {
//      const [selected, setSelected] = useState<SelectOption | null>(null);
//
//      return (
//        <SearchableSelect
//          queryKey="users"        // TanStack Query cache namespace
//          onFetch={fetchUsers}
//          value={selected}
//          onChange={setSelected}
//          placeholder="Search users…"
//          debounceMs={300}
//          listHeight={280}
//        />
//      );
//    }
//
//
// 4. Custom row rendering (e.g. with avatars):
//
//    <SearchableSelect
//      queryKey="users"
//      onFetch={fetchUsers}
//      value={selected}
//      onChange={setSelected}
//      renderOption={(option, isSelected) => (
//        <>
//          <Avatar src={option.avatarUrl} />
//          <span className="flex-1 truncate">{option.label}</span>
//          {isSelected && <Check size={13} />}
//        </>
//      )}
//    />
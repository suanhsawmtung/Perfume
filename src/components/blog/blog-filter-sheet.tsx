import { InfiniteFilterCollapsible } from "@/components/shared/infinite-filter-collapsible";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchCategorySelectOptions } from "@/services/category/api";
import { categoryQueryKeys } from "@/services/category/key";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import * as z from "zod";

const filterSchema = z.object({
  search: z.string().optional(),
  category: z.string().nullable().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

export function BlogFilterSheet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || null,
    },
  });

  // Sync form when search parameters change from outside
  useEffect(() => {
    if (!open) {
      form.reset({
        search: searchParams.get("search") || "",
        category: searchParams.get("category") || null,
      });
    }
  }, [searchParams, form, open]);

  const onSubmit = (values: FilterValues) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    // Set or delete params based on form values
    if (values.search) newSearchParams.set("search", values.search);
    else newSearchParams.delete("search");
    
    if (values.category) newSearchParams.set("category", values.category);
    else newSearchParams.delete("category");

    newSearchParams.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(newSearchParams);
    setOpen(false); // Close sheet on submit
  };

  const clearFilters = () => {
    form.reset({
      search: "",
      category: null,
    });
  };

  const activeFilterCount = Array.from(searchParams.keys()).filter(
    (k) => k !== "page"
  ).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="sm:mr-2 h-4 w-4" />
          <span className="sm:flex hidden">Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm px-0">
        <SheetHeader className="px-6 pb-2">
          <SheetTitle>Article Filters</SheetTitle>
        </SheetHeader>
        
        <div className="border-t border-border/50" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                
                {/* Search Input at the top */}
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search articles..."
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="border-t border-border/50" />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <InfiniteFilterCollapsible
                        title="Categories"
                        queryKey={categoryQueryKeys.selectOptions()}
                        onFetch={fetchCategorySelectOptions}
                        selectedValue={field.value || null}
                        onToggle={(val) => field.onChange(field.value === val ? null : val)}
                        open={categoryOpen}
                        onOpenChange={setCategoryOpen}
                        searchPlaceholder="Search categories..."
                      />
                    </FormItem>
                  )}
                />

              </div>
            </div>

            <div className="border-t border-border/50" />

            <SheetFooter className="p-6 pt-4">
              <div className="flex w-full gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button type="submit" className="flex-1">
                  Show Articles
                </Button>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

import { FilterCollapsible } from "@/components/shared/filter-collapsible";
import { InfiniteFilterCollapsible } from "@/components/shared/infinite-filter-collapsible";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchBrandSelectOptions } from "@/services/brand/api";
import { brandQueryKeys } from "@/services/brand/key";
import { PRODUCT_CONCENTRATIONS, PRODUCT_GENDERS } from "@/constants/product.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";


const filterSchema = z.object({
  search: z.string().optional(),
  gender: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  concentration: z.string().nullable().optional(),
  isLimited: z.boolean().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

export function ProductFilterSheet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const [genderOpen, setGenderOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [concentrationOpen, setConcentrationOpen] = useState(true);

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
      gender: searchParams.get("gender") || null,
      brand: searchParams.get("brand") || null,
      concentration: searchParams.get("concentration") || null,
      isLimited: searchParams.get("isLimited") === "true",
    },
  });

  // Sync form when search parameters change from outside
  useEffect(() => {
    if (!open) {
      form.reset({
        search: searchParams.get("search") || "",
        gender: searchParams.get("gender") || null,
        brand: searchParams.get("brand") || null,
        concentration: searchParams.get("concentration") || null,
        isLimited: searchParams.get("isLimited") === "true",
      });
    }
  }, [searchParams, form, open]);

  const onSubmit = (values: FilterValues) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Set or delete params based on form values
    if (values.search) newSearchParams.set("search", values.search);
    else newSearchParams.delete("search");

    if (values.gender) newSearchParams.set("gender", values.gender);
    else newSearchParams.delete("gender");

    if (values.brand) newSearchParams.set("brand", values.brand);
    else newSearchParams.delete("brand");

    if (values.concentration) newSearchParams.set("concentration", values.concentration);
    else newSearchParams.delete("concentration");

    if (values.isLimited) newSearchParams.set("isLimited", "true");
    else newSearchParams.delete("isLimited");

    newSearchParams.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(newSearchParams);
    setOpen(false); // Close sheet on submit
  };

  const clearFilters = () => {
    form.reset({
      search: "",
      gender: null,
      brand: null,
      concentration: null,
      isLimited: false,
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
          <SheetTitle>Product Filters</SheetTitle>
        </SheetHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-6">

                <div className="px-6">
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
                              placeholder="Search fragrances..."
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="px-6">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FilterCollapsible
                          title="Gender"
                          options={PRODUCT_GENDERS}
                          selectedValue={field.value || null}
                          onToggle={(val) => field.onChange(field.value === val ? null : val)}
                          open={genderOpen}
                          onOpenChange={setGenderOpen}
                        />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="px-6">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <InfiniteFilterCollapsible
                          title="Brands"
                          queryKey={brandQueryKeys.selectOptions()}
                          onFetch={fetchBrandSelectOptions}
                          selectedValue={field.value || null}
                          onToggle={(val) => field.onChange(field.value === val ? null : val)}
                          open={brandOpen}
                          onOpenChange={setBrandOpen}
                          searchPlaceholder="Search brands..."
                        />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="px-6">
                  <FormField
                    control={form.control}
                    name="concentration"
                    render={({ field }) => (
                      <FormItem>
                        <FilterCollapsible
                          title="Concentration"
                          options={PRODUCT_CONCENTRATIONS}
                          selectedValue={field.value || null}
                          onToggle={(val) => field.onChange(field.value === val ? null : val)}
                          open={concentrationOpen}
                          onOpenChange={setConcentrationOpen}
                        />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="px-6">
                  <FormField
                    control={form.control}
                    name="isLimited"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 px-3 py-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label
                          className="text-sm font-medium cursor-pointer"
                          onClick={() => field.onChange(!field.value)}
                        >
                          Limited Edition Only
                        </Label>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator />

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
                  Show Results
                </Button>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}


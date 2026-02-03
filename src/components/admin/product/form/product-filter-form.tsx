import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabButton } from "@/components/ui/tab-button";
import { isConcentration, isGender } from "@/lib/utils";
import { useListBrands } from "@/services/brand/queries/useGetListBrands";
import type { Concentration, Gender } from "@/types/product.type";
import {
  ProductFilterFormSchema,
  type ProductFilterFormValues,
} from "@/validations/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

const genderOptions: Array<{ key: Gender; text: string }> = [
  { key: "MALE", text: "Male" },
  { key: "FEMALE", text: "Female" },
  { key: "UNISEX", text: "Unisex" },
];

const concentrationOptions: Array<{ key: Concentration; text: string }> = [
  { key: "EDC", text: "EDC" },
  { key: "EDT", text: "EDT" },
  { key: "EDP", text: "EDP" },
  { key: "PARFUM", text: "Parfum" },
];

const yesNoOptions = [
  { key: true, text: "Yes" },
  { key: false, text: "No" },
];

export function ProductFilterForm({ close }: { close: () => void }) {
  const { data: brands, isLoading: isLoadingBrands } = useListBrands({
    offset: 0,
    limit: 50,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<ProductFilterFormValues>({
    resolver: zodResolver(ProductFilterFormSchema),
    defaultValues: {
      search: "",
      brand: "",
      gender: undefined,
      concentration: undefined,
      isActive: undefined,
      isLimited: undefined,
    },
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("search") || "";
    const brand = searchParams.get("brand") || "";
    const genderParam = searchParams.get("gender");
    const concentrationParam = searchParams.get("concentration");
    const isActiveParam = searchParams.get("isActive");
    const isLimitedParam = searchParams.get("isLimited");

    const parseBoolean = (value: string | null) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return undefined;
    };

    form.reset({
      search,
      brand,
      gender: isGender(genderParam) ? genderParam : undefined,
      concentration: isConcentration(concentrationParam)
        ? concentrationParam
        : undefined,
      isActive: parseBoolean(isActiveParam),
      isLimited: parseBoolean(isLimitedParam),
    });
  }, [location.search, form]);

  const onSubmit = (data: ProductFilterFormValues) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete("page");

    if (data.search && data.search.trim()) {
      searchParams.set("search", data.search.trim());
    } else {
      searchParams.delete("search");
    }

    if (data.brand && data.brand.trim()) {
      searchParams.set("brand", data.brand.trim());
    } else {
      searchParams.delete("brand");
    }

    if (data.gender) {
      searchParams.set("gender", data.gender);
    } else {
      searchParams.delete("gender");
    }

    if (data.concentration) {
      searchParams.set("concentration", data.concentration);
    } else {
      searchParams.delete("concentration");
    }

    if (typeof data.isActive === "boolean") {
      searchParams.set("isActive", String(data.isActive));
    } else {
      searchParams.delete("isActive");
    }

    if (typeof data.isLimited === "boolean") {
      searchParams.set("isLimited", String(data.isLimited));
    } else {
      searchParams.delete("isLimited");
    }

    const queryString = searchParams.toString();
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, {
      replace: true,
    });

    close();
  };

  const handleClear = () => {
    form.reset({
      search: "",
      brand: "",
      gender: undefined,
      concentration: undefined,
      isActive: undefined,
      isLimited: undefined,
    });
    navigate(location.pathname, { replace: true });
    close();
  };

  if (isLoadingBrands) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input placeholder="Search products..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => {
            const selectValue = field.value || undefined;

            return (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value !== "") field.onChange(value);
                  }}
                  value={selectValue}
                  disabled={isLoadingBrands}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands?.brands?.map((brand) => (
                      <SelectItem key={brand.id} value={brand.slug}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((option) => (
                    <TabButton
                      key={option.key}
                      text={option.text}
                      isSelected={field.value === option.key}
                      onClick={() => {
                        if (field.value === option.key) {
                          field.onChange(undefined);
                        } else {
                          field.onChange(option.key);
                        }
                      }}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="concentration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Concentration</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {concentrationOptions.map((option) => (
                    <TabButton
                      key={option.key}
                      text={option.text}
                      isSelected={field.value === option.key}
                      onClick={() => {
                        if (field.value === option.key) {
                          field.onChange(undefined);
                        } else {
                          field.onChange(option.key);
                        }
                      }}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {yesNoOptions.map((option) => (
                    <TabButton
                      key={String(option.key)}
                      text={option.text}
                      isSelected={field.value === option.key}
                      onClick={() => {
                        if (field.value === option.key) {
                          field.onChange(undefined);
                        } else {
                          field.onChange(option.key);
                        }
                      }}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isLimited"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limited</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {yesNoOptions.map((option) => (
                    <TabButton
                      key={String(option.key)}
                      text={option.text}
                      isSelected={field.value === option.key}
                      onClick={() => {
                        if (field.value === option.key) {
                          field.onChange(undefined);
                        } else {
                          field.onChange(option.key);
                        }
                      }}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </Form>
  );
}

import { SearchableSelect } from "@/components/shared/searchable-select";
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
import { TabButton } from "@/components/ui/tab-button";
import { INVENTORY_TYPES } from "@/constants/inventory.constant";
import { fetchProductVariants } from "@/services/product/api";
import { useListProducts } from "@/services/product/queries/useGetProducts";
import type { ProductVariantsSummaryType } from "@/types/product.type";
import { type InventoryFormValues, inventorySchema } from "@/validations/inventory.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";

export function InventoryForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isPending = navigation.state === "submitting";

  const searchParams = new URLSearchParams(location.search);
  const productSearch = searchParams.get("product") || "";

  const [variantsData, setVariantsData] = useState<ProductVariantsSummaryType | null>(null);
  const [isLoadingVariants, setIsLoadingVariants] = useState(false);

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema) as any,
    defaultValues: {
      type: "PURCHASE",
      quantity: 1,
    },
  });

  const selectedType = form.watch("type");
  const productId = form.watch("productId");
  const productVariantId = form.watch("productVariantId");
  const isPurchase = selectedType === "PURCHASE";

  // Product Selection
  const { data: productsData, isLoading: isLoadingProducts } = useListProducts({
    offset: 0,
    limit: 50,
    search: productSearch,
  });

  // Variant Fetching
  useEffect(() => {
    const getVariants = async () => {
      if (!productId) {
        setVariantsData(null);
        return;
      }

      try {
        setIsLoadingVariants(true);
        const data = await fetchProductVariants(productId);
        setVariantsData(data);
      } catch (error) {
        console.error("Failed to fetch variants:", error);
        setVariantsData(null);
      } finally {
        setIsLoadingVariants(false);
      }
    };

    getVariants();
  }, [productId]);

  const handleSubmit = (values: any) => {
    if (values.type === "SALE") {
      toast.error("Sale inventory is not allowed to be created manually.");
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    submit(formData, { method: "post" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Inventory Type</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {INVENTORY_TYPES.filter(type => type.value !== "SALE").map((type) => (
                    <TabButton
                      key={type.value}
                      text={type.label}
                      isSelected={field.value === type.value}
                      onClick={() => field.onChange(type.value)}
                      disabled={isPending}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Product Selection */}
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <SearchableSelect
                    items={productsData?.products.map(p => ({
                      value: p.slug,
                      label: `${p.name} (${p.brand.name})`
                    })) || []}
                    paramKey="product"
                    placeholder="Select product..."
                    emptyMessage="No products found"
                    selectedValue={field.value}
                    itemToStringValue={(item) => item.label}
                    onValueChange={(val) => {
                      field.onChange(val?.value || "");
                      form.setValue("productVariantId", 0); // Reset variant on product change
                    }}
                    disabled={isPending || isLoadingProducts}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Variant Selection */}
          <FormField
            control={form.control}
            name="productVariantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant</FormLabel>
                <FormControl>
                  <SearchableSelect
                    items={variantsData?.variants.map(v => ({
                      value: String(v.id),
                      label: `${v.size}ml ${v.source === "DECANT" ? "(Decant)" : ""}`
                    })) || []}
                    placeholder={!productId ? "Select product first..." : "Select variant..."}
                    emptyMessage="No variants found"
                    selectedValue={field.value ? String(field.value) : null}
                    itemToStringValue={(item) => item.label}
                    onValueChange={(val) => {
                      field.onChange(val?.value ? Number(val.value) : 0);
                    }}
                    disabled={isPending || !productId || isLoadingVariants}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter quantity..."
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isPurchase && (
            <FormField
              control={form.control}
              name="unitCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Cost</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="Enter purchase cost per unit..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={isPending || !productVariantId}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isPending ? "Creating..." : "Create Inventory Record"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

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
import { fetchProductSelectOptions, fetchProductVariant, fetchProductVariantSelectOptions } from "@/services/product/api";
import type { ProductVariantDetailType } from "@/types/product.type";
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

  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedVariantSlug, setSelectedVariantSlug] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantDetailType | null>(null);
  const [isLoadingVariantDetail, setIsLoadingVariantDetail] = useState(false);

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema) as any,
    defaultValues: {
      type: "PURCHASE",
      quantity: 1,
    },
  });

  const selectedType = form.watch("type");
  const productVariantId = form.watch("productVariantId");
  const isPurchase = selectedType === "PURCHASE";

  const maxQuantity = (selectedVariant?.stock || 0) - (selectedVariant?.reserved || 0);
  const isOutInventory = [
    "SALE",
    "DAMAGED",
    "RETURN_TO_SUPPLIER",
    "ADJUSTMENT_OUT"
  ].includes(selectedType);

  useEffect(() => {
    const getVariantDetail = async () => {
      if (!selectedProductSlug || !selectedVariantSlug) {
        setSelectedVariant(null);
        return;
      }

      try {
        setIsLoadingVariantDetail(true);
        const data = await fetchProductVariant(selectedProductSlug, selectedVariantSlug);
        setSelectedVariant(data);
      } catch (error) {
        setSelectedVariant(null);
      } finally {
        setIsLoadingVariantDetail(false);
      }
    };

    getVariantDetail();
  }, [selectedProductSlug, selectedVariantSlug]);

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
          <FormItem>
            <FormLabel>Product</FormLabel>
            <FormControl>
              <SearchableSelect
                queryKey={["products-select-options"]}
                onFetch={fetchProductSelectOptions}
                value={selectedProductSlug}
                onChange={(option) => {
                  setSelectedProductSlug(option ? String(option.slug) : null);
                  setSelectedVariantSlug(null);
                  form.resetField("productVariantId");
                }}
                placeholder="Select a product"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* Variant Selection */}
          <FormField
            control={form.control}
            name="productVariantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant</FormLabel>
                <FormControl>
                  <SearchableSelect
                    queryKey={[
                      "variants-select-options", 
                      ...(selectedProductSlug ? [selectedProductSlug] : [])
                    ]}
                    onFetch={({search, cursor}) => 
                      fetchProductVariantSelectOptions({ 
                        search, 
                        cursor, 
                        productSlug: selectedProductSlug 
                      })}
                    value={selectedVariantSlug}
                    onChange={(option) => {
                      setSelectedVariantSlug(option ? String(option.slug) : null);
                      field.onChange(option ? Number(option.id) : null);
                    }}
                    placeholder="Select a variant"
                    disabled={!selectedProductSlug}
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
                <FormLabel>
                  Quantity {selectedVariantSlug && `(${maxQuantity} left)`}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter quantity..."
                    disabled={isPending || (isOutInventory && isLoadingVariantDetail) || !selectedVariantSlug}
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

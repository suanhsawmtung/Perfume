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
import { Textarea } from "@/components/ui/textarea";
import { useListBrands } from "@/services/brand/queries/useGetListBrands";
import type { Concentration, Gender, ProductDetailType } from "@/types/product.type";
import {
  productSchema,
  type ProductFormValues,
} from "@/validations/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useNavigation, useSubmit } from "react-router";

interface ProductFormProps {
  product?: ProductDetailType;
  cancelUrl?: string;
  submitButtonText?: string;
}

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

export function ProductForm({
  product,
  cancelUrl = "/admin/products",
  submitButtonText,
}: ProductFormProps) {
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { data: brands, isLoading: isLoadingBrands } = useListBrands({
    offset: 0,
    limit: 50,
  });

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const isEditMode = !!product;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      brandId: product?.brand?.id ? String(product.brand.id) : "",
      concentration: product?.concentration || "EDP",
      gender: product?.gender || "UNISEX",
      isActive: typeof product?.isActive === "boolean" ? product.isActive : true,
      isLimited:
        typeof product?.isLimited === "boolean" ? product.isLimited : false,
      releasedYear: product?.releasedYear ?? undefined,
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("brandId", values.brandId);
    formData.append("concentration", values.concentration);
    formData.append("gender", values.gender);

    if (typeof values.isActive === "boolean") {
      formData.append("isActive", String(values.isActive));
    }
    if (typeof values.isLimited === "boolean") {
      formData.append("isLimited", String(values.isLimited));
    }
    if (typeof values.releasedYear === "number") {
      formData.append("releasedYear", String(values.releasedYear));
    }

    submit(formData, {
      method: isEditMode ? "PATCH" : "POST",
      encType: "multipart/form-data",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="flex w-full flex-col gap-6 lg:w-1/2 lg:gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => {
                const selectValue = field.value || undefined;

                return (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={selectValue}
                      disabled={isLoadingBrands || isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands?.brands?.map((brand) => (
                          <SelectItem key={brand.id} value={String(brand.id)}>
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
                          onClick={() => field.onChange(option.key)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
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
                          onClick={() => field.onChange(option.key)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-1/2 lg:gap-4">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {yesNoOptions.map((option) => (
                        <TabButton
                          key={String(option.key)}
                          text={option.text}
                          isSelected={field.value === option.key}
                          onClick={() => field.onChange(option.key)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
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
                          onClick={() => field.onChange(option.key)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releasedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Released Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 2018"
                      min={1900}
                      max={currentYear}
                      onWheel={(e) => e.currentTarget.blur()}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      {...field}
                      disabled={isSubmitting}
                      className="min-h-[120px] leading-relaxed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(cancelUrl)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {submitButtonText || (isEditMode ? "Update" : "Create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

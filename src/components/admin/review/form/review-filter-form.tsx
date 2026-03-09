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
import { REVIEW_STATUSES } from "@/constants/review.constant";
import { isReviewStatus } from "@/lib/utils";
import type { ReviewFilterFormValues } from "@/validations/review.validation";
import { ReviewFilterFormSchema } from "@/validations/review.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

export function ReviewFilterForm({ close }: { close: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  /* 
  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users", "list", "filter"],
    queryFn: () => fetchUsers({ offset: 0, limit: 100 }), 
  });

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", "list", "filter"],
    queryFn: () => fetchProducts({ offset: 0, limit: 100 }),
  });
  */

  /*
  const userItems = useMemo(() => {
    return usersData?.users.map(u => ({
      value: u.username,
      label: `${u.firstName || ""} ${u.lastName || ""} (@${u.username})`.trim()
    })) || [];
  }, [usersData]);

  const productItems = useMemo(() => {
    return productsData?.products.map(p => ({
      value: p.slug,
      label: p.name
    })) || [];
  }, [productsData]);
  */

  const form = useForm<ReviewFilterFormValues>({
    resolver: zodResolver(ReviewFilterFormSchema),
    defaultValues: {
      search: "",
      status: undefined,
      // user: "",
      // product: "",
    },
  });

  // Sync form with URL params and URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const statusParam = params.get("status");
    const status = isReviewStatus(statusParam) ? statusParam : undefined;
    // const user = params.get("user") || "";
    // const product = params.get("product") || "";

    form.reset({
      search,
      status,
      // user,
      // product,
    });
  }, [location.search, form]);

  const onSubmit = (data: ReviewFilterFormValues) => {
    const params = new URLSearchParams(location.search);
    params.delete("page");

    if (data.search?.trim()) params.set("search", data.search.trim());
    else params.delete("search");

    if (data.status) params.set("status", data.status);
    else params.delete("status");

    /*
    if (data.user) params.set("user", data.user);
    else params.delete("user");

    if (data.product) params.set("product", data.product);
    else params.delete("product");
    */

    const queryString = params.toString();
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, {
      replace: true,
    });
    close();
  };

  const handleClear = () => {
    form.reset({
      search: "",
      status: undefined,
      // user: "",
      // product: "",
    });
    
    const params = new URLSearchParams(location.search);
    // ["page", "search", "status", "user", "product"].forEach(k => params.delete(k));
    ["page", "search", "status"].forEach(k => params.delete(k));

    const queryString = params.toString();
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, { replace: true });
    close();
  };

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
                <Input placeholder="Search in comments..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              {!isLoadingUsers && field.value && (
                <Select 
                  onValueChange={(val) => field.onChange(val)} 
                  value={field.value ? field.value : ""}
                  disabled={isLoadingUsers}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select user..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              {!isLoadingProducts && field.value && (
                <Select 
                  onValueChange={(val) => field.onChange(val)} 
                  // value={field.value}
                  disabled={isLoadingProducts}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select product..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        */}

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {REVIEW_STATUSES.map((stat) => (
                    <TabButton
                      key={stat.key}
                      text={stat.text}
                      isSelected={field.value === stat.key}
                      onClick={() => {
                        if (field.value === stat.key) {
                          field.onChange(undefined);
                        } else {
                          field.onChange(stat.key);
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

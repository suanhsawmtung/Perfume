import { SearchInput } from "@/components/shared/search-input";
import { cn } from "@/lib/utils";
import { MoreFilterButton } from "../../shared/more-filter-button";
import { ReviewFilterDialog } from "./review-filter-dialog";

export const ReviewFilterBar = ({ className }: { className?: string }) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  
  // const [selectedUser, setSelectedUser] = useState<string | null>(null);
  // const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsers(30);
  // const { data: productsData, isLoading: isLoadingProducts } = useGetAllProducts(30);

  // const userOptions = useMemo(() => {
  //   return (
  //     usersData?.users.map((u) => ({
  //       value: u.username,
  //       label: `${u.firstName || ""} ${u.lastName || ""} (@${u.username})`.trim(),
  //     })) || []
  //   );
  // }, [usersData]);

  // const productOptions = useMemo(() => {
  //   return (
  //     productsData?.products.map((p) => ({
  //       value: p.slug,
  //       label: p.name,
  //     })) || []
  //   );
  // }, [productsData]);

  // // Sync state with URL
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const user = params.get("user")?.trim();
  //   const product = params.get("product")?.trim();
  //   setTimeout(() => {
  //     if(user) setSelectedUser(user);
  //     if(product) setSelectedProduct(product);
  //   }, 1000);
  // }, [location.search]);

  // const handleFilterChange = (key: string, value: string | null) => {
  //   const params = new URLSearchParams(location.search);
  //   if (value) {
  //     params.set(key, value);
  //   } else {
  //     params.delete(key);
  //   }
  //   params.delete("page");
    
  //   // // Also clear search key associated with the filter when a value is selected/cleared
  //   // const searchKey = `${key}_search`;
  //   // params.delete(searchKey);

  //   navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  // };

  return (
    <div className="flex justify-end items-center gap-x-2">
      <div className={cn("flex items-center justify-end gap-x-2", className)}>
        <SearchInput paramKey="search" className="h-12 w-full flex-1 sm:w-56" />
        <ReviewFilterDialog>
          <MoreFilterButton />
        </ReviewFilterDialog>
      </div>

      {/* <div className="flex items-center gap-x-2">
        {selectedUser && (
          <SearchableSelect
            items={userOptions}
            paramKey="user_search"
            placeholder="Filter by user..."
            emptyMessage="No users found"
            selectedValue={selectedUser}
            onValueChange={(val) => handleFilterChange("user", val?.value || null)}
            itemToStringValue={(item) => item.label}
            disabled={isLoadingUsers}
          />
        )}
        <SearchableSelect
          items={productOptions}
          paramKey="product_search"
          placeholder="Filter by product..."
          emptyMessage="No products found"
          selectedValue={selectedProduct}
          onValueChange={(val) => handleFilterChange("product", val?.value || null)}
          itemToStringValue={(item) => item.label}
          disabled={isLoadingProducts}
        />
      </div> */}
    </div>
  );
};

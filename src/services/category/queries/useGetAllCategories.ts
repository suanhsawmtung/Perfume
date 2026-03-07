import type { CategoryListType } from "@/types/category.type";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchAllCategories } from "../api";
import { categoryQueryKeys } from "../key";

export function useGetAllCategories(
  enabled = true,
): UseQueryResult<CategoryListType[], Error> {
  return useQuery<CategoryListType[], Error>({
    queryKey: categoryQueryKeys.all,
    queryFn: () => fetchAllCategories(),
    enabled,
  });
}

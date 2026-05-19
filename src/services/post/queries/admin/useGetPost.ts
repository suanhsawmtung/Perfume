import { queryClient } from "@/lib/query-client";
import type { PostType } from "@/types/post.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchAdminPost } from "../../api";
import { postQueryKeys } from "../../key";

export function useGetPost(
  slug: string,
): UseSuspenseQueryResult<PostType, Error> {
  return useSuspenseQuery<PostType, Error>({
    queryKey: postQueryKeys.admin.detail(slug),
    queryFn: () => fetchAdminPost(slug),
  });
}

export async function ensurePost(slug: string): Promise<void> {
  await queryClient.ensureQueryData({
    queryKey: postQueryKeys.admin.detail(slug),
    queryFn: () => fetchAdminPost(slug),
  });
}

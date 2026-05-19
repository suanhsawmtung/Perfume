import { queryClient } from "@/lib/query-client";
import type { AdminPostListResult, PostStatus } from "@/types/post.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchAdminPosts } from "../../api";
import { postQueryKeys } from "../../key";

interface UseListPostsParams {
  offset: number;
  search?: string;
  limit?: number;
  category?: string;
  status?: PostStatus;
}

export function useListPosts(
  params: UseListPostsParams,
): UseSuspenseQueryResult<AdminPostListResult, Error> {
  const { offset, search, limit, category, status } = params;

  return useSuspenseQuery<AdminPostListResult, Error>({
    queryKey: postQueryKeys.admin.list({ offset, search, limit, category, status }),
    queryFn: () => fetchAdminPosts({ offset, search, limit, category, status }),
  });
}

export async function ensureListPosts(
  params: UseListPostsParams,
): Promise<void> {
  const { offset, search, limit, category, status } = params;

  await queryClient.ensureQueryData({
    queryKey: postQueryKeys.admin.list({ offset, search, limit, category, status }),
    queryFn: () => fetchAdminPosts({ offset, search, limit, category, status }),
  });
}

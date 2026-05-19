import { queryClient } from "@/lib/query-client";
import type { PostListResult, PostQueryParams } from "@/types/post.type";
import {
  useSuspenseQuery,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { fetchPosts } from "../api";
import { postQueryKeys } from "../key";

export function useListPosts(
  params: PostQueryParams,
): UseSuspenseQueryResult<PostListResult, Error> {
  const { offset, search, limit, category } = params;

  return useSuspenseQuery<PostListResult, Error>({
    queryKey: postQueryKeys.list({ offset, search, limit, category }),
    queryFn: () => fetchPosts({ offset, search, limit, category }),
  });
}

export async function ensureListPosts(
  params: PostQueryParams,
): Promise<void> {
  const { offset, search, limit, category } = params;

  await queryClient.ensureQueryData({
    queryKey: postQueryKeys.list({ offset, search, limit, category }),
    queryFn: () => fetchPosts({ offset, search, limit, category }),
  });
}

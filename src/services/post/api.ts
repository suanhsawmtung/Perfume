import api from "@/lib/api";
import type {
  CreatePostResponse,
  DeletePostResponse,
  PostListResult,
  AdminPostListResult,
  PostQueryParams,
  PostType,
  UpdatePostResponse,
} from "@/types/post.type";

export const DEFAULT_LIMIT = 4;
export const ADMIN_DEFAULT_LIMIT = 10;

export async function fetchPosts(options: {
  offset?: number;
  search?: string;
  limit?: number;
  category?: string;
}): Promise<PostListResult> {
  const { offset = 0, search, limit = DEFAULT_LIMIT, category } = options;
  const queryParams: PostQueryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(category && { category }),
  };

  const response = await api.get("/posts", {
    params: queryParams,
  });

  // Backend returns: { success: true, data: { posts, currentPage, totalPages, pageSize }, message: null }
  return {
    items: response.data?.data?.items || [],
    currentPage: response.data?.data?.currentPage || 0,
    totalPages: response.data?.data?.totalPages || 0,
    pageSize: response.data?.data?.pageSize || 10,
    total: response.data?.data?.total || 0
  };
}

export async function fetchAdminPosts(options: {
  offset?: number;
  search?: string;
  limit?: number;
  category?: string;
  status?: string;
}): Promise<AdminPostListResult> {
  const { offset = 0, search, limit = ADMIN_DEFAULT_LIMIT, category, status } = options;
  const queryParams: PostQueryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(category && { category }),
    ...(status && { status }),
  };

  const response = await api.get("/admin/posts", {
    params: queryParams,
  });

  // Backend returns: { success: true, data: { posts, currentPage, totalPages, pageSize }, message: null }
  return {
    items: response.data?.data?.items || [],
    currentPage: response.data?.data?.currentPage || 0,
    totalPages: response.data?.data?.totalPages || 0,
    pageSize: response.data?.data?.pageSize || 10,
    total: response.data?.data?.total || 0
  };
}

export async function fetchAdminPost(slug: string): Promise<PostType> {
  const response = await api.get(`/admin/posts/${slug}`);

  // Backend returns: { success: true, data: { post }, message: null }
  return response.data?.data;
}

export async function createPost(
  formData: FormData,
): Promise<CreatePostResponse> {
  // Axios automatically detects FormData and sets Content-Type to multipart/form-data with boundary
  // When FormData is passed, axios overrides the default Content-Type header automatically
  const response = await api.post("/admin/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Backend returns: { success: true, data: { post }, message: string }
  return response.data;
}

export async function updatePost(
  slug: string,
  formData: FormData,
): Promise<UpdatePostResponse> {
  // Axios automatically detects FormData and sets Content-Type to multipart/form-data with boundary
  // When FormData is passed, axios overrides the default Content-Type header automatically
  const response = await api.patch(`/admin/posts/${slug}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Backend returns: { success: true, data: { post }, message: string }
  return response.data;
}

export async function deletePost({ slug }: { slug: string }): Promise<DeletePostResponse> {
  const response = await api.delete(`/admin/posts/${slug}`);

  // Backend returns: { success: true, message: string }
  return response.data;
}

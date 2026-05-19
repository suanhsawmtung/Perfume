import { DEFAULT_LIMIT } from "@/services/post/api";
import { ensureListPosts } from "@/services/post/queries/useGetPosts";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;

  const offset = (page - 1) * DEFAULT_LIMIT;

  const params = {
    offset,
    search,
    category,
    limit: DEFAULT_LIMIT,
  };

  try {
    await ensureListPosts(params);
    return { params };
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Response("Invalid query parameters", { status: 400 });
    }
    throw error;
  }
}

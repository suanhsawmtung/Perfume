import type { LoaderFunctionArgs } from "react-router";
import { ensureProduct } from "@/services/product/queries/useGetProduct";

// Loader for product detail page
export async function loader(
  { request, params }: LoaderFunctionArgs
) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Product slug is required", { status: 400 });
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const variant = searchParams.get("variant") || null;

  const queryParams = {
    variant,
  }

  try {
    await ensureProduct(slug, queryParams);
    return { params: queryParams, slug };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Response("Product not found", { status: 404 });
    }
    throw error;
  }
}

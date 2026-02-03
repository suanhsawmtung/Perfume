import { ensureProduct } from "@/services/product/queries/useGetProduct";
import type { LoaderFunctionArgs } from "react-router";

// Loader for product detail page - fetches product data by slug
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Product slug is required", { status: 400 });
  }

  try {
    await ensureProduct(slug);

    return null;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Response("Product not found", { status: 404 });
    }
    throw error;
  }
}

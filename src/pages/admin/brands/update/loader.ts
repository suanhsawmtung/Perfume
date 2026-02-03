import { ensureBrand } from "@/services/brand/queries/useGetBrand";
import type { LoaderFunctionArgs } from "react-router";

// Loader for brand update page - fetches brand data by slug
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Brand slug is required", { status: 400 });
  }

  try {
    await ensureBrand(slug);

    return null;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Response("Brand not found", { status: 404 });
    }
    throw error;
  }
}

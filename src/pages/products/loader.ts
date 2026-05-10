import { ensureListProducts } from "@/services/product/queries/useGetProducts";
import type { Concentration, Gender } from "@/types/product.type";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const gender = (searchParams.get("gender") as Gender) || undefined;
  const concentration = (searchParams.get("concentration") as Concentration) || undefined;
  const isLimited = searchParams.get("isLimited") === "true" 
    ? true 
    : searchParams.get("isLimited") === "false" 
      ? false 
      : undefined;

  const params = {
    page,
    search,
    brand,
    gender,
    concentration,
    isLimited,
    limit: 8,
  };

  await ensureListProducts(params);

  return { params };
}

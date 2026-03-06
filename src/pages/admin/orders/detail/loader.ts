import { ensureOrder } from "@/services/order/queries/useGetOrder";
import type { LoaderFunctionArgs } from "react-router";

// Loader for order detail page - fetches order data by code
export async function loader({ params }: LoaderFunctionArgs) {
  const { code } = params;

  if (!code) {
    throw new Response("Order code is required", { status: 400 });
  }

  try {
    await ensureOrder(code);

    return null;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Response("Order not found", { status: 404 });
    }
    throw error;
  }
}

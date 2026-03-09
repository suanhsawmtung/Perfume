import { ensureGetReview } from "@/services/review/queries/useGetReview";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    throw new Response("Invalid Review ID", { status: 400 });
  }

  try {
    await ensureGetReview(id);
    return { id };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Response("Review Not Found", { status: 404 });
    }
    throw error;
  }
}

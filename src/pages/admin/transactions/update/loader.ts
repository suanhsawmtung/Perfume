import { ensureTransaction } from "@/services/transaction/queries/useGetTransaction";
import type { LoaderFunctionArgs } from "react-router";

// Loader for transaction edit page - fetches transaction data by ID
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Transaction ID is required", { status: 400 });
  }

  const transactionId = Number(id);
  if (isNaN(transactionId)) {
    throw new Response("Invalid transaction ID", { status: 400 });
  }

  try {
    await ensureTransaction(transactionId);
    return null;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Response("Transaction not found", { status: 404 });
    }
    throw error;
  }
}

import { queryClient } from "@/lib/query-client";
import { updateTransaction } from "@/services/transaction/api";
import { transactionQueryKeys } from "@/services/transaction/key";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  if (!id) return null;

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const transactionId = Number(id);

  if (isNaN(transactionId)) {
    throw new Response("Invalid transaction ID", { status: 400 });
  }

  try {
    const response = await updateTransaction(transactionId, {
      source: data.source as string,
      reference: data.reference as string || null,
      note: data.note as string || null,
    });

    if (response.success) {
      toast.success(response.message || "Transaction updated successfully");
      await queryClient.invalidateQueries({
        queryKey: transactionQueryKeys.detail(transactionId),
      });
      await queryClient.invalidateQueries({
        queryKey: transactionQueryKeys.lists(),
      });
      return redirect(`/admin/transactions/${transactionId}`);
    }

    return { error: response.message };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to update transaction";
    toast.error(errorMessage);
    return { error: errorMessage };
  }
}

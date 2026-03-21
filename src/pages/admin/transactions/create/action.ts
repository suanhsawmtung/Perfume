import { queryClient } from "@/lib/query-client";
import { createTransaction } from "@/services/transaction/api";
import { transactionQueryKeys } from "@/services/transaction/key";
import type { TransactionDirection, TransactionTypeEnum } from "@/types/transaction.type";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await createTransaction({
      type: data.type as TransactionTypeEnum,
      direction: data.direction as TransactionDirection,
      amount: Number(data.amount),
      source: data.source as string,
      reference: data.reference as string || null,
      note: data.note as string || null,
    });

    if (response.success) {
      toast.success(response.message || "Transaction created successfully");
      await queryClient.invalidateQueries({
        queryKey: transactionQueryKeys.lists(),
      });
      return redirect("/admin/transactions");
    }

    return { error: response.message };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to create transaction";
    toast.error(errorMessage);
    return { error: errorMessage };
  }
}
